import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = this.authService.getRole();

    if (token && role) {
      switch (role) {
        case 'client':
          this.router.navigate(['/client/turn']);
          break;
        case 'barber':
          this.router.navigate(['/barber/dashboard']);
          break;
        case 'admin':
          this.router.navigate(['/admin/dashboard']);
          break;
      }

      return false;
    }

    return true;
  }
}
