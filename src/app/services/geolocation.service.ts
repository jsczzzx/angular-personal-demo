import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getCurrentLocation(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  getDistance(curLocation: GeolocationPosition, address: string): Observable<number> {
    return this.geocodeAddress(address).pipe(
      map(res => this.calculateDistance(curLocation.coords.latitude, curLocation.coords.longitude, res.lat, res.lng)),
      catchError(() => of(99999)) // Return 99999 if the observable fails
    );
  }
  




  geocodeAddress(address: string): Observable<any> {
    return new Observable((observer) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          observer.next({
            lat: location.lat(),
            lng: location.lng(),
            //results: results,
          });
          observer.complete();
        } else {
          observer.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }

  // Method to calculate distance between two locations in miles
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    //alert(`lat1: ${lat1}, lng1: ${lng1}, lat2: ${lat2}, lng2: ${lng2}`)
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLng = this.degreesToRadians(lng2 - lng1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in miles
    //alert(distance)
    return distance;
  }
  
  // Helper function to convert degrees to radians
  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

}
