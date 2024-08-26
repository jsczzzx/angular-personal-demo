import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Restaurant } from '../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient) { }

  registerRestaurants(restaurant: Restaurant): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/restaurants`, restaurant);
  }


}
