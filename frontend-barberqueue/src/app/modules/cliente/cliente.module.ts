import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { TurnoComponent } from './pages/turno/turno.component';

@NgModule({
  declarations: [
    TurnoComponent, 
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule, 
  ],
})
export class ClienteModule {}
