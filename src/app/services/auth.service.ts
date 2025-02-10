import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { Observable, map } from 'rxjs';
import { LoginInput, LoginResponse, User, QueryResponse } from '../types/graphql.types';
import { FetchResult } from '@apollo/client/core';

// GraphQL Operations
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      email
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(input: LoginInput): Observable<QueryResponse<{ login: LoginResponse }>> {
    return this.apollo.mutate<{ login: LoginResponse }>({
      mutation: LOGIN_MUTATION,
      variables: { input }
    }).pipe(
      map(result => ({
        loading: false,
        data: result.data || undefined,
        error: result.errors
      }))
    );
  }

  getCurrentUser(): Observable<QueryResponse<{ me: User }>> {
    return this.apollo.watchQuery<{ me: User }>({
      query: GET_CURRENT_USER
    }).valueChanges.pipe(
      map(result => ({
        loading: result.loading,
        data: result.data || undefined,
        error: result.error
      }))
    );
  }
} 