import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddBookComponent } from './add-book/add-book.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowBooksComponent } from './show-books/show-books.component';
import { HomeComponent } from './home/home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AdminShowTableComponent } from './admin-show-table/admin-show-table.component';
import { AboutComponent } from './about/about.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessDialogComponent } from './payment-success-dialog/payment-success-dialog.component';
import { ShowPayComponent } from './show-pay/show-pay.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    NavbarComponent,
    AddBookComponent,
    ShowBooksComponent,
    
    HomeComponent,
    UserRegistrationComponent,
    AdminShowTableComponent,
    AboutComponent,
    ConfirmDialogComponent,
    CheckoutComponent,
    PaymentSuccessDialogComponent,
    ShowPayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxStripeModule,

    AppRoutingModule,
    MatDialogModule,
    NgxStripeModule.forRoot('pk_test_51OmdxzSAIkOmTQmpyg2vu43XDmFsNzAo8nER0YpwEWuFOyLMz0Xut41UnctccvK2nBx9Ub1zBC04RqTc5cc0ReRl00USMYm5jx'),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
