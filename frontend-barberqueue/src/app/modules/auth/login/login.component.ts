import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: false,
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
    private router: Router,
    private themeService: ThemeService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    const savedColor = localStorage.getItem('selectedColor') || 'verde-lima';
    this.themeService.applyColor(savedColor);
  }

  onSubmit() {
    const data = this.loginForm.value;
    //validar datos
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loadingToast = toast.loading('Iniciando sesión...');
    this.authService.login(data).subscribe({
      next: (res) => {
        this.showForm = false;
        toast.dismiss(loadingToast);
        toast.success('¡Login exitoso!', {
          description: 'Redirigiendo al panel...',
          duration: 1000,
        });

        //redirigir al home despues de 1 segunfdo

        setTimeout(() => {
          this.router.navigate(['/client/turn']);
        }, 1000);
        this.loginForm.reset();
      },

      error: (err) => {
        // Mostrar snackbar con mensaje de error
        toast.dismiss(loadingToast);
        toast.error('Error de autenticación', {
          description: 'Contraseña o usuario incorrecto',
          duration: 3000,
        });
      },
    });
  }
}
