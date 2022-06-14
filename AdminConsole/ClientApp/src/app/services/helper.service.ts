import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '../models/input.model';
import { AuthService } from './auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { AppconstantsService } from './appconstants.service';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  loader:any;

  static CategoryList: any = [];
  getDateTimeFormatted(date) {
    date = new Date(date);
    return this.datePipe.transform(date, 'MMMM d, y HH:MM:SS');
  }
  constructor(private router: Router, private _snackBar: MatSnackBar, private sanitizer: DomSanitizer, private datePipe: DatePipe) {
    HelperService.CategoryList = AppconstantsService.CategoryList;
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(["/session/login"]);
  }


  Pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }
  
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  stopWorkProgressBar() {
   // this.loader.complete();
  }

  startWorkProgressBar() {
      //this.loader.start();
  }


  AddToLocalStorage(data: any, name: string) {
    localStorage.setItem(name, data);
  }


  getDataFromStorageDetails(name: string): any {
    return localStorage.getItem(name);
  }

  getDataJsonMapped(data: Input[],json:any) : any{
    for(var i=0;i<data.length;i++)
    {
      json[data[i].fieldId] = data[i].fieldValue;
    }
  }

  MapDataToModel(model: Input[], data: any): any {
    if (data) {
      for (var i = 0; i < model.length; i++) {
        model[i].fieldValue = data[model[i].fieldId];
      }
    }
  }

  isFormValid(data:any[]){
    var valid = true
    for(var i=0;i<data.length;i++){
        if(data[i].required){
          data[i].isValid = true;
          switch(data[i].type){
            case 'email':
              var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
              valid = regexp.test(data[i].fieldValue);
              data[i].isValid = valid;
              break;
            case 'number':
              if(isNaN(parseFloat(data[i].fieldValue))){
                valid = false;
                data[i].isValid = false;
              }
              break;
            case 'text':case 'password':default:
              if(!data[i].fieldValue || !(data[i].fieldValue+"").trim()){
                valid = false;
                data[i].isValid = false;
              }
              break;
          }
          
        }
    }
    return valid;
  }



  showErrorTostMessage(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: "error"
    });
  }

  showSuccessTostMessage(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: "success"
    });
  }

}
