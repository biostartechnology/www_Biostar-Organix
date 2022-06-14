import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AddProductDetailsComponent } from './add-product-details/add-product-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTreeModule} from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ViewComponent } from './view/view.component';
import { ProductsComponent } from './products.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    AddProductDetailsComponent, ViewComponent, ProductsComponent, ProductCategoriesComponent],
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
    NgbModule,
    MatSelectModule, 
    MatRadioModule,
    MatCheckboxModule,
    QuillModule.forRoot()
  ],
  exports:[
    ProductCategoriesComponent
  ]
})
export class ProductsModule { }
