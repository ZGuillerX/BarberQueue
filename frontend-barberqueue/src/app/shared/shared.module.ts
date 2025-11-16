import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LogoComponent, NavbarComponent, SettingsComponent],
  imports: [CommonModule, RouterModule],
  exports: [LogoComponent, NavbarComponent, SettingsComponent],
})
export class SharedModule {}
