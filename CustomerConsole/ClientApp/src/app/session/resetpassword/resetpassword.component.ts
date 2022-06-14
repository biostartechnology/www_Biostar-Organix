import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from 'src/app/models/input.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  message:string = "";
  showLoader:Boolean = true;
  step:number = 1;
  forgotPassword:Input[] = [
    {
      fieldId : "Password",
      label:"Enter New Password",
      fieldValue:'',
      type:'password',
      isValid:true,
      errorMesg:'Enter valid Password',
      required:true
    }
  ];

  constructor(private route: ActivatedRoute,
    private router:Router,
    private auth:AuthService,
    private helper:HelperService) {
    this.route.queryParams.subscribe(params => {
        var id = params['id'];
        if(id){
            this.message = "Verifying...";
            this.auth.VerifyForgotPasswordRequest(id).then((data)=>{
              if(data){
                this.showLoader = false;
              }
              else{
                this.message = "Invalid Request. Please try again.";
              }
            },(e)=>{
                console.log(e);
            });
        }
        else{
          this.router.navigate(['/session/login']);
        }
    });
  }

  onSubmit(){
    if(this.helper.isFormValid(this.forgotPassword)){
      this.route.queryParams.subscribe(params => {
        var json = {
          Id: params['id'],
          NewPassword: this.forgotPassword[0].fieldValue
        };
        this.auth.setNewPassword(json).then((data)=>{
          this.step = 2;
          if(data){
            this.message = "Password changed successfully. Please login. Redirecting in 5sec...";
            setTimeout(()=>{ this.router.navigate(['/session/login']); }, 5000);
          }
          else{
            this.message = "Request to change password failed.";
          }
        },(e)=>{
            this.step = 2;
            console.log(e);
        });
      });
      
    }
  }

}
