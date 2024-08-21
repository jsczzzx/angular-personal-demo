import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { GeolocationService } from '../../services/geolocation.service';
import { GoogleMapComponent } from '../google-map/google-map.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [GoogleMapComponent, RestaurantComponent, FormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  restaurants = [
    {
      "name": "Ocean's Plate",
      "address": "314 Moody St, Waltham, MA 02453",
      "telephone": "(781)398-0000",
      "dishes": [
        {"name": "Grilled Salmon", "price": 25},
        {"name": "Shrimp Cocktail", "price": 15},
        {"name": "Seafood Paella", "price": 30}
      ]
    },
    {
      "name": "Urban Grill",
      "address": "52 Elm St, Waltham, MA 02453",
      "telephone": "(781)894-0889",
      "dishes": [
        {"name": "Ribeye Steak", "price": 35},
        {"name": "BBQ Ribs", "price": 22},
        {"name": "Grilled Vegetables", "price": 14}
      ]
    },
    {
      "name": "Pasta Palace",
      "address": "100 Maple St, Waltham, MA 02453",
      "telephone": "(781)366-0411",
      "dishes": [
        {"name": "Spaghetti Carbonara", "price": 18},
        {"name": "Fettuccine Alfredo", "price": 17},
        {"name": "Pesto Gnocchi", "price": 20}
      ]
    },
    {
      "name": "Sushi Corner",
      "address": "225 Moody St, Waltham, MA 02453",
      "telephone": "(781)647-8000",
      "dishes": [
        {"name": "California Roll", "price": 12},
        {"name": "Nigiri Sampler", "price": 20},
        {"name": "Dragon Roll", "price": 15}
      ]
    },
    {
      "name": "Burger Base",
      "address": "879 Main St, Waltham, MA 02451",
      "telephone": "(781)850-2361",
      "dishes": [
        {"name": "Classic Cheeseburger", "price": 10},
        {"name": "Veggie Burger", "price": 9},
        {"name": "Bacon Double Cheeseburger", "price": 13}
      ]
    },
    {
      "name": "Green Delights",
      "address": "20 Hope Ave # 306, Waltham, MA 02453",
      "telephone": "(781)790-0859",
      "dishes": [
        {"name": "Kale Salad", "price": 12},
        {"name": "Quinoa Bowl", "price": 11},
        {"name": "Avocado Toast", "price": 8}
      ]
    },
    {
      "name": "Curry Corner",
      "address": "73 Lexington St Suite 204, Newton, MA 02466",
      "telephone": "(617)244-5020",
      "dishes": [
        {"name": "Butter Chicken", "price": 15},
        {"name": "Lamb Vindaloo", "price": 17},
        {"name": "Paneer Tikka Masala", "price": 14}
      ]
    },
    {
      "name": "Taco Territory",
      "address": "564 Main St, Waltham, MA 02452",
      "telephone": "(781)693-3800",
      "dishes": [
        {"name": "Fish Taco", "price": 3},
        {"name": "Carnitas Taco", "price": 4},
        {"name": "Beef Taco", "price": 3}
      ]
    },
    {
      "name": "Dumpling Den",
      "address": "376 Moody St, Waltham, MA 02453",
      "telephone": "(781)373-3068",
      "dishes": [
        {"name": "Pork Dumplings", "price": 8},
        {"name": "Chicken Dumplings", "price": 7},
        {"name": "Vegetable Dumplings", "price": 6}
      ]
    },
    {
      "name": "French Feast",
      "address": "695 Main St, Waltham, MA 02451",
      "telephone": "(781)899-9530",
      "dishes": [
        {"name": "Coq Au Vin", "price": 22},
        {"name": "Bouillabaisse", "price": 25},
        {"name": "Ratatouille", "price": 16}
      ]
    }
  ]

  address = '';
  curLocation!: GeolocationPosition;
  
  constructor(private router: Router, private authService: AuthService, private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.geolocationService.getCurrentLocation().subscribe(res=>{
      this.curLocation = res;
      this.geolocationService.getDistance(this.curLocation, '376 Moody St, Waltham, MA 02453').subscribe(res=>{
        alert(JSON.stringify(res));
      })
    })
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
}
