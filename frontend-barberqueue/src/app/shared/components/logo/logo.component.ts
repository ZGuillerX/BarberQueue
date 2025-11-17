import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: false,
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() width: string = '64px';
  @Input() height: string = '64px';
  @Input() borderRadius: string = '16px';
}
