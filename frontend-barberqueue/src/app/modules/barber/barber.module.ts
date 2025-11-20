import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarberRoutingModule } from './barber-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PanelComponent } from './pages/panel/panel.component';

@NgModule({
  declarations: [PanelComponent],
  imports: [CommonModule, BarberRoutingModule, SharedModule],
})
export class BarberModule {}
