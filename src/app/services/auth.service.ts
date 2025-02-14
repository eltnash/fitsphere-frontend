import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  login(input: LoginInput): Observable<LoginResponse> {
    // Replace this with your actual authentication logic
    // This is just a mock implementation
    return of({
      token: 'mock-token',
      user: {
        id: '1',
        email: input.email,
        name: 'User Name'
      }
    });
  }

  getCurrentUser(): Observable<User> {
    // Replace this with your actual user fetching logic
    // This is just a mock implementation
    return of({
      id: '1',
      email: 'user@example.com',
      name: 'User Name'
    });
  }

  signup(userData: {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  }) {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData);
  }
} 