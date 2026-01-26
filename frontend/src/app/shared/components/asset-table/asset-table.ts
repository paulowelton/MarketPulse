import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-asset-table',
  imports: [CommonModule, RouterLink],
  templateUrl: './asset-table.html',
  styleUrl: './asset-table.css',
})
export class AssetTable {

  @Input() title: string = '';
  @Input() rows: any[] | null = [];

}
