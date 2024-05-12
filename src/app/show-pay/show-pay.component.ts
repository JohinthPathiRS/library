import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface PaymentDetails {
  name: string;
  card_number: string;
  expiration_month: string;
  expiration_year: string;
  amount: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './show-pay.component.html',
  styleUrls: ['./show-pay.component.css']
})
export class ShowPayComponent implements OnInit {
  paymentDetails!: Object; // Change this line to use Object instead of any[]

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Call the endpoint to retrieve payment details when the component initializes
    this.http.get('http://localhost:3000/get-payment-details')
      .subscribe((response: Object) => { // Change this line to use Object instead of any[]
        console.log('Payment Details:', response);
        this.paymentDetails = response;
      }, (error) => {
        console.error('Error retrieving payment details:', error);
      });
  }
}