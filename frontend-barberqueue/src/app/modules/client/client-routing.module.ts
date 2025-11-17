import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnComponent } from './pages/turn/turn.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SettingsComponent } from 'src/app/shared/components/settings/settings.component';

const routes: Routes = [
  { path: 'turn', component: TurnComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
