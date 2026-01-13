import { Component } from '@angular/core';
import { Kpi } from "../../../../shared/components/kpi-card/kpi-card";

@Component({
  selector: 'app-hero',
  imports: [Kpi],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

}
