import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  //definimos los roles
  public role: 'admin' | 'barber' | 'client' | null = null;

  //definimos las propiedad para navegar
  public optionsNav: { icon: string; label: string; route: string }[] = [];

  public dataClient: { name: string; email: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe((role) => {
      this.role = role;
      //obtenemos el rol cuando se inicie el componente(una sola vez)
      this.setOptions();
    });

    this.authService.globalDataUser.subscribe((dataUser) => {
      this.dataClient = dataUser
        ? [{ name: dataUser.name, email: dataUser.email }]
        : [];
    });
  }

  //creamos las funciones para opciones para cada rol
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
            route: 'client/settings',
          },
        ];
        break;
      case 'barber':
        this.optionsNav = [
          { icon: '', label: 'Panel', route: '/barber/panel' },
        ];
        break;
      case 'admin':
        this.optionsNav = [{ icon: '', label: 'Panel', route: '/admin/panel' }];
        break;
    }
  }
  logout() {
    this.authService.logout();
  }
}
