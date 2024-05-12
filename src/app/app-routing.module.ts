import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AppComponent } from './app.component';
import { ShowBooksComponent } from './show-books/show-books.component';
import { AdminShowTableComponent } from './admin-show-table/admin-show-table.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessDialogComponent } from './payment-success-dialog/payment-success-dialog.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  {path:'admin-show',component:AdminShowTableComponent},
  {path:"add",component:AddBookComponent},
  {path:"user",component:UserComponent},
  {path:"admin",component:AdminComponent},
  { path: 'show', component: ShowBooksComponent },
  {path:'User-reg',component:UserRegistrationComponent},
  {path:'about',component:AboutComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'payment',component:PaymentSuccessDialogComponent},
  {path:'pay',component:PaymentSuccessDialogComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
