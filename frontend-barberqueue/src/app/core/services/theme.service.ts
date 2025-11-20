import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark = false;

  constructor() {
    const saved = localStorage.getItem('darkMode');
    this.dark = saved === 'true';

    // aplicar al body
    document.body.classList.toggle('dark', this.dark);
  }

  get isDarkMode(): boolean {
    return this.dark;
  }

  toggleDarkMode() {
    this.dark = !this.dark;

    // guardar estado
    localStorage.setItem('darkMode', this.dark.toString());

    // aplicar al DOM
    document.body.classList.toggle('dark', this.dark);
  }
}
