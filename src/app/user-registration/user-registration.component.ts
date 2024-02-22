// user-registration.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  user = { username: '', email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:3000/register', this.user).subscribe(
      (data: any) => {
        console.log('Registration successful:', data.message);
        this.router.navigate(['/user']); 
      },
      (error) => {
        console.error('Error during registration:', error);
        
      }
    );
  }
}
