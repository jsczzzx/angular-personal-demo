import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant.interface';
import { GeolocationService } from '../../services/geolocation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {

  @Input()
  restaurant!: Restaurant;

  @Input()
  curLocation!: GeolocationPosition;

  distance = 99999;

  constructor(private geoLocationService: GeolocationService) {}

  ngOnInit(): void {
    this.geoLocationService.getDistance(this.curLocation, this.restaurant.address).subscribe(res=>{
      //alert(JSON.stringify(this.curLocation));
      this.distance = res;
    })
  }
  

}
