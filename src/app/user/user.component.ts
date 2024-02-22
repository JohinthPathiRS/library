
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user = { username: '', password: '' };
  loginError: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/login', this.user).subscribe(
      (data: any) => {
        console.log('Login successful:', data.message);
        this.router.navigate(['/show']); 
      },
      (error) => {
        console.error('Error during login:', error);
        this.loginError = 'Invalid username or password'; 
      }
    );
  }
}
