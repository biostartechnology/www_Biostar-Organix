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

  static categorySelected: any;
  static ProductNavigation: any;
  static ProductNavigationArg: any;
  static SubCategoryNavigation: any;
  static SubCategoryNavigationArg: any;
  static CategoryList: any = [];
  static CartCountUpdateMethod: any;
  static CartCountUpdateArg: any;

  setProductLoadCallBack(event, arg1) {
    HelperService.ProductNavigation = event;
    HelperService.ProductNavigationArg = arg1;
  }

  setSubCategoryCallBack(event, arg1) {
    HelperService.SubCategoryNavigation = event;
    HelperService.SubCategoryNavigationArg = arg1;
  }

  setCategorySelected(category) {
    HelperService.categorySelected = category;
  }

  setCartCountUpdateMethod(callback, arg) {
    HelperService.CartCountUpdateMethod = callback;
    HelperService.CartCountUpdateArg = arg;
  }

  getDateTimeFormatted(date) {
    date = new Date(date);
    return this.datePipe.transform(date, 'MMMM d, y HH:MM:SS');
  }

  getDateFormatted(date) {
    date = new Date(date);
    return this.datePipe.transform(date, 'MMMM d, y');
  }

  getCategoryDetails(arg) {
    if (HelperService.CategoryList.length == 0) {
      arg.get(AppconstantsService.homeAPIs.category).then((data) => {
        if (data) {
          HelperService.CategoryList = data;
        }
      },
      (error) => {

      });
    }
  }

  constructor(private router: Router, private _snackBar: MatSnackBar, private sanitizer: DomSanitizer, private datePipe: DatePipe) {
    HelperService.CategoryList = AppconstantsService.CategoryList;
  }

  Logout() {
    localStorage.clear();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  showErrorTostMessage(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['bg-danger', 'text-white']
    });
  }

  showSuccessTostMessage(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['bg-success', 'text-white']
    });
  }


  stopWorkProgressBar() {

  }

  startWorkProgressBar() {

  }

  getDataJsonMapped(data: Input[], json: any): any {
    for (var i = 0; i < data.length; i++) {
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

  isFormValid(data: Input[]) {
    var valid = true
    for (var i = 0; i < data.length; i++) {
      if (data[i].required) {
        data[i].isValid = true;
        switch (data[i].type) {
          case 'email':
            var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            valid = regexp.test(data[i].fieldValue);
            data[i].isValid = valid;
            break;
          case 'number':
            if (isNaN(parseFloat(data[i].fieldValue))) {
              valid = false;
              data[i].isValid = false;
            }
            break;
          case 'text': case 'password': default:
            if (!data[i].fieldValue || !data[i].fieldValue.trim()) {
              valid = false;
              data[i].isValid = false;
            }
            break;
        }

      }
    }
    return valid;
  }

  AddToLocalStorage(data: any, name: string) {
    localStorage.setItem(name, data);
  }


  getDataFromStorageDetails(name: string): any {
    return localStorage.getItem(name);
  }

}
