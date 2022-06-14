import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
     ViewOrdersComponent, 
     AddOrderComponent],
  imports: [
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
    MatSelectModule, 
    MatRadioModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class OrdersModule { }
