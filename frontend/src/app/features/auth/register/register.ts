import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  warn: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit(): void {
    if(this.name == '' || this.email == '' || this.password == '' || this.confirmPassword == ''){
      this.warn = 'Insira todos os dados'
      return
    }
    
    if (this.password !== this.confirmPassword){
      this.warn = 'As senhas não batem';
      return
    }

    this.warn = ''

    this.authService.registerUser(this.name, this.email, this.password)
    .subscribe({
      error: err => console.log(err)
    })
      
    if (!this.warn){
      this.warn = 'Sucesso'

      this.router.navigate(['/login'])
    }

  }
}
