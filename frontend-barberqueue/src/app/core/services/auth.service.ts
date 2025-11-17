import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
    localStorage.removeItem('token');
    this.globalRoleSubject.next(null);
    this.globalDataUser.next(null);
    this.router.navigate(['/login']);
  }

  setRoleFromToken(token: string) {
    try {
      //decodificamos el payload que son los datos del usuario para obtener el rol
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload)
      const roleNum = Number(payload.roleId);
      const dataUser = { name: payload.name, email: payload.email };
      console.log(dataUser);
      const role: 'admin' | 'barber' | 'client' = this.roleMap[roleNum] ?? null;
      this.globalDataUser.next(dataUser);
      this.globalRoleSubject.next(role);
    } catch (err) {
      console.error('error parsing token', err);
      this.globalRoleSubject.next(null);
    }
  }

  //cargarmos el rol desde el token

  loadRoleFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setRoleFromToken(token);
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
