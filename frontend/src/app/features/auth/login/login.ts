import { Component, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  warn = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.warn.set('');

    this.authService.loginUser(this.email, this.password)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.authService.saveToken(response.token);
            this.authService.initAuth()
            this.router.navigate(['/'])
          }
        },
        error: () => {
          this.warn.set('Email ou senha inválidos');
        }
      })
  }
}