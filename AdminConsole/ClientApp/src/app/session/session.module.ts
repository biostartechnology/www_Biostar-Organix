import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotpswdComponent } from './forgotpswd/forgotpswd.component';
import { FormsModule } from '@angular/forms';
import { SessionRouterModule } from './session-router.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommingSoonComponent } from '../shared/comming-soon/comming-soon.component';
import { SignupComponent } from './signup/signup.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyComponent } from './verify/verify.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    LoginComponent, 
    ForgotpswdComponent, 
    SignupComponent,
    ForgotpswdComponent,
    ResetpasswordComponent,
    VerifyComponent,
    ContactComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    SessionRouterModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    LoginComponent
  ]
})
export class SessionModule { }
