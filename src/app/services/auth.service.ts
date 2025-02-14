import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  constructor() {}

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
} 