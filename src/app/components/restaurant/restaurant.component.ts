import { Component, Input, OnInit, inject } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant.interface';
import { GeolocationService } from '../../services/geolocation.service';
import { CommonModule } from '@angular/common';

import { RestaurantDetailComponent } from '../restaurant-detail/restaurant-detail.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, RestaurantDetailComponent],
  providers: [DialogService],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {

  @Input()
  restaurant!: Restaurant;

  @Input()
  curLocation!: GeolocationPosition;

  distance!: string;

  ref: DynamicDialogRef | undefined;

  imageSrc: string = '';

  constructor(private geoLocationService: GeolocationService, private dialogService: DialogService) {}

  ngOnInit(): void {
    //alert(JSON.stringify(this.curLocation))
    this.geoLocationService.getDistance(this.curLocation, this.restaurant.address).subscribe(res=>{
      //alert(JSON.stringify(this.curLocation));
      this.distance = res.toFixed(1);
    })
    this.imageSrc = this.getRandomImage();
  }

  // Function to generate a random image path
  getRandomImage(): string {
    const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Generates a char from 'a' to 'z'
    return `../../../assets/images/${randomChar}.jpg`;
  }

  onClick() {
    this.ref = this.dialogService.open(
      RestaurantDetailComponent, {
        header: 'Select your item',
        data: {
          restaurant: this.restaurant
        }
      });
  }

  openDialog(): void {

  }
  

}

