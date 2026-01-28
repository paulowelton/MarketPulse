import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUserEndpoint = 'http://127.0.0.1:5000/auth/register'
  private loginUserEndpoint = 'http://127.0.0.1:5000/auth/login'

  constructor(private http: HttpClient){}

  getAuthHeaders() {
    const token = localStorage.getItem('token')

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  registerUser(name: string, email: string, password: string){
    return this.http.post(this.registerUserEndpoint, {"name": name, "email": email, "password": password})
  }
  
  loginUser(email: string, password: string){
    return this.http.post<any>(this.loginUserEndpoint, {"email": email, "password": password})
  }

  saveToken(token: string){
    localStorage.setItem('token', token)
  }

  logout() {
    localStorage.removeItem('token')
  }
}