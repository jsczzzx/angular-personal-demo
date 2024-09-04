import { Component, Input, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Coordinate } from '../../interfaces/coordinate.interface';


@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  @Input()
  currentCoordinate!: Coordinate;

  @Input()
  restaurantCoordinate!: Coordinate;

  zoom = 11;
  center!: google.maps.LatLngLiteral;
  currentLocationMarker!: google.maps.MarkerOptions;
  locationMarkers: google.maps.MarkerOptions[] = [];

  mapOptions: google.maps.MapOptions = {
    zoomControl: false, // Disable the default zoom control
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
  };

  ngOnInit() {
    this.center = {
      lat: (this.currentCoordinate.lat + this.restaurantCoordinate.lat) / 2.0,
      lng: (this.currentCoordinate.lng + this.restaurantCoordinate.lng) / 2.0
    };
    this.currentLocationMarker = {
      position: this.currentCoordinate,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      }
    };

    let restaurantLocationMarker = {
      position: this.restaurantCoordinate,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/restaurant.png'  // Custom red icon for locations
      }
    }
    this.locationMarkers.push(restaurantLocationMarker);
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

