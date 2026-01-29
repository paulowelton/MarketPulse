import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('frontend');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getToken()){
      this.authService.getMe().subscribe(
        {
          next: (user) => {this.authService.setUser(user.user), console.log(user.user)},
          error: () => this.authService.clearUser()
        }
      )
    }
  }
}
