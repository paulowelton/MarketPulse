import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css',
})
export class Kpi {

  @Input() title: string = '';
  @Input() value: string = '';
  @Input() variation: any = '';

}
