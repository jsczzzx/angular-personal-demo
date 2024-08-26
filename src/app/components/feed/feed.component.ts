import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { GeolocationService } from '../../services/geolocation.service';
import { GoogleMapComponent } from '../google-map/google-map.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { AdminService } from '../../services/admin.service';
import { OrderService } from '../../services/order.service';
import { Restaurant } from '../../interfaces/restaurant.interface';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [GoogleMapComponent, RestaurantComponent, FormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  restaurants: Restaurant[] = []

  address = '';
  curLocation!: GeolocationPosition;
  
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private geolocationService: GeolocationService, 
    private adminService: AdminService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    this.geolocationService.getCurrentLocation().subscribe(res=>{
      this.curLocation = res;
    });
    this.orderService.getAllRestaurants().subscribe(res=>{
      this.restaurants = res;
    });

  }

  onLogout() {
    this.router.navigate(['/']);
  }

  onGetAllUser() {
    this.authService.getAllUsers().subscribe((res)=>alert(JSON.stringify(res)))
  }

  onGetToken() {
    alert(localStorage.getItem('token'));
  }

  onGetLocation() {
    this.geolocationService.getCurrentLocation().subscribe((res)=>{
      alert(JSON.stringify(res));
    })
  }

  onSubmit() {
    this.geolocationService.geocodeAddress(this.address).subscribe(res=>{
      alert(JSON.stringify(res));
    })
  }

  onRegisterRestaurants() {
    for (let i = 0; i < this.restaurants.length; i++) {
      this.adminService.registerRestaurants(this.restaurants[i]).subscribe((res)=>{
        console.log('success');
      })
    }
  }
}
