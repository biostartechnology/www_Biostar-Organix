import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionModule } from './session/session.module';
import { HomeModule } from './home/home.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  FormsModule } from '@angular/forms';
import { GridViewComponent } from './shared/grid-view/grid-view.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewOrdersComponent } from './home/product/view-orders/view-orders.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ViewOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SessionModule,
    HttpClientModule,
    FormsModule,
    HomeModule,
    MatSnackBarModule,
    SharedModule
  ],
  providers: [MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
