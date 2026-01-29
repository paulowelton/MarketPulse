import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUserEndpoint = 'http://127.0.0.1:5000/auth/register'
  private loginUserEndpoint = 'http://127.0.0.1:5000/auth/login'
  private getMeEndpoint = 'http://127.0.0.1:5000/auth/me'

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient){}

  setUser(user: any){
    console.log('set user:', user)
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
    this.logout()
  }

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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getMe(){
    return this.http.get<any>(this.getMeEndpoint, {headers: this.getAuthHeaders()})
  }

  logout() {
    localStorage.removeItem('token')
  }
}