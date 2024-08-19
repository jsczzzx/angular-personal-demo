import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

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

  data = [
    {name: 'My Dental Kids & Adult Dentistry', tel:'(781)398-0000', address:'314 Moody St, Waltham, MA 02453'},
    {name: 'Moody Street Dental On Elm', tel:'(781)894-0889', address:'52 Elm St, Waltham, MA 02453'},
    {name: 'Advanced Waltham Dental', tel:'(781)366-0411', address:'100 Maple St, Waltham, MA 02453'},
    {name: 'Dr. Taejoon Ahn', tel:'(781)647-8000', address:'225 Moody St, Waltham, MA 02453'},
    {name: 'Gentle Dental Waltham', tel:'(781)850-2361', address:'879 Main St, Waltham, MA 02451'},
    {name: 'Chris M. Karavolas, DDS', tel:'(781)790-0859', address:'20 Hope Ave # 306, Waltham, MA 02453'},
    {name: 'Newton Dentistry', tel:'(617)244-5020', address:'73 Lexington St Suite 204, Newton, MA 02466'},
    {name: 'Dr. Dayana I. Escobar, DDS', tel:'(781)693-3800', address:'564 Main St, Waltham, MA 02452'},
    {name: '376 Dental Studio: Poonam Soi, DMD', tel:'(781)373-3068', address:'376 Moody St, Waltham, MA 02453'},
    {name: 'Carmen D Brambilla', tel:'(781)899-9530', address:'695 Main St, Waltham, MA 02451'},
    {name: 'Waltham Dental Group', tel:'(781)894-2122', address:'32 South St #202, Waltham, MA 02453'},
    {name: 'Waltham Family Dental', tel:'(781)653-6211', address:'30 Grant St, Waltham, MA 02453'},
    {name: `Metrowest Children's Dentistry`, tel:'(781)373-5953', address:'520 Main St, Waltham, MA 02452'},
    {name: 'Waltham Dental Center', tel:'(781)891-7737', address:'85 River St #2, Waltham, MA 02453'},
    {name: 'Vast Dental', tel:'(617)658-7883', address:'433 Watertown St, Newton, MA 02458'},
    {name: 'Newton-Wellesley Hospital - Main Campus', tel:'(617)243-6000', address:'2014 Washington St, Newton, MA 02462'},
    {name: 'Jeffrey S. Cummings, DMD', tel:'(781)894-4114', address:'520 Main St, Waltham, MA 02452'},
  ];

  ngOnInit() {
    this.getCurrentLocation();
    this.loadMarkers();
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
    const geocoder = new google.maps.Geocoder();
    this.data.forEach((place) => {
      geocoder.geocode({ address: place.address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          this.locationMarkers.push({
            position: { lat: location.lat(), lng: location.lng() },
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'  // Custom red icon for locations
            }
          });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
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
