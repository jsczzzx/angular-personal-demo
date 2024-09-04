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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CartComponent } from '../cart/cart.component';
import { fromEvent, of } from "rxjs";
import { debounce, debounceTime, map, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [GoogleMapComponent, RestaurantComponent, FormsModule],
  providers: [DialogService],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  searchResults: any[] = [];
  currentPage: number = 1;

  dev: boolean = false;
  address = '';
  curLocation!: GeolocationPosition;

  ref: DynamicDialogRef | undefined;


  constructor(
    private router: Router, 
    private authService: AuthService, 
    private geolocationService: GeolocationService, 
    private adminService: AdminService,
    private orderService: OrderService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {

    this.geolocationService.getCurrentLocation().subscribe(res=>{
      this.curLocation = res;
    });
    
    /*this.orderService.getAllRestaurants().subscribe(res=>{
      this.restaurants = res;
    });*/

    let userId = this.authService.getUserIdFromToken(localStorage.getItem('token')!);
    this.authService.getUserById(userId).subscribe(res=>{
      localStorage.setItem('userName', res.userName);
      localStorage.setItem('userAddress', res.userName);

    });

    this.loadData();

  }

  // Method to load data based on user input
  loadData() {
    const searchBarInput = document.querySelector('input') as HTMLInputElement;

    fromEvent(searchBarInput, 'keyup').pipe(
      debounceTime(300),
      map((event: Event) => (event.target as HTMLInputElement).value),
      switchMap((value) => {
        this.currentPage = 1; // Reset to page 1 when a new search is initiated
        this.searchResults = []; // Clear previous results
        return this.orderService.searchRestaurants(
          value,
          this.curLocation.coords.latitude,
          this.curLocation.coords.longitude,
          this.currentPage
        );
      })
    ).subscribe((res) => {
      this.searchResults = res; // Load the first page of search results
    });
  }

  // Method to load the next page of data when 'Load More' is clicked
  loadMoreData() {
    const searchBarInput = document.querySelector('input') as HTMLInputElement;
    const searchTerm = searchBarInput.value;

    this.currentPage++; // Increment the page number

    this.orderService.searchRestaurants(
      searchTerm,
      this.curLocation.coords.latitude,
      this.curLocation.coords.longitude,
      this.currentPage
    ).subscribe((res) => {
      // Append the next page of results to the existing search results
      this.searchResults = [...this.searchResults, ...res];
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
    /*for (let i = 0; i < this.restaurants.length; i++) {
      this.adminService.registerRestaurants(this.restaurants[i]).subscribe((res)=>{
        console.log('success');
      })
    }*/
  }

  onCartClicked() {
    this.ref = this.dialogService.open(
      CartComponent, {
        header: 'Cart',
        data: {}
      });
  }
}
