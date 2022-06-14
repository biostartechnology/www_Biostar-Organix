import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../session/login/login.component';
import { SignupComponent } from '../session/signup/signup.component';
import { ForgotpswdComponent } from '../session/forgotpswd/forgotpswd.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailsComponent } from './product/productdetails/productdetails.component';
import { ContactComponent } from '../session/contact/contact.component';
import { ViewOrdersComponent } from './product/view-orders/view-orders.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { OrdersuccessComponent } from './product/ordersuccess/ordersuccess.component';
import { CartComponent } from './product/cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyArtworkComponent } from './my-artwork/my-artwork.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { AccountComponent } from './account/account.component';
import { InvoiceComponent } from './product/invoice/invoice.component';
import { EstimateComponent } from './estimate/estimate.component';

const routes: Routes = [
  { path: 'home', redirectTo: '/home/dashboard', pathMatch: 'full' },
  { path: 'home',component: HomeComponent,
   children: [
     { path: 'proddetails', component: ProductdetailsComponent },
     { path: 'product', component: ProductComponent },
     { path: 'contact', component: ContactComponent },
     { path: 'ordersuccess', component: OrdersuccessComponent },
     { path: 'userprofile', component: UserprofileComponent },
     { path:'artwork', component:MyArtworkComponent},
     { path:'dashboard', component:DashboardComponent},
     { path:'cart', component:CartComponent},
     {path:'subcategory',component:SubcategoryComponent},
     { path: 'account', component: AccountComponent },
     { path: 'estimate', component: EstimateComponent },
   ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRouterModule { }
