import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

export interface User {
  readonly id?: string;
  name: string;
  email: string;
  roleId?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = `${environment.API_URL}/auth`;

  //mapeamos los roles para acceder a su nombre por el numero
  private roleMap: { [key: number]: 'admin' | 'barber' | 'client' } = {
    1: 'admin',
    2: 'barber',
    3: 'client',
  };

  private expiredSession: string =
    'Tu sesión ha expirado. Inicia sesión nuevamente';

  private sessionTimeout: any;
  private countdownInterval: any;

  // id del toast de countdown para actualizarlo
  private countdownToastId: string | number | undefined = undefined;

  //creamos la instancia del rol con behaviorSubject para acceder globalmente al rol
  private globalRoleSubject = new BehaviorSubject<
    'admin' | 'barber' | 'client' | null
  >(null);

  public globalDataUser = new BehaviorSubject<{
    name: string;
    email: string;
  } | null>(null);

  //hacemos que el rol sea solo de lectura fuera de la clase authService
  public userRole$ = this.globalRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadRoleFromToken();
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data).pipe(
      tap((res) => {
        //guardamos el token que viene del backend y lo guardamos en localstorage con el nombre 'token'
        localStorage.setItem('token', res.token);

        //le pasamos el token para obtener el rol
        this.setRoleFromToken(res.token);
      })
    );
  }

  logout() {
    //para limpiar el timer antes del logout
    this.clearSessionTimer();
    this.clearCountdown();

    localStorage.removeItem('token');
    this.globalRoleSubject.next(null);
    this.globalDataUser.next(null);
    this.router.navigate(['/login']);
  }

  //verificar si el token ya expiro
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      //obtiene el tiempo actual en segundos
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (err) {
      console.log('Error decodificando el token');
      return true;
    }
  }

  // funcion para iniciar el timer de expiración
  private startCountdown(seconds: number) {
    let count = seconds;

    // Mostrar el toast inicial
    this.updateCountdownToast(count);

    this.countdownInterval = setInterval(() => {
      count--;

      if (count > 0) {
        // actualizar el contador
        this.updateCountdownToast(count);
      } else {
        // al llegar a 0, limpiar todo y hacer logout
        this.clearCountdown();
        toast.warning(this.expiredSession);
        this.logout();
      }
    }, 1000);
  }

  // Función helper para actualizar o crear el toast
  private updateCountdownToast(seconds: number) {
    // Si existe un toast previo, eliminarlo
    if (this.countdownToastId !== undefined) {
      toast.dismiss(this.countdownToastId);
    }

    // Crear nuevo toast con el contador actualizado
    this.countdownToastId = toast.loading(
      `Cerrando sesión en ${seconds} segundo${seconds !== 1 ? 's' : ''}...`,
      {
        duration: Infinity,
      }
    );
  }

  // funcion para limpiar el countdown
  private clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    if (this.countdownToastId !== undefined) {
      toast.dismiss(this.countdownToastId);
      this.countdownToastId = undefined;
    }
  }

  //para iniciar el timer de expiración
  private startSessionTimer(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = (payload.exp - currentTime) * 1000; // En milisegundos

      if (timeUntilExpiry > 3000) {
        // si faltan más de 3 segundos, espera hasta 3 segundos antes de iniciar countdown
        this.sessionTimeout = setTimeout(() => {
          this.startCountdown(3);
        }, timeUntilExpiry - 3000);
      } else if (timeUntilExpiry > 0) {
        // si faltan menos de 3 segundos, inicia countdown inmediato con los segundos restantes
        const secondsLeft = Math.ceil(timeUntilExpiry / 1000);
        this.startCountdown(secondsLeft);
      } else {
        // si ya expiró, logout inmediato
        toast.warning(this.expiredSession);
        this.logout();
      }
    } catch (err) {
      console.error('Error iniciando timer de sesión', err);
    }
  }

  // funcion para limpiar el timer
  private clearSessionTimer() {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
      this.sessionTimeout = null;
    }
  }

  setRoleFromToken(token: string) {
    if (this.isTokenExpired(token)) {
      toast.warning(this.expiredSession);
      this.logout();
      return;
    }

    try {
      //decodificamos el payload que son los datos del usuario para obtener el rol
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      const roleNum = Number(payload.roleId);
      const dataUser = { name: payload.name, email: payload.email };
      console.log(dataUser);
      const role: 'admin' | 'barber' | 'client' = this.roleMap[roleNum] ?? null;
      this.globalDataUser.next(dataUser);
      this.globalRoleSubject.next(role);

      //iniciar el token pra expiracion automatica en tiempo real
      this.startSessionTimer(token);
    } catch (err) {
      console.error('error parsing token', err);
      this.globalRoleSubject.next(null);
    }
  }

  //cargarmos el rol desde el token
  loadRoleFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.isTokenExpired(token)) {
        toast.warning(this.expiredSession);
        this.logout();
      } else {
        this.setRoleFromToken(token);
      }
    }
  }

  //obtnemos el rol para usarlo en clases externas
  getRole(): 'admin' | 'barber' | 'client' | null {
    return this.globalRoleSubject.value;
  }

  getUserData(): User | null {
    return this.globalDataUser.value;
  }
}
