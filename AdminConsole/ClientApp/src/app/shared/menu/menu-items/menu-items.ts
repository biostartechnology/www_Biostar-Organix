import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'home/orders',
    name: 'Orders',
    type: 'sub',
    icon: 'explore',
    children: [
      { state: 'view', name: 'View' },
      { state: 'add', name: 'Add' },
      { state: 'export', name: 'Export' },
      { state: 'draftOrders', name: 'Draft Orders' },
      { state: 'shipments', name: 'Shipments' },
      { state: 'trackingNumbers', name: 'Tracking Numbers' },
      { state: 'giftCertificates', name: 'Gift Certificates' },
      { state: 'orderStatuses', name: 'Order Statuses' },
    ]
  },
  {
    state: 'home/products',
    name: 'Products',
    type: 'sub',
    icon: 'explore',
    children: [
      { state: 'view', name: 'View' },
      { state: 'quickAdd', name: 'Quick Add' },
      { state: 'detailedAdd', name: 'Product Detailed Add' },
      { state: 'import', name: 'Import' },
      { state: 'export', name: 'Export' },
      { state: 'productCategories', name: 'Product Categories' },
      { state: 'productReviews', name: 'Product Reviews' },
      { state: 'brands', name: 'Brands' },
    ]
  },
  {
    state: 'home/customers',
    name: 'Customers',
    type: 'sub',
    icon: 'import_contacts',
    children: [
      { state: 'media', name: 'GALLERY' },
    ]
  },
  {
    state: 'storefront',
    name: 'Storefront',
    type: 'button',
    icon: 'view_list',
    // children: [
    //   {state: 'usermanagelist', name: 'USER LIST'},
    //   {state: 'usergridlist', name: 'USER GRID'}
    // ]
  },
  {
    state: 'home/marketting',
    name: 'Marketing',
    type: 'sub',
    icon: 'account_balance_wallet',
    children: [
      { state: 'user', name: 'User' },
      { state: 'wallet', name: 'WALLET' },
      { state: 'trade', name: 'TRADE' }
    ]
  },
  {
    state: 'home/user',
    name: 'My Profile',
    type: 'sub',
    icon: 'account_balance_wallet',
    children: [
      { state: 'users', name: 'Users' },
      { state: 'logout', name: 'LogOut' }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})

export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
