import { Component, OnInit } from '@angular/core';
import { Input } from 'src/app/models/input.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-forgotpswd',
  templateUrl: './forgotpswd.component.html',
  styleUrls: ['./forgotpswd.component.scss']
})
export class ForgotpswdComponent implements OnInit {

  errorMesg:string = "";
  step: number = 1;
  message = "";
  constructor(private auth:AuthService,private helper:HelperService) { }
  showLoading = false;
  forgotPassword:Input[] = [
    {
      fieldId : "EmailId",
      label:"Email Id",
      fieldValue:'',
      type:'email',
      isValid:true,
      errorMesg:'Enter valid Email Address',
      required:true
    }
  ];

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.helper.isFormValid(this.forgotPassword)){
      var data = {
        EmailId : this.forgotPassword[0].fieldValue
      }
      this.showLoading = true;
      this.auth.VerifyAndSendResetPswdMail(data).then((data)=>{
        this.showLoading = false;
        if(data && data.isSucess){
          this.step = 2;
          this.message = data.message;
        }
        else{
          this.errorMesg = data.message;
        }
      },(e)=>{
        this.showLoading = false;
        this.step = 4;
        this.errorMesg  = "Error occured while trying to verify account. Please try again later or contact info@nlstechnology.com";
      });
    }
  }

}
