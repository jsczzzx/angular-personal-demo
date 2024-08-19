import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GoogleMapComponent } from '../google-map/google-map.component';


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [GoogleMapComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

  constructor(private router: Router, private authService: AuthService) {}

  onLogout() {
    this.router.navigate(['/']);
  }

  onGetAllUser() {
    this.authService.getAllUsers().subscribe((res)=>alert(JSON.stringify(res)))
  }

  onGetToken() {
    alert(localStorage.getItem('token'));
  }
}
