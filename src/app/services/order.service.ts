import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Restaurant } from '../interfaces/restaurant.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = 'http://localhost:5000'; 

  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`);
  }


  
}
