import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../interfaces/restaurant.interface';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../interfaces/order.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = 'http://localhost:5000'; 

  jsonUrl = '../../assets/data/restaurants.json';

  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    //return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`);
    return this.http.get<Restaurant[]>(`${this.jsonUrl}`);
  }

  searchRestaurants(query: string, latitude: number, longitude: number, page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/restaurants/search?query=${query}&latitude=${latitude}&longitude=${longitude}&page=${page}`);
  }

  private ordersSubject = new BehaviorSubject<Order[]>([]);

  // Add a new order to the array
  addOrder(order: Order) {
    const currentOrders = this.ordersSubject.value;
    this.ordersSubject.next([...currentOrders, order]);
  }

  // Get the array of orders as an observable
  getOrders() {
    return this.ordersSubject.asObservable();
  }

  // Optionally, clear all orders
  clearOrders() {
    this.ordersSubject.next([]);
  }

  submitOrder(order: Order): Observable<any> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }
  
}
