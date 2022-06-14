import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppconstantsService } from '../../services/appconstants.service';
import { HttputilityService } from '../../services/httputility.service';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output("onchange") onCategoryClick: EventEmitter<any> = new EventEmitter();
  public loggedIn = false;
  public samplePagesCollapsed = true;
  public sidebarOpened = false;
  public SidebarIcon = false;
  selectedTab: string = "";
  public innerWidth: any;
  accountHolderName = '';

  navigateToSection(section) {
    this.toggleOffSidebar();
    this.selectedTab = section.id;
    this.onCategoryClick.emit(section);

    // if(section.children.length > 0){
    //   this.toggleChildren(section);
    // }
    // else{

    // }
    // if (this.SidebarIcon && parentNode) {
    //   this.toggleChildren(parentNode);
    // }

  }

  toggleOffSidebar() {
      this.sidebarOpened = !this.sidebarOpened;
      if (this.sidebarOpened) {
        document.querySelector('body').classList.add('sidebar-open');
      }
      else {
        document.querySelector('body').classList.remove('sidebar-open');
      }
  }

  toggleChildren(subTab) {
    subTab.childrenShown = !subTab.childrenShown;
  }

  setCategoryView(data) {
    let tree: any[] = [];
    let parentNodes = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].ParentId) {
        tree.push({
          name: data[i].CategoryName,
          children: [],
          parentId: data[i].ParentId,
          id: data[i].Id,
        });
      }
      else {
        tree.push({
          name: data[i].CategoryName,
          children: [],
          parentId: "",
          id: data[i].Id,
          childrenShown: true
        });
        parentNodes.push({
          name: data[i].CategoryName,
          children: [],
          parentId: "",
          id: data[i].Id,
          childrenShown: true
        });
      }
    }
    this.ProductDetailsTab = this.unflatten(tree, parentNodes)
    this.selectedTab = this.ProductDetailsTab[0].id;
  }

  getCategoryDetails() {
    if (HelperService.CategoryList.length == 0) {
      this.http.get(AppconstantsService.homeAPIs.category).then((data) => {
        if (data) {
          this.setCategoryView(data);
        }
      },
      (error) => {});
    }
    else {
      this.setCategoryView(HelperService.CategoryList);
    }
  }


  unflatten(arr: any[], cat: any[]) {
    var tree: any[] = [];
    var mappedArr: any = {};
    var arrElem;
    var mappedElem;
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parentId) {
          if (!mappedArr[mappedElem.parentId]) {
            mappedArr[mappedElem.parentId] = {};
            mappedArr[mappedElem.parentId]['children'] = [];
          }
          mappedArr[mappedElem.parentId]['children'].push(mappedElem);
        }
      }
    }
    cat.forEach(element => {
      tree.push(mappedArr[element.id])
    });
    return tree;
  }

  ProductDetailsTab = [

  ];

  constructor(private http: HttputilityService, private auth: AuthService, private helper: HelperService, private router: Router,) {
    this.getCategoryDetails();
    this.auth.validateSession().then((data) => {
      this.loggedIn = true;
      var data = this.helper.getDataFromStorageDetails("sessiondetails");
      if (data) {
        data = JSON.parse(data);
        if (data.FirstName) {
          this.accountHolderName = data.FirstName;
        }
      }
    }, (e) => { });
  }

  logout() {
    this.auth.logoutUser().then(a => {
      this.helper.Logout();
      this.loggedIn = false;
    });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 990) {
      this.SidebarIcon = true;
      document.querySelector('.sidebar').classList.add('sidebar-icon-only');
    }
    else {
      this.SidebarIcon = false;
      document.querySelector('.sidebar').classList.remove('sidebar-icon-only');
    }
  }


}
