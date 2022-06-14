import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './home/product/invoice/invoice.component';
import { ViewOrdersComponent } from './home/product/view-orders/view-orders.component';

const routes: Routes = [
  {path:'' , redirectTo:'/home/dashboard', pathMatch: 'full'},
  { path: 'orders', component: ViewOrdersComponent },
  { path: 'invoice', component: InvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
