import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRouterModule } from './home-router.module';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from './product/product.module';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { MyArtworkComponent } from './my-artwork/my-artwork.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from './account/account.component';
import { EstimateComponent } from './estimate/estimate.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
 

@NgModule({
  declarations: [HomeComponent, UserprofileComponent, MyArtworkComponent, CategoryComponent, 
    DashboardComponent, AccountComponent, EstimateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HomeRouterModule,
    SharedModule,
    ProductModule,
    NgbModule,
    MdbTabsModule,
  ],
  providers: [DatePipe]
})
export class HomeModule { }
