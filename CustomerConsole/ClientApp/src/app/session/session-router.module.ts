import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ForgotpswdComponent } from './forgotpswd/forgotpswd.component';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path:'session/login', component:LoginComponent},
  {path:'session/forgotpassword', component:ForgotpswdComponent},
  { path: 'session/register', component: SignupComponent },
  { path: 'session/resetpassword', component: ResetpasswordComponent },
  { path: 'session/verifyEmail', component: VerifyComponent },
  { path: 'session/contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SessionRouterModule { }
