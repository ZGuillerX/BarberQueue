import { Injectable } from '@angular/core';

interface ColorConfig {
  id: string;
  border: string;
  hover: string;
  selected: string;
  bg: string;
  filter: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark = false;

  private colors: ColorConfig[] = [
    {
      id: 'verde-lima',
      border: '#84cc16',
      bg: '#84cc16',
      hover: '#73b814',
      selected: '#7ccf002c',
      filter:
        'invert(67%) sepia(47%) saturate(747%) hue-rotate(42deg) brightness(92%) contrast(90%)',
    },
    {
      id: 'azul-electrico',
      border: '#3b82f6',
      bg: '#3b82f6',
      hover: '#2563eb',
      selected: '#3b83f62c',
      filter:
        'invert(46%) sepia(99%) saturate(2621%) hue-rotate(203deg) brightness(98%) contrast(92%)',
    },
    {
      id: 'purpura',
      border: '#a855f7',
      bg: '#a855f7',
      hover: '#9333ea',
      selected: '#a955f72f',
      filter:
        'invert(67%) sepia(35%) saturate(3502%) hue-rotate(263deg) brightness(90%) contrast(98%)',
    },
    {
      id: 'naranja',
      border: '#f97316',
      bg: '#f97316',
      hover: '#ea580c',
      selected: '#f9741631',
      filter:
        'invert(69%) sepia(72%) saturate(624%) hue-rotate(344deg) brightness(98%) contrast(92%)',
    },
    {
      id: 'rojo',
      border: '#ef4444',
      bg: '#ef4444',
      hover: '#dc2626',
      selected: '#ef44442d',
      filter:
        'invert(34%) sepia(84%) saturate(747%) hue-rotate(343deg) brightness(96%) contrast(94%)',
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

    document.documentElement.style.setProperty(
      '--accent-color-selected',
      color.selected
    );
    document.documentElement.style.setProperty('--accent-hover', color.hover);
    document.documentElement.style.setProperty('--accent-border', color.hover);
    document.documentElement.style.setProperty('--accent-bg', color.bg);
    document.documentElement.style.setProperty(
      '--accent-color-filter',
      color.filter
    );
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
