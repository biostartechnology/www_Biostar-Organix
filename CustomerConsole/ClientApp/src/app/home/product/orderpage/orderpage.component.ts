import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';

@Component({
  selector: 'app-orderpage',
  templateUrl: './orderpage.component.html',
  styleUrls: ['./orderpage.component.scss']
})

export class OrderpageComponent implements OnInit {
  shipping = '0';
  ShippingCharge = 0;
  SqFtMeassurement = 1;
  TotalPrice = 0;
  UnitPrice = 0;
  ShippingCost = 0;
  @Input() selectedCategory: any;
  product: any = {};
  selectedTabId: string = "tab1";
  OrderCount = 1;
  PickUpDateTime: Date;
  JobName: string = "";
  shippingType: number = -1;
  widthFt: any = 0;
  widthInch: any = 0;
  heightFt: any = 0;
  heightInch: any = 0;
  noOfSides: any = "1 Side";
  polePocket: any = "No Pole Pockets";
  hem: any = "All Sides";
  grommet = 'Every 2" All Sides';
  windslit = "No Windslit";
  webbing = "No Webbing, No D-rings";
  corner = "Reinforced Top Only";
  rope = "No Rope Sewn";
  turnAround = "Next Day (before 10am PST)";
  designProof = "No Proof, Run As Is";
  orderView = 0;
  bannerPoleMaxHeight = [18, 24, 30];
  bannerMaxWidth = 99;
  bannerMinWidth = 24;
  poleBannerSizeArray = [];
  poleBannerSize = 18 * 24;
  selectedTabid = "";
  windSlit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  @Input() set Product(data: any) {
    this.product = data;
    var d = new Date();
    this.setOrderView(this.selectedCategory.id);
    this.PickUpDateTime = new Date(d.setDate(d.getDate() + data["turnAroundDays"]));
  }

  shippingSelected() {
    switch (this.shipping) {
      case '0':
        this.ShippingCharge = this.Product.ShippingCharge0;
        break;
      case '3':
        this.ShippingCharge = this.Product.ShippingCharge3;
        break;
      case '7':
        this.ShippingCharge = this.Product.ShippingCharge7;
        break;
    }
    this.TotalPrice += this.ShippingCharge;
  }

  parseInt(val) {
    return parseInt(val);
  }
  getWidth() {
    var wf = this.widthFt ? parseFloat(this.widthFt) : 0;
    var wi = this.widthInch ? parseFloat(this.widthInch) : 0;
    return ((wf * 12 + wi));
  }

  getHeight() {
    var hf = this.heightFt ? parseFloat(this.heightFt) : 0;
    var hi = this.heightInch ? parseFloat(this.heightInch) : 0;
    return ((hf * 12 + hi));
  }

  getSQFT() {
    var wf = this.widthFt ? parseFloat(this.widthFt) : 0;
    var wi = this.widthInch ? parseFloat(this.widthInch) : 0;
    var hf = this.heightFt ? parseFloat(this.heightFt) : 0;
    var hi = this.heightInch ? parseFloat(this.heightInch) : 0;
    return ((wf + (wi / 12)) * (hf + (hi / 12))).toPrecision(2);
  }

  setOrderView(id) {
    this.TotalPrice = this.Product.minimumPrice;
    this.UnitPrice = this.Product.minimumPrice;
    switch (id) {
      case '48fce054-293c-4abf-a031-e732d072dde2':
      case '31153e04-dadb-4f6e-8176-ee88ab4f9916':
      case '32376fed-9cfc-43b7-a552-86e1d82e902f':
      case '31153e04-dadb-4f6e-8176-ee88ab4f9916':
      case '31153e04-dadb-4f6e-8176-ee88ab4f9916':
      case '81018c58-60c2-4446-ba77-cdb7a7cead5b':
        this.orderView = 1;
        break;
      case '01a8d23e-61ea-476a-85b8-d905354e010f':
        this.orderView = 2;
        break;
      case '94926d24-4dfd-4c87-b06e-29a558add24c':
        for (var i = 0; i < this.bannerPoleMaxHeight.length; i++) {
          for (var j = this.bannerMinWidth; j <= this.bannerMaxWidth; j++) {
            this.poleBannerSizeArray.push({ value: this.bannerPoleMaxHeight[i] * j, label: this.bannerPoleMaxHeight[i] + '" * ' + j + '"' })
          }
          if (i + 1 < this.bannerPoleMaxHeight.length) {
            this.poleBannerSizeArray.push({ value: this.bannerPoleMaxHeight[i] * 99, label: ' ' });
            this.poleBannerSizeArray.push({ value: this.bannerPoleMaxHeight[i] * 99, label: '------------------------------------' });
            this.poleBannerSizeArray.push({ value: this.bannerPoleMaxHeight[i] * 99, label: ' ' });
          }
        }
        this.selectedTabid = "Banner-Hardware";
        this.SqFtMeassurement = this.poleBannerSize / 12;
        this.setPoleBannerPrice("Banner-Hardware")
        this.orderView = 3;
        break;
      case 'e606e8f9-42af-46c0-8ff0-d20a0769b6fc':
        this.orderView = 4;
    }
  }

  setPoleBannerPrice(id) {
    this.selectedTabid = id;
    switch (id) {
      case "Banner-Hardware":
        var price = parseFloat(this.Product.minimumPrice);
        if ((this.SqFtMeassurement * this.Product.Price) > price) {
          price = this.SqFtMeassurement * this.Product.Price;
        }
        this.UnitPrice = parseFloat(this.Product.bannerHardwareCost) + price;
        break;
      case "Banner-Only":
        var price = parseFloat(this.Product.minimumPrice);
        if ((this.SqFtMeassurement * this.Product.Price) > price) {
          price = this.SqFtMeassurement * this.Product.Price;
        }
        this.UnitPrice = parseFloat(this.Product.bannerHardwareCost) + parseFloat(this.Product.minimumPrice);
        break;
      case "Hardware-Only":
        this.UnitPrice = parseFloat(this.Product.bannerHardwareCost) * this.SqFtMeassurement;
        break;
    }
    this.TotalPrice = this.UnitPrice;
  }

  onSelect(evt, id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
    this.setPoleBannerPrice(id);
  }

  get Product() {
    return this.product;
  }

  onSizeChange(size) {
    this.SqFtMeassurement = size;
    if (this.selectedTabid) {
      this.setPoleBannerPrice(this.selectedTabid);
    }
    else {
      this.updatePrice();
    }
  }

  updatePrice() {
    var total = this.product["Price"] * this.SqFtMeassurement;
    if (total < this.product["minimumPrice"]) {
      total = this.product["minimumPrice"];
    }
    this.UnitPrice = total;
    this.TotalPrice = total * this.OrderCount;
    this.TotalPrice += this.ShippingCharge;
  }

  constructor(private sanitizer: DomSanitizer, private helper: HelperService, private http: HttputilityService) {
  }

  ngOnInit(): void {
  }

  getDeliveryEstimation() {
    var date = new Date();
    date.setDate(date.getDate() + this.Product.ProductionDays);
    return this.helper.getDateFormatted(date) + " 10:30AM PST - 5PM PST";
  }

  onShippingChange(type) {
    this.shippingType = type;
  }

  addtoCartOrder() {
    if (!this.JobName) {
      this.helper.showErrorTostMessage("Please provide Job Name");
      return;
    }
    if (this.shippingType < 0) {
      this.helper.showErrorTostMessage("Please select shipping option.");
      return;
    }
    var json = {
      OrderCount: this.OrderCount,
      TotalCost: this.TotalPrice,
      UnitPrice: this.UnitPrice,
      ShippingCost: this.ShippingCharge,
      PickUpDateTime: this.PickUpDateTime,
      ProductId: this.product["Id"],
      Price: this.product["Price"],
      ProductName: this.product["ProductName"],
      ProductTitle: this.product["ProductTitle"],
      AccountId: this.product["AccountId"],
      CategoryId: this.product["CategoryId"],
      ProductSerialNo: this.product["SerialNo"],
      JobName: this.JobName,
      DeliveryType: this.shippingType,
      WidthFt: this.widthFt,
      WidthInch: this.widthInch,
      HeightFt: this.heightFt,
      HeightInch: this.heightInch,
      NoOfSides: this.noOfSides,
      PolePocket: this.polePocket,
      Hem: this.hem,
      Grommet: this.grommet,
      Windslit: this.windslit,
      Webbing: this.webbing,
      Corner: this.corner,
      Rope: this.rope,
      TurnAround: this.turnAround,
      DesignProof: this.designProof,
      ProductImage: this.product["ImagesUrls"][0].Path,
      Products: this.selectedTabid,
      PoleBannerSize: this.poleBannerSize,
      PoleWidth: this.poleBannerSize,
    }

    this.http.put(AppconstantsService.homeAPIs.cart, json).then((d) => {
      if (d && d.isSucess) {
        this.helper.showSuccessTostMessage(d.message, d.close);
        this.OrderCount = 0;
        this.TotalPrice = 0;
        this.PickUpDateTime = new Date();
        HelperService.CartCountUpdateMethod(HelperService.CartCountUpdateArg);
      }
    }, (e) => {
      console.log(e);
    });
  }

}
