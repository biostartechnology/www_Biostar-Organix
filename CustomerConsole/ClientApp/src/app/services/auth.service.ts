import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppconstantsService } from './appconstants.service';
import { HelperService } from './helper.service';
import { HttputilityService } from './httputility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setNewPassword(data:any) {
    return this.httpUtility.post(AppconstantsService.SessionAPIs.setNewPassword, data);
  }
  
  VerifyForgotPasswordRequest(id:any){
    return this.httpUtility.get(AppconstantsService.SessionAPIs.passwordReset + "/" + id);
  }

  VerifyAndSendResetPswdMail(data: any) {
    return this.httpUtility.post(AppconstantsService.SessionAPIs.forgotPassword,data);
  }

  constructor(private httpUtility: HttputilityService, private helper: HelperService) { }

  isValidSession(email: string, password: string) {
    return this.httpUtility.get(AppconstantsService.SessionAPIs.version);
  }

  VerifyAccount(id: any) {
    return this.httpUtility.get(AppconstantsService.SessionAPIs.verifyAccount + "/" + id);
  }

  isEmailExist(id){
    return this.httpUtility.get(AppconstantsService.SessionAPIs.register+"/"+id);
  }

  signupUserProfile(data: any) {
    return this.httpUtility.post(AppconstantsService.SessionAPIs.register,data);
  }

  resetPassword(email: string) {
    var data = {
      userName:btoa(email)
    };
    return this.httpUtility.post(AppconstantsService.SessionAPIs.resetPassword,data);
  }

  validateSession(): Promise<any>{
    return this.httpUtility.validateSession(AppconstantsService.SessionAPIs.version);

  }

  resendEmail(email:string){
    return this.httpUtility.get(AppconstantsService.SessionAPIs.register+"?email="+email);
  }

  loginUser(email:string,password:string):Promise<any>{
      var data = {
        EmailId:btoa(email),
        Password:btoa(password),
      };
      return this.httpUtility.post(AppconstantsService.SessionAPIs.loginAPI,data);
  }

  logoutUser(): Promise<any> {
    return this.httpUtility.delete(AppconstantsService.SessionAPIs.loginAPI + "/logout");
  }

}
