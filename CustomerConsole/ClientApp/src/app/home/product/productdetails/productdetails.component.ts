import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppconstantsService } from '../../../services/appconstants.service';
import { AuthService } from '../../../services/auth.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})


export class ProductdetailsComponent implements OnInit {
  player: YT.Player;
  _product: any = {};
  _selectedCategory: any = {};
  validSession = false;
  OrderCount = 0;
  TotalPrice = 0;
  PickUpDateTime: Date;
  ImgPopupDisplayStyle = "none";
  selectedTabId = 1;

  @Input() set product(val: any) {
    this._product = val.product;
    this._selectedCategory = val.selectedCategory;
    console.log(this._selectedCategory);
    if (this._product["ImagesUrls"].length > 0) {
      this.imageSelected(this._product["ImagesUrls"][0]);
    }
  }

  get product() { return this._product; }

  selectedImage:any = {};

  constructor(private sanitizer: DomSanitizer, private helper: HelperService, private http: HttputilityService, private auth: AuthService) {
    this.auth.validateSession().then((d) => {
      this.validSession = true;
    });
  }

  imageSelected(img) {
    this.selectedImage = img
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  transform(v: string): SafeHtml {
    var d = this.sanitizer.bypassSecurityTrustHtml(v);
    console.log(d);
    return d;
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }



  ngOnInit() {
    console.log(this.product)
  }


  selectedTab: string = "specs";
  navigateToSection(section: string) {
    this.selectedTab = section;
  }
  selectedComponent: string = "";
  openOnClick(section: string) {
    if (this.selectedComponent != section) {
      this.selectedComponent = section;
    }
    else {
      this.selectedComponent = "";
    }
  }

  openPopupZoomImg() {
    this.ImgPopupDisplayStyle = "block";
  }
  closePopupZoomImg() {
    this.ImgPopupDisplayStyle = "none";
  }


}
