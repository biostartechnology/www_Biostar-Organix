import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductComponent } from './product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionModule } from '../../session/session.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrderpageComponent } from './orderpage/orderpage.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { OrdersuccessComponent } from './ordersuccess/ordersuccess.component';
import { CartComponent } from './cart/cart.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SubcategoryComponent } from '../subcategory/subcategory.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

@NgModule({
  declarations: [ProductdetailsComponent, ProductComponent, OrderpageComponent, OrdersuccessComponent, CartComponent, SubcategoryComponent, InvoiceComponent, OrderdetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    NgbModule,
    SessionModule,
    FormsModule,
    NgxYoutubePlayerModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MdbTabsModule,
    MatStepperModule,
    MatToolbarModule
  ]
})
export class ProductModule { }
