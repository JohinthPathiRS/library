import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-success-dialog',
  template: `
    <h2>Payment Details</h2>
    <ul *ngFor="let payment of data.payments">
      <li>Name: {{ payment.name }}</li>
      <!-- Add more fields as needed -->
    </ul>
  `,
})
export class PaymentSuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { payments: any[] }) {}
}
