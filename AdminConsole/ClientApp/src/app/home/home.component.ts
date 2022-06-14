import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';
import { MenuItems } from '../shared/menu/menu-items/menu-items';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sidenavOpen: boolean = true;
  toggleSidebar() {
    this.sidenavOpen = !this.sidenavOpen;
  }
  
  header: string = "Admin";
  menuList: any[] = [];
  branchInfo: any;
  constructor(
    public menuItems: MenuItems,
    private router: Router,
    private authService: AuthService,
    private routes: Router, private helper: HelperService) {
    var data = this.helper.getDataFromStorageDetails("BranchInfo");
    if (data) {
      data = JSON.parse(data);
      this.branchInfo = data.BranchInfo[0];
    }
    this.menuList = menuItems.getAll();
  }

  ngOnInit() {
    this.header = this.menuList[1].name;
  }

}
