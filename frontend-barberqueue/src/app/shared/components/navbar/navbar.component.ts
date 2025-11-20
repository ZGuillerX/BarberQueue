import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  // definimos los roles
  public role: 'admin' | 'barber' | 'client' | null = null;

  // definimos la propiedad para navegar
  public optionsNav: { icon: string; label: string; route: string }[] = [];

  public dataClient: { name: string; email: string; pricipalLetter: string }[] =
    [];

  public activeRoute: string = '';

  // menu para moviles
  public menuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {
    const savedColor = localStorage.getItem('selectedColor') || 'verde-lima';
    this.themeService.applyColor(savedColor);
  }

  ngOnInit() {
    this.activeRoute = this.router.url;

    this.authService.userRole$.subscribe((role) => {
      this.role = role;
      this.setOptions();
    });

    this.authService.globalDataUser.subscribe((dataUser) => {
      let letter = dataUser?.name.slice(0, 1) || '';
      this.dataClient = dataUser
        ? [
            {
              name: dataUser.name,
              email: dataUser.email,
              pricipalLetter: letter,
            },
          ]
        : [];
    });

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.activeRoute = e.urlAfterRedirects;
      }
    });
  }

  // creamos las funciones para opciones para cada rol
  setOptions() {
    switch (this.role) {
      case 'client':
        this.optionsNav = [
          {
            icon: '/assets/icons/turn.svg',
            label: 'Tomar Turno',
            route: '/client/turn',
          },
          {
            icon: '/assets/icons/settings.svg',
            label: 'Ajustes',
            route: '/client/settings',
          },
        ];
        break;
      case 'barber':
        this.optionsNav = [
          {
            icon: '/assets/icons/barber.svg',
            label: 'Panel',
            route: '/barber/panel',
          },
          {
            icon: '/assets/icons/settings.svg',
            label: 'Ajustes',
            route: '/barber/settings',
          },
        ];
        break;
      case 'admin':
        this.optionsNav = [{ icon: '', label: 'Panel', route: '/admin/panel' }];
        break;
    }
  }

  // toggle menu moviles
  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  // cerrar menú al navegar
  onNavClick() {
    // Cerrar menú al hacer clic en una opción en momobile
    if (window.innerWidth <= 600) {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }
  }

  ngOnDestroy() {
    // cuando el navbar se destruye al cambiar de ruta, restauramos siempre el scroll
    document.body.style.overflow = '';
  }

  logout() {
    Swal.fire({
      text: '¿Estás seguro de que deseas salir?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.loading('Cerrando sesión...');

        setTimeout(() => {
          this.authService.logout();
          toast.dismiss();
          toast.success('Sesión cerrada correctamente');

          // cerrar menu si está abierto
          this.menuOpen = false;
          document.body.style.overflow = '';
        }, 1000);
      }
    });
  }
}
