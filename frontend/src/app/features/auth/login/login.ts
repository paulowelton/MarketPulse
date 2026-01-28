import { Component } from '@angular/core';
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
  warn: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {

    
    
    this.authService.loginUser(this.email, this.password)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 'success') {
            this.authService.saveToken(response.token);

            this.router.navigate(['/'])
          } else {
            this.warn = 'Email ou senha inválidos';
          }
        },
        error: () => {
          this.warn = 'Erro ao tentar fazer login';
        }
      })
  }


}