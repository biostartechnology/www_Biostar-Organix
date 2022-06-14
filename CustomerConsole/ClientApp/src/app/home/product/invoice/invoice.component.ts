import { Component, OnInit } from '@angular/core';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  orderId = "";
  orderData = {};
  invoiceNA = false;
  ShippingCost = 0;
  constructor(private http: HttputilityService, private helper: HelperService) {
    this.orderId = window.location.href.split("?id=")[1];
    if (this.orderId) {
      this.getOrderDetails();
    }
  }

  getDate(date) {
    if (date) {
      return this.helper.getDateTimeFormatted(date);
    }
  }


  getOrderDetails() {
    this.http.get(AppconstantsService.homeAPIs.orders + "/" + this.orderId).then((data: any) => {
      if (data) {
        var shippingCost = 0;
        for (var i = 0; i < data.ItemsList.length; i++) {
          this.ShippingCost += data.ItemsList[i].ShippingCost;
        }
        this.orderData = data;
        console.log(data);
      }
      else {
        this.invoiceNA = true;
      }
    }
      , (error: any) => { })
  }

  ngOnInit(): void {
  }

  PrintClicked() {
    window.print();
  }
}
