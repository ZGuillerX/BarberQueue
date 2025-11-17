import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  showForm = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {
    // Inicialización del formulario con validaciones
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordNoMatch: true };
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = this.registerForm.value;

    //se llama al servicio de registro
    this.authService.register(data).subscribe({
      next: (res) => {
        // ocultar el formulario
        this.showForm = false;

        console.log(`Usuario registrado:`, res);
        this.registerForm.reset();
        this.snackBar.open('Rregistro exitoso, Redirigiendo al login', '', {
          duration: 2000,
          panelClass: ['success-snackbar'],
        });

        //redirigir despues de 3 segundos a login
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 3000);
      },
      error: (err) => console.error('Error', err),
    });
  }
}
