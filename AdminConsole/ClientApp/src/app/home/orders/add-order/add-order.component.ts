import { Component, OnInit } from '@angular/core';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HttputilityService } from '../../../services/httputility.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})

export class AddOrderComponent implements OnInit {

  tab: number = 0;
  selectedIndex: number = 0;
  CustomerEmail:string = "";
  
  customerInfoFields:any[] = [
    {
      fieldId: "existingCustomer",
      label: "Existing Customer",
      fieldValue: "true",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "newCustomer",
      label: "New Customer",
      fieldValue: "false",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "custmerName",
      label: "Customer Name / Email Address",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "emailAddr",
      label: "Email Address",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "password",
      label: "Password",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "confirmPswd",
      label: "Confirm Password",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//5
      fieldId: "offers",
      label: "Exclusive Offers",
      fieldValue: "",
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "firstName",
      label: "First Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "lastName",
      label: "Last Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "companyName",
      label: "Company Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "phoneNumber",
      label: "Phone Number",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//10
      fieldId: "custAddr1",
      label: "Address Line 1",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "custAddr2",
      label: "Address Line 2",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "city",
      label: "Suburb/City",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//13
      fieldId: "country",
      label: "Country",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: false,
      options: AppconstantsService.countryList
    },
    {
      fieldId: "state",
      label: "State/Province",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "zipcode",
      label: "Zip/Postcode",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "customerAddres",
      label: "Save to customer's address book",
      fieldValue: false,
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },

  ]
  itemFields:any[] = [
    {
      fieldId: "existingCustomer",
      label: "Existing Customer",
      fieldValue: "true",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "newCustomer",
      label: "New Customer",
      fieldValue: "false",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "custmerName",
      label: "Customer Name / Email Address",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "emailAddr",
      label: "Email Address",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "password",
      label: "Password",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "confirmPswd",
      label: "Confirm Password",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//5
      fieldId: "offers",
      label: "Exclusive Offers",
      fieldValue: "",
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "firstName",
      label: "First Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "lastName",
      label: "Last Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "companyName",
      label: "Company Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "phoneNumber",
      label: "Phone Number",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//10
      fieldId: "custAddr1",
      label: "Address Line 1",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "custAddr2",
      label: "Address Line 2",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "city",
      label: "Suburb/City",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//13
      fieldId: "country",
      label: "Country",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: false,
      options: AppconstantsService.countryList
    },
    {
      fieldId: "state",
      label: "State/Province",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "zipcode",
      label: "Zip/Postcode",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "customerAddres",
      label: "Save to customer's address book",
      fieldValue: false,
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },

  ]
  shippingFields:any[] = [
    {
      fieldId: "existingCustomer",
      label: "Existing Customer",
      fieldValue: "true",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "newCustomer",
      label: "New Customer",
      fieldValue: "false",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "custmerName",
      label: "Customer Name / Email Address",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "emailAddr",
      label: "Email Address",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "password",
      label: "Password",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "confirmPswd",
      label: "Confirm Password",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//5
      fieldId: "offers",
      label: "Exclusive Offers",
      fieldValue: "",
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "firstName",
      label: "First Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "lastName",
      label: "Last Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: true,
    },
    {
      fieldId: "companyName",
      label: "Company Name",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "phoneNumber",
      label: "Phone Number",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//10
      fieldId: "custAddr1",
      label: "Address Line 1",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "custAddr2",
      label: "Address Line 2",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "city",
      label: "Suburb/City",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {//13
      fieldId: "country",
      label: "Country",
      fieldValue: "",
      type: "select",
      isValid: true,
      errorMesg: "",
      required: false,
      options: AppconstantsService.countryList
    },
    {
      fieldId: "state",
      label: "State/Province",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "zipcode",
      label: "Zip/Postcode",
      fieldValue: "",
      type: "text",
      isValid: true,
      errorMesg: "",
      required: false,
    },
    {
      fieldId: "customerAddres",
      label: "Save to customer's address book",
      fieldValue: false,
      type: "checkbox",
      isValid: true,
      errorMesg: "",
      required: false,
    },

  ]
  finalizeFields:any[] =[
    {
      fieldId: "existingCustomer",
      label: "Existing Customer",
      fieldValue: "true",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
    {
      fieldId: "newCustomer",
      label: "New Customer",
      fieldValue: "false",
      type: "radio",
      isValid: true,
      errorMesg: "",
      required: false,
      group: 'inventorytracking'
    },
  ]

  constructor(private http: HttputilityService) { }

  ngOnInit(): void {
  }

  CreateClicked(){

  }

  CancelClicked(){

  }

  BackClicked(){

  }

  nextStep() {

  }

  SearchCustomer(val:string){
    this.http.get(AppconstantsService.CustomerApis.GetMatchingCustomer).then((data)=>{
      
    },(e)=>{

    })
  }

}
