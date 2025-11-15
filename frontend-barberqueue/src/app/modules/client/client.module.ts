import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { TurnComponent } from './pages/turn/turn.component';

@NgModule({
  declarations: [
    TurnComponent, 
  ],
  imports: [
    CommonModule,
    ClientRoutingModule, 
  ],
})
export class ClientModule {}
