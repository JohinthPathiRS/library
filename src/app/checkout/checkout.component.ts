import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { PaymentSuccessDialogComponent } from '../payment-success-dialog/payment-success-dialog.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  paymentDetails: any[] = []; // Array to store payment details

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  stripeTest = new FormGroup({
    name: new FormControl(''),
    // Add other form controls as needed
  });

  buy() {
    const paymentData = {
      // Include any necessary payment data here
      amount: 1000, // Example amount (adjust as needed)
      currency: 'usd', // Example currency (adjust as needed)
      // Add other payment data based on your requirements
    };

    this.http.post('http://localhost:3000/create-payment-intent', paymentData)
      .subscribe((response: any) => {
        console.log('Payment Intent Created:', response);

        // Open a dialog box upon successful payment
        this.openSuccessDialog(response);

        // Save payment details to MySQL database
        this.saveToDatabase(response);

        // You can perform additional actions based on the response
      }, (error) => {
        console.error('Error creating Payment Intent:', error);
        // Handle the error
      });
  }

  openSuccessDialog(paymentResponse: any) {
    // You can customize the dialog content based on your needs
    const dialogRef = this.dialog.open(PaymentSuccessDialogComponent, {
      width: '500px',
      data: { payment: paymentResponse }
    });
  }

  saveToDatabase(paymentResponse: any) {
    // Perform an HTTP request to your server to save payment details in MySQL
    // Example: this.http.post('http://localhost:3000/save-payment', paymentResponse)
    // For now, just add the payment response to the array (simulate saving to the database)
    this.paymentDetails.push(paymentResponse);
  }

  showPaymentDetails() {
    this.http.get('http://localhost:3000/get-payment-details')
      .subscribe((response: any) => {
        console.log('Payment Details:', response);

        // Update the paymentDetails array with the retrieved data
        this.paymentDetails = response;

        // Open a dialog to display the payment details
        this.dialog.open(PaymentSuccessDialogComponent, {
          data: { payments: this.paymentDetails }
        });
      }, (error) => {
        console.error('Error retrieving payment details:', error);
        // Handle the error
      });
  }
}
