import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppconstantsService } from 'src/app/services/appconstants.service';
import { HttputilityService } from 'src/app/services/httputility.service';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  cartCount = "";
  public loggedIn = false;
  public searchField = false;
  public showNavbar = false;
  public isShownSearch = false;
  public SidebarSmallScreen = false;
  public sidebarOpened = false;
  notificationMesg: any = [];
  interval: any;
  productSearchVal = "";

  openSearchField() {
    this.searchField = !this.searchField;
  }

  toggleOffNavrBar() {
    this.showNavbar = !this.showNavbar;
    if (this.showNavbar) {
      document.querySelector('.navbar-collapse').classList.add('show');
    }
    else {
      document.querySelector('.navbar-collapse').classList.remove('show');
    }
  }
  toggleSearchBar() {
    this.isShownSearch = !this.isShownSearch;
  }
  toggleOffSidebar() {
    let body =document.querySelector('body');
    if (this.SidebarSmallScreen) {
      this.sidebarOpened = !this.sidebarOpened;
        if (this.sidebarOpened) {
          body.classList.add('sidebar-icon-only');
        }
        else {
          body.classList.remove('sidebar-icon-only');
        }
      }
  }
  constructor(config: NgbDropdownConfig, private auth: AuthService, private router: Router, private helper: HelperService, private http: HttputilityService) {
    config.placement = 'bottom-right';
    this.auth.validateSession().then((data) => { this.loggedIn = true; this.getCartCount(this); this.helper.setCartCountUpdateMethod(this.getCartCount, this); }, (e) => { });
    this.getMessagesServer();
  }

  getCartCount(arg) {
    arg.http.get(AppconstantsService.homeAPIs.cart + "/count").then((data: any) => {
      if (data) {
        arg.cartCount = data;
        
      }
    }, (error: any) => { })
  }


  ngOnInit() : void{
      if (window.innerWidth <= 990) {
        this.SidebarSmallScreen = true;
      }
      else {
        this.SidebarSmallScreen = false;
      }
  }

  navigateToSection(section: string) {
    window.location.href = '';
    window.location.href = section;
  }

  logout() {
    this.auth.logoutUser().then(a => {
      this.helper.Logout();
      this.loggedIn = false;
    });
  }

  signOutClick() {

  }

  searchProducts() {
    window.location.href = "/home/product?search=" + this.productSearchVal;
    //this.router.navigate(['/home/product'],{ queryParams: { search: this.productSearchVal } });
    // if (!HelperService.ProductNavigation || window.location.href.indexOf('/product') == -1) {
    //   this.router.navigate(['/home/product'],{ queryParams: { search: this.productSearchVal } });
    // }
    // else {
    //   HelperService.ProductNavigation(data, HelperService.ProductNavigationArg);
    // }
  }

  onProductSearch() {
    if (this.interval) {
      clearTimeout(this.interval);
      this.interval = null;
    }
    this.interval = setTimeout(() => {
      this.searchProducts()
    }, 1000);
  }

  getMessagesServer() {
    this.http.get(AppconstantsService.homeAPIs.message).then((data: any) => {
      if (data) {
        this.notificationMesg = data;
      }
    }, (error: any) => { })
  }

}

