import { Injectable } from '@angular/core';

interface ColorConfig {
  id: string;
  hex: string;
  hover: string;
  selected: string;
  bg: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark = false;

  private colors: ColorConfig[] = [
    {
      id: 'verde-lima',
      hex: '#84cc16',
      bg: '#84cc16',
      hover: '#73b814',
      selected: '#7ccf002c',
    },
    {
      id: 'azul-electrico',
      hex: '#3b82f6',
      bg: '#3b82f6',
      hover: '#2563eb',
      selected: '#3b83f62c',
    },
    {
      id: 'purpura',
      hex: '#a855f7',
      bg: '#a855f7',
      hover: '#9333ea',
      selected: '#a955f72f',
    },
    {
      id: 'naranja',
      hex: '#f97316',
      bg: '#f97316',
      hover: '#ea580c',
      selected: '#f9741631',
    },
    {
      id: 'rojo',
      hex: '#ef4444',
      bg: '#ef4444',
      hover: '#dc2626',
      selected: '#ef44442d',
    },
  ];

  constructor() {
    // DARK MODE
    const saved = localStorage.getItem('darkMode');
    this.dark = saved === 'true';
    document.body.classList.toggle('dark', this.dark);

    // COLOR MODE
    const savedColor = localStorage.getItem('selectedColor') || 'verde-lima';
    this.applyColor(savedColor);
  }

  // ----- COLOR -----
  applyColor(colorId: string) {
    const color = this.colors.find((c) => c.id === colorId);
    if (!color) return;

    document.documentElement.style.setProperty('--accent-color', color.hex);
    document.documentElement.style.setProperty('--accent-hover', color.hover);
    document.documentElement.style.setProperty('--accent-bg', color.bg);
  }

  // ----- DARK MODE -----
  get isDarkMode(): boolean {
    return this.dark;
  }

  toggleDarkMode() {
    this.dark = !this.dark;
    localStorage.setItem('darkMode', this.dark.toString());
    document.body.classList.toggle('dark', this.dark);
  }
}
