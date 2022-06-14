import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';
import { loadScript } from "@paypal/paypal-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemsList: any = [];
  couponCode: string = "";
  shippingCharge = 0.00;
  subTotal = 0.00;
  orderPlaced = false;
  paynow = false;
  constructor(private router: Router, private sanitizer: DomSanitizer, private helper: HelperService, private http: HttputilityService) {
    let grid = {
      start: 0,
      limit: 100,
      sortCol: "time",
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(grid);
  }

  ngOnInit(): void {
    console.log(111);
  }

  goBack() {
    this.router.navigate(["/home/products"]);
  }

  onAction(data) {
    switch (data.action) {
      case "delete":
        this.deleteItemFromCart(data.item);
        break;
      case "savelater":
        this.saveItemForLater(data.item);
        break;
      case "ordercount":
        this.updateOrderCount(data.item);
        break;
    }
  }

  refreshCart() {
    let grid = {
      start: 0,
      limit: 100,
      sortCol: "time",
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(grid);
}

  deleteItemFromCart(item) {
    return this.http.put(AppconstantsService.homeAPIs.cart + "/delete", { Id: item.Id }).then((d) => {
      if (d && d.isSucess) {
        this.helper.showSuccessTostMessage("Deleted item from cart successfully",null);
        this.refreshCart();
      }
    });
  }

  saveItemForLater(item) {
    return this.http.put(AppconstantsService.homeAPIs.cart + "/status", { Id: item.Id, CartStatus:1 }).then((d) => {
      if (d && d.isSucess) {
        this.refreshCart();
      }
    });
  }


  updateOrderCount(item) {
    return this.http.put(AppconstantsService.homeAPIs.cart + "/orderCount", item).then((d) => {
      if (d && d.isSucess) {
        this.refreshCart();
      }
    });
  }

  payNowClick() {
    this.paynow = true;
  }

  cashOnDeliveryChange() {
    this.paynow = false;
    return this.http.put(AppconstantsService.homeAPIs.cart + "/captureOrder/null", "").then((d) => {
      console.log(d);
      if (d && d.isSucess) {
        this.helper.showSuccessTostMessage("Order placed successfully", null);
        this.router.navigate(["/orders"]);
      }
    });
  }

  loadPaymentMode() {
    loadScript({ "client-id": "Ac-KXrKpxm4ML8sLWjb8x5RsZIcz3_RIs5oUAkU4rEpUAp_eIW0SsMeJQkx6koV4YOmxP0Y02rdbmnmC" })
      .then((paypal) => {
        var totalPrice = this.subTotal;
        var items = (this.itemsList);
        var http = this.http;
        var ar = [];
        var quantity = 0;
        for (var i = 0; i < this.itemsList.length; i++) {
          quantity += this.itemsList[i].OrderCount;
          ar.push({
            name: this.itemsList[i]["ProductName"],
            quantity: this.itemsList[i].OrderCount + "",
            category: "PHYSICAL_GOODS",
            unit_amount: {
              currency_code: 'USD',
              value: (this.itemsList[i].TotalCost / this.itemsList[i].OrderCount) + ""
            }
          })
        }
        paypal.Buttons(
          {
            createOrder: function (data, actions) {
              return http.put(AppconstantsService.homeAPIs.cart + "/createOrder", "").then((d) => {
                return d.id;
              });

            },
            onApprove: function (data, actions) {
              return http.put(AppconstantsService.homeAPIs.cart + "/captureOrder/" + data.orderID, "").then((d) => {
                console.log(d);
                if (d && d.isSucess) {
                  window.location.href = "/orders";
                }
              });
            },
            onCancel: function (data) {
              console.log("on cancel", data);
              // Show a cancel page, or return to cart
            },
            onError: function (data) {
              console.log("on error", data);
              // Show a cancel page, or return to cart
            },
            onClick: function (data) {
              console.log("on click", data);
              // Show a cancel page, or return to cart
            },

          }
        )
          .render("#paypal-button-container")
          .catch((error) => {
            console.error("failed to render the PayPal Buttons", error);
          });
      })
      .catch((error) => {
        console.error("failed to load the PayPal JS SDK script", error);
      });
  }


  getDatFromServer(grid: any) {
    this.http.post(AppconstantsService.homeAPIs.cart, grid).then((data: any) => {
      if (data) {
        console.log(data);
        this.itemsList = data.rows;
        var subTotal = 0;
        var shippingTotal = 0;
        for (var i = 0; i < this.itemsList.length; i++) {
          subTotal += this.itemsList[i]["TotalCost"];
          shippingTotal += this.itemsList[i]["ShippingCost"];
        }
        this.subTotal = subTotal;
        this.shippingCharge = shippingTotal;
      }
    }, (error: any) => { })
  }

}
