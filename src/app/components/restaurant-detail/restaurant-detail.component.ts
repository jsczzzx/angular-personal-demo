import { Component, inject, Input, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Restaurant, Dish } from '../../interfaces/restaurant.interface';
import { Order, OrderItem } from '../../interfaces/order.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../services/order.service';
import { GoogleMapComponent } from "../google-map/google-map.component";
import { GeolocationService } from '../../services/geolocation.service';
import { Coordinate } from '../../interfaces/coordinate.interface';


@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    GoogleMapComponent
],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant!: Restaurant;
  userId = ''; // Assume you have this data
  orderItems: OrderItem[] = [];
  totalPrice: number = 0;
  currentCoordinate!: Coordinate;
  restaurantCoordinate!: Coordinate;


  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig, 
    private authService: AuthService,
    private orderService: OrderService,
    private geolocationService: GeolocationService, 

  ) {}

  ngOnInit(): void {
    // Initialize the orderItems array with each dish and a quantity of 0
    this.restaurant = this.config.data.restaurant;
    this.restaurant.dishes.forEach((dish: Dish) => {
      this.orderItems.push({
        dish: dish,
        quantity: 0
      });
    });
    this.userId = this.authService.getUserIdFromToken(localStorage.getItem('token')!);
    this.restaurantCoordinate = {lng: this.restaurant.coordinates[0], lat: this.restaurant.coordinates[1]};
    this.geolocationService.getCurrentLocation().subscribe(res=>{
      this.currentCoordinate = {lng: res.coords.longitude, lat: res.coords.latitude};

    })
  }

  increment(dish: Dish) {
    const orderItem = this.findOrderItem(dish);
    if (orderItem) {
      orderItem.quantity++;
      this.totalPrice += orderItem.dish.price;
    }
  }

  decrement(dish: Dish) {
    const orderItem = this.findOrderItem(dish);
    if (orderItem && orderItem.quantity > 0) {
      orderItem.quantity--;
      this.totalPrice -= orderItem.dish.price;
    }
  }

  findOrderItem(dish: Dish): OrderItem | undefined {
    return this.orderItems.find(item => item.dish._id === dish._id);
  }



  submitOrder() {
    // Filter out items with quantity > 0
    const filteredOrderItems: OrderItem[] = this.orderItems.filter(item => item.quantity > 0);

    // Construct the order
    const order: Order = {
      userId: this.userId,  // Assuming you have the userId
      userName: localStorage.getItem('userName')!,
      restaurantId: this.restaurant._id!,  // Get the restaurant ID from the data
      restaurantName: this.restaurant.name,
      items: filteredOrderItems,
      totalPrice: this.totalPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'Pending'  // Initial order status
    };

    // Submit the order (assuming you have a service to handle the submission)
    alert(JSON.stringify(order));
    this.orderService.addOrder(order);
    this.ref.close();
    //alert(JSON.stringify(this.config.data));
    //this.config.data.ref.close();
  }
}
