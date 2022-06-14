import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from '../home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { OrdersModule } from './orders/orders.module';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { ProductsModule } from './products/products.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesComponent } from './customer/messages/messages.component';
import { CustomerComponent } from './customer/customer.component';
import { PluginComponent } from './customer/plugin/plugin.component';
import { UsersComponent } from './customer/users/users.component';
import { GroupsComponent } from './customer/groups/groups.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { PricemarkupComponent } from './customer/pricemarkup/pricemarkup.component';


@NgModule({
  declarations: [HomeComponent, DashboardComponent, OrdersComponent, MessagesComponent, CustomerComponent, PluginComponent, UsersComponent, GroupsComponent, PricemarkupComponent],
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    SharedModule,
    MatIconModule,
    OrdersModule,
    ProductsModule,
    MatCardModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTreeModule,
    CommonModule,
    RouterModule,
    SharedModule,
    MatGridListModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDividerModule,
    FormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTreeModule,
    MatInputModule,
    NgbModule,
    MatSelectModule, 
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class HomeModule { }
