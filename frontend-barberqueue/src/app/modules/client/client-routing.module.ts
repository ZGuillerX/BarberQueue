import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnComponent } from './pages/turn/turn.component';

const routes: Routes = [
  { path: '', component: TurnComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
