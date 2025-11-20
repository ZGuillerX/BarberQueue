import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  bg: string;
  hover: string;
  light: string;
  selected: string;
}

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  selectedColorId = 'verde-lima';
  darkMode = false;

  constructor(public theme: ThemeService) {
    //leer darkModel desde el servicio themeservice, que ya lo cargo desde localStorage
    this.darkMode = this.theme.isDarkMode;

    //cargar el color
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
      this.selectedColorId = savedColor;
    }
  }

  colors: ColorOption[] = [
    {
      id: 'verde-lima',
      name: 'Verde Lima',
      hex: '#84cc16',
      bg: '#84cc16',
      hover: '#73b814',
      light: '#f7fee7',
      selected: '#7ccf002c',
    },
    {
      id: 'azul-electrico',
      name: 'Azul Eléctrico',
      hex: '#3b82f6',
      bg: '#3b82f6',
      hover: '#2563eb',
      light: '#dbeafe',
      selected: '#3b83f62c',
    },
    {
      id: 'purpura',
      name: 'Púrpura',
      hex: '#a855f7',
      bg: '#a855f7',
      hover: '#9333ea',
      light: '#f3e8ff',
      selected: '#a955f72f',
    },
    {
      id: 'naranja',
      name: 'Naranja',
      hex: '#f97316',
      bg: '#f97316',
      hover: '#ea580c',
      light: '#ffedd5',
      selected: '#f9741631',
    },
    {
      id: 'rojo',
      name: 'Rojo',
      hex: '#ef4444',
      bg: '#ef4444',
      hover: '#dc2626',
      light: '#fee2e2',
      selected: '#ef44442d',
    },
  ];

  get selectedColor(): ColorOption {
    return this.colors.find((c) => c.id === this.selectedColorId)!;
  }

  selectColor(colorId: string): void {
    this.selectedColorId = colorId;
    localStorage.setItem('selectedColor', colorId);

    const color = this.colors.find((c) => c.id === colorId);

    document.documentElement.style.setProperty(
      '--accent-color',
      color?.hex || ''
    );
    document.documentElement.style.setProperty(
      '--accent-hover',
      color?.hover || ''
    );
    document.documentElement.style.setProperty(
      '--accent-selected-bg',
      color?.selected || ''
    );
  }

  toggleDarkMode() {
    this.theme.toggleDarkMode();
    this.darkMode = this.theme.isDarkMode;
  }
}
