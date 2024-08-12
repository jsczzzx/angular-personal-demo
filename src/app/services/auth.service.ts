import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = '';

  constructor(private http: HttpClient) { }

  getUsers(name: string): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }
}
