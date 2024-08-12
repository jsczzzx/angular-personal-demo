import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, { validators: this.passwordMatchValidator() });  // Apply the custom validator here
  }

  // Inline custom validator function
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirm_password')?.value;

      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      alert(JSON.stringify(this.registerForm.value, null, 2));
    } else {
      alert('Please fill out the form correctly before submitting.');
    }
  }
}
