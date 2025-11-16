import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { TurnComponent } from './pages/turn/turn.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TurnComponent, 
  ],
  imports: [
    CommonModule,
    ClientRoutingModule, 
    SharedModule
  ],
})
export class ClientModule {}
