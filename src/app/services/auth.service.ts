import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  // Method to check if the token is valid
  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const tokenExpirationDate = this.getTokenExpirationDate(token);
    if (tokenExpirationDate) {
      return tokenExpirationDate > new Date();
    }

    return false;
  }

  // Method to extract and decode the expiration date from the token
  private getTokenExpirationDate(token: string): Date | null {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));

      if (!tokenPayload.exp) {
        return null;
      }

      const expirationDate = new Date(tokenPayload.exp * 1000); // exp is in seconds
      return expirationDate;
    } catch (e) {
      return null;
    }
  }

  getUserIdFromToken(token: string): string {
    const decodedToken: any = jwtDecode(token);
    return decodedToken.userId;
  }
}
