import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnComponent } from './pages/turn/turn.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: 'turn', component: TurnComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
