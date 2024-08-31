import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../interfaces/restaurant.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  currentLocationMarker!: google.maps.MarkerOptions;
  locationMarkers: google.maps.MarkerOptions[] = [];
  mapOptions: google.maps.MapOptions = {
    zoomControl: false, // Disable the default zoom control
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
  };

  restaurants: Restaurant[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAllRestaurants().subscribe(res=>{
      this.restaurants = res;
      this.getCurrentLocation();
      this.loadMarkers();
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Set the current location marker with a custom blue icon
        this.currentLocationMarker = {
          position: this.center,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }
        };
      }, () => {
        console.error('Geolocation service failed.');
      });
    } else {
      console.error('Your browser does not support geolocation.');
    }
  }

  // Convert addresses to lat/lng and create markers
  loadMarkers() {
    //alert(JSON.stringify(this.restaurants))
    this.restaurants.forEach((item) => {
      this.locationMarkers.push({
        position: { lat: item.coordinates[0], lng: item.coordinates[1] },
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'  // Custom red icon for locations
          }
        });
    });
  }

  // Zoom in function
  zoomIn() {
    if (this.zoom < 21) {  // Maximum zoom level is 21
      this.zoom++;
    }
  }

  // Zoom out function
  zoomOut() {
    if (this.zoom > 1) {  // Minimum zoom level is 1
      this.zoom--;
    }
  }
}
