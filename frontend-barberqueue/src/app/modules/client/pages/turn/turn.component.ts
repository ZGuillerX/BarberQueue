import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-turno',
  standalone: false,
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.css'],
})
export class TurnComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.applyColor(
      localStorage.getItem('selectedColor') || 'verde-lima'
    );
  }
  //seleccionar corte(uno solo)
  selectCourt(event: Event) {
    const selectedCourt = (event.currentTarget as HTMLElement).closest(
      '.options-court'
    );
    if (!selectedCourt) return;

    if (selectedCourt.classList.contains('active')) {
      selectedCourt.classList.remove('active');
      return;
    }

    document
      .querySelectorAll('.options-court.active')
      .forEach((card) => card.classList.toggle('active'));
    selectedCourt.classList.toggle('active');
  }

  //seleccionar barbero(uno solo)
  selectBarber(event: Event) {
    const selectBarber = (event.currentTarget as HTMLElement).closest(
      '.info-barber-client'
    );

    if (!selectBarber) return;

    if (selectBarber.classList.contains('active')) {
      selectBarber.classList.remove('active');
      return;
    }

    // remueve active de todas las tarjetas
    document
      .querySelectorAll('.info-barber-client.active')
      .forEach((card) => card.classList.toggle('active'));

    selectBarber.classList.toggle('active');

    //activa la tarjeta seleccionada
    selectBarber.classList.add('active');
  }

  //funcion para ver mas en la seccion de elegir barbero
  toggleSeeMore() {
    const container = document.querySelector('.div-info-barber-client');

    const seeMore = document.querySelector('.see-more-text');
    const arrow = document.querySelector('.arrow');

    if (!container || !seeMore || !arrow) return;

    container.classList.toggle('see-all');

    if (container.classList.contains('see-all')) {
      seeMore.innerHTML = 'Mostrar menos';
      arrow.innerHTML = ' ⮝';
    } else {
      seeMore.innerHTML = 'Mostrar más';
      arrow.innerHTML = '⮟';
    }
  }
}
