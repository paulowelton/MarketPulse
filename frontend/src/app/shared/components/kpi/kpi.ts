import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi',
  imports: [CommonModule],
  templateUrl: './kpi.html',
  styleUrl: './kpi.css',
})
export class Kpi {

  @Input() title: string = '';
  @Input() value: string = '';
  @Input() variation: any = '';

}
