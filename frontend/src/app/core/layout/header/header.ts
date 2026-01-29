import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  user$!: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.clearUser();
    this.router.navigate(['/login']);
  }
}

