import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
  adminForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.adminForm = this.fb.group({
      admin_id: ['', Validators.required],
      admin_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('Form submitted!', this.adminForm.value);
    const { admin_id, admin_name, password } = this.adminForm.value;

   
    if (admin_id === '6374' && admin_name === 'johinth' && password === 'johinthking') {
      this.router.navigate(['/add']);
      console.log('Form submitted!', this.adminForm.value);

      console.log('Navigation to user page');
    } else {
      console.log('Invalid inputs. Please check your credentials.');
      alert("Wrong details");
    }
  }
}
