import { Component, Input, OnInit ,Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { AppconstantsService } from '../../services/appconstants.service';
import { HelperService } from '../../services/helper.service';
import { HttputilityService } from '../../services/httputility.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() verticalMenuStatus : boolean = true;

  constructor(private router: Router, private helper: HelperService, private http: HttputilityService) { }

 ngOnInit() {
 }
  selectedIndex: number = 0 ;
  isOpenMenu : boolean = false;
  selectMenu(index: number) {
      // this.isOpenMenu = !this.isOpenMenu;
      this.selectedIndex = index;
  }
 public menuList: any =[
  {
    state: 'home/dashboard',
    name: 'Dashboard',
    type: 'link',
     icon: 'explore',
  },
  {
    state: 'home/orders',
    name: 'Orders',
    type: 'sub',
    icon: 'dvr',
    children: [
      { state: 'view', name: 'View' },
      { state: 'add', name: 'Add' },
      // { state: 'export', name: 'Export' },
      // { state: 'draftOrders', name: 'Draft Orders' },
      // { state: 'shipments', name: 'Shipments' },
      // { state: 'trackingNumbers', name: 'Tracking Numbers' },
      // { state: 'giftCertificates', name: 'Gift Certificates' },
      // { state: 'orderStatuses', name: 'Order Statuses' },
    ]
  },
  {
    state: 'home/products',
    name: 'Products',
    type: 'sub',
    icon: 'widgets',
    children: [
      { state: 'view', name: 'View' },
      { state: 'detailedAdd', name: 'Product Detailed Add' },
      // { state: 'import', name: 'Import' },
      // { state: 'export', name: 'Export' },
       { state: 'productCategories', name: 'Product Categories' },
      // { state: 'productReviews', name: 'Product Reviews' },
      // { state: 'brands', name: 'Brands' },
    ]
  },
  {
    state: 'home/customer',
    name: 'Customers',
    type: 'sub',
    icon: 'import_contacts',
    children: [
      { state: 'messages', name: 'Messages' },
      { state: 'plugin', name: 'Plugin' },
      { state: 'groups', name: 'Groups' },
      { state: 'users', name: 'Users' },
      { state: 'markup', name: 'Price MarkUp' },
    ]
  },
  // {
  //   state: 'storefront',
  //   name: 'Storefront',
  //   type: 'button',
  //   icon: 'view_list',
  //   children: [
  //     {state: 'usermanagelist', name: 'USER LIST'},
  //     {state: 'usergridlist', name: 'USER GRID'}
  //   ]
  // },
  {
    state: 'home/marketting',
    name: 'Marketing',
    type: 'sub',
    icon: 'account_balance_wallet',
    children: [
      { state: 'user', name: 'User' },
      { state: 'wallet', name: 'Wallet' },
      { state: 'trade', name: 'Trade' }
    ]
  },
  {
    state: 'home/user',
    name: 'My Profile',
    type: 'sub',
    icon: 'account_balance_wallet',
    children: [
      { state: 'users', name: 'Users' },
      {  name: 'LogOut' }
    ]
  }
];

  navClick(label) {
    switch (label) {
      case "LogOut":
        this.http.delete(AppconstantsService.SessionAPIs.loginAPI +"/logout").then((d) => {
          this.helper.Logout();

        })
        break;
    }
  }

 onClick(){
   var first = location.pathname.split('/')[1];
     if(first == 'horizontal'){
        this.router.navigate(['/horizontal/dashboard/crm']);
     }else {
        this.router.navigate(['/dashboard/crm']);
     }
 }

}

