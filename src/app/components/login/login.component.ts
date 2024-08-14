import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // this.authService.getUsers().subscribe((res)=>{
    //   alert(JSON.stringify(res));
    // });
  }

  // onClick() {
  //   this.router.navigate(['/register']);
  // }

  onSubmit() {
    if (this.signupForm.valid) {
      //alert(JSON.stringify(this.signupForm.value, null, 2));
      this.authService.login(
        this.signupForm.get('email')?.value, 
        this.signupForm.get('password')?.value
      ).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/feed']);
        },
        error: (err) => {
          console.log(err.message);
          alert('Sign in failed.')
        }
      })
    } else {
      alert('Please fill out the form correctly before submitting.');
    }
  }


}
