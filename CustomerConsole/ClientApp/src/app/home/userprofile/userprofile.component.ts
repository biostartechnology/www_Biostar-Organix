import { Route } from '@angular/compiler/src/core';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppconstantsService } from '../../services/appconstants.service';
import { HelperService } from '../../services/helper.service';
import { HttputilityService } from '../../services/httputility.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  @ViewChild('fileToUpload') fileUploaded?: ElementRef<HTMLElement>;
  profilePic: any = "/assets/img/noImg_placeholder.jpg";

  triggerFileClick() {
    if (this.fileUploaded) {
      let el: HTMLElement = this.fileUploaded.nativeElement;
      el.click();
    }
  }

  onFileUploaded(event: any) {
    var file = event.target.files;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        this.profilePic = fileReader.result;
      }
    }
    fileReader.readAsDataURL(file[0]);
  }
  selectedRow: any = null;
  isEditRow: boolean = false;
  
  constructor(private http: HttputilityService, private helper: HelperService, private router: Router) {
    let data = this.helper.getDataFromStorageDetails("sessiondetails");
    if (data) {
      this.UserDetails = JSON.parse(data);
      this.setUserDetails(this.UserDetails);
    }
  }

  UserDetails: any;

  ngOnInit(): void {
  }

  UsersDetails = [
  {
    fieldId: "FirstName",
    label: "Full Name",
    required: true,
    fieldValue: "",
    type: "text",
    isValid: true,
    errorMesg: "Please enter first name"
  },
  {
    fieldId: "DateOfBirth",
    label: "Date of Birth",
    required: true,
    fieldValue: "",
    type: "date",
    isValid: true,
    errorMesg: "Please enter date of birth"
  },
  //{
  //  fieldId: "EmailId",
  //  label: "Email Id",
  //  required: true,
  //  fieldValue: "",
  //  readOnly:true,
  //  type: "text",
  //  isValid: true,
  //  errorMesg: "Please enter valid email id"
  //},
  {
    fieldId: "Phone",
    label: "Phone",
    required: true,
    fieldValue: "",
    type: "text",
    isValid: true,
    errorMesg: "Please enter phine number"
  },
  //{
  //  fieldId: "Company",
  //  label: "Company",
  //  required: true,
  //  fieldValue: "",
  //  type: "text",
  //  isValid: true,
  //  errorMesg: "Please enter company name"
  //},
  //{
  //  fieldId: "StreetName",
  //  label: "Street1",
  //  required: true,
  //  fieldValue: "",
  //  type: "text",
  //  isValid: true,
  //  errorMesg: "Please enter address 1"
  //},
  //{
  //  fieldId: "StreetName1",
  //  label: "Street2",
  //  required: true,
  //  fieldValue: "",
  //  type: "text",
  //  isValid: true,
  //  errorMesg: "Please enter address 2"
  //},
  //{
  //  fieldId: "PostCode",
  //  label: "Zip Code",
  //  required: true,
  //  fieldValue: "",
  //  type: "number",
  //  isValid: true,
  //  errorMesg: "Please enter zip code"
  //},
  //{
  //  fieldId: "TimeZone",
  //  label: "Time Zone",
  //  required: true,
  //  fieldValue: "",
  //  type: "text",
  //  isValid: true,
  //  errorMesg: "Please enter time zone"
  //},
  
];

  setUserDetails(data) {
    if (data) {
      this.helper.MapDataToModel(this.UsersDetails, data);
      if (data.ProfilePic) {
        this.profilePic = data.ProfilePic;
      }
      else {
        this.profilePic = "/assets/img/noImg_placeholder.jpg";
      }
    }
  }

  cancelClicked() {
    this.router.navigate([".."]);
  }

  onSaveClicked(): void {
    if (this.helper.isFormValid(this.UsersDetails)) {
      var json: any = {};
      this.helper.getDataJsonMapped(this.UsersDetails, json);
      json["_id"] = this.UserDetails["_id"];
      json.ProfilePic = this.profilePic;
      for (var key in this.UserDetails[0]) {
        if (json[key] == undefined) {
          json[key] = this.UserDetails[0][key];
        }
      }
      this.http.post(AppconstantsService.homeAPIs.userapi, json).then((d) => {
        if (d && d.isSucess) {
          this.helper.AddToLocalStorage(JSON.stringify([json]), "sessiondetails");
          this.router.navigate([".."]);
        }
      }, (e) => {
      });
    }
  }

}
