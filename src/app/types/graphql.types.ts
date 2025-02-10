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

export interface QueryResponse<T> {
  loading: boolean;
  data?: T;
  error?: any;
} 