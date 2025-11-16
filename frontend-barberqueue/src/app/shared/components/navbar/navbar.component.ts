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
  public optionsNav: { label: string; route: string }[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe((role) => {
      this.role = role;
      //obtenemos el rol cuando se inicie el componente(una sola vez)
      this.setOptions();
    });
  }

  //creamos las funciones para opciones para cada rol
  setOptions() {
    switch (this.role) {
      case 'client':
        this.optionsNav = [{ label: 'Tomar Turno', route: '/client/turn' }];
        break;
      case 'barber':
        this.optionsNav = [{ label: 'Panel', route: '/barber/panel' }];
        break;
      case 'admin':
        this.optionsNav = [{ label: 'Panel', route: '/admin/panel' }];
        break;
    }
  }
}
