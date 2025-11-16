import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showForm = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    const data = this.loginForm.value;
    //validar datos
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(data).subscribe({
      next: (res) => {
        this.showForm = false;
        this.snackBar.open('Login exitoso', '', {
          duration: 1000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
        });

        //redirigir al home despues de 1 segunfdo

        setTimeout(() => {
          this.router.navigate(['/client/turn']);
        }, 1000);
        this.loginForm.reset();
      },
      error(err) {
        console.error('Error', err);
      },
    });
  }
}
