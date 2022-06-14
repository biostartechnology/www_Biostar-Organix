import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Input } from 'src/app/models/input.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm0Submitted = false;
  registerForm1Submitted = false;
  registerForm2Submitted = false;
  step:number = 1;
  eulaCheck: boolean = false;
  subscribeCheck: boolean = false;
  emailAddress: string = "";
  showLoading: boolean = false;
  signUpType: number = 0;//0->vendor,1->client
  vendorId: string = '';
  errorMesg: string = ''
  signUpError: string = "";
  constructor(private helper: HelperService, private router: Router, private auth :AuthService) { }

  ngOnInit() {
  }
  

  signUpDetails_1:Input[] = [
    {
      fieldId : "EmailId",
      label:"Email Id",
      fieldValue:'',
      type:'email',
      isValid:true,
      errorMesg:'Enter valid Email Address',
      required:true
    },
    {
      fieldId : "Password",
      label:"New Password",
      type:'password',
      fieldValue:'',
      isValid:true,
      errorMesg:'Enter valid password',
      required:true
    },
    {
      fieldId : "FirstName",
      label:"First Name",
      type:'text',
      fieldValue:'',
      isValid:true,
      errorMesg:'Enter First Name',
      required:true
    },
    {
      fieldId : "LastName",
      label:"Last Name",
      type:'text',
      fieldValue:'',
      isValid:true,
      errorMesg:'Enter Last Name',
      required:true
    },
    {
      fieldId : "Phone",
      label:"Phone",
      type:'text',
      fieldValue:'',
      errorMesg:'Enter Phone Number',
      required:true,
      isValid:true,
    }
  ];
  signUpDetails_2: Input[] = [
    {
      fieldId: "streetAddress",
      label: "Street Address",
      fieldValue: '',
      type: 'text',
      isValid: true,
      errorMesg: 'Enter Street Address',
      required: true
    },
    {
      fieldId: "addressLine2",
      label: "Address Line 2",
      type: 'text',
      fieldValue: '',
      isValid: true,
      errorMesg: 'Enter Address Line 2',
      required: true
    },
    {
      fieldId: "city",
      label: "City",
      type: 'text',
      fieldValue: '',
      isValid: true,
      errorMesg: 'Enter City',
      required: true
    },
    {
      fieldId: "State",
      label: "State",
      type: 'text',
      fieldValue: '',
      isValid: true,
      errorMesg: 'Enter State',
      required: true
    },
    {
      fieldId: "zipCode:",
      label: "Post/Zip Code:",
      type: 'text',
      fieldValue: '',
      errorMesg: 'Enter Zip Code',
      required: true,
      isValid: true,
    }
  ];
  
  NavigateStep2(){
    this.registerForm1Submitted = true;
    if (!this.helper.isFormValid(this.signUpDetails_1) && !this.helper.isFormValid(this.signUpDetails_2)) {
      return;
    }
    this.step = 2;
  }

  //  On submit click, reset field value
  onSubmit() {
    this.registerForm2Submitted = true;
    if (!this.helper.isFormValid(this.signUpDetails_1) && !this.helper.isFormValid(this.signUpDetails_2) || !this.eulaCheck) {
      return;
    }
    this.showLoading = true;
    var json:any = {};
    for(var i=0;i<this.signUpDetails_1.length;i++)
    {
      json[this.signUpDetails_1[i].fieldId] = this.signUpDetails_1[i].fieldValue;
    }

   
    if (this.signUpType == 0) {
      json['UserType'] = "Vendor";
    }
    else {
      json['UserType'] = "Client";
    }
    json.VendorId = this.vendorId;
    this.emailAddress = json["EmailId"]
    this.auth.signupUserProfile(json).then((data) => {
      this.showLoading = false;
      if(data.isSucess){
        this.step = 3;
      }
      else {
        this.signUpError = data.message;
      }
    }, (e) => {
      this.signUpError = "Error occured";
      this.showLoading = false;
      console.log(e);
    });
  }


}
