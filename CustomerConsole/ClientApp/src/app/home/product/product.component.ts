import { Component, EventEmitter, OnInit, Output,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppconstantsService } from '../../services/appconstants.service';
import { HttputilityService } from '../../services/httputility.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  cartView = false;
  isSubcatView = false;
  loadingData = false;

  CartClicked(arg) {
    arg.cartView = true;
  }


  loadProducts(cat, arg) {
    arg.onCategoryChange(cat);
  }

  constructor(private http: HttputilityService, private route: ActivatedRoute, private router: Router, private helper: HelperService) {
    this.route.queryParams.subscribe(params => {
      var productId = params['prodid'];
      var search = params['search'];
      if (productId) {
        this.getProducts(null, productId);
      }
      else if(search){
        this.productSearchVal = search;
        this.onProductSearch();
      }
      else if (HelperService.categorySelected) {
        this.onCategoryChange(HelperService.categorySelected);
      }
      else{
        this.router.navigate(['/home/dashboard']);
        return;
      }
      this.helper.setProductLoadCallBack(this.loadProducts, this);
    });
  }

  selectedProduct: any = {};
  productDetailedView = false;
  @Output("categoryClicked") onCategoryClick: EventEmitter<any> = new EventEmitter();
  productSearchVal = "";
  selectedCategory = null;
  productsList = {};
  categoryList = {};

  onCategoryChange(data) {
    console.log(data);
    this.isSubcatView = data.children && data.children.length > 0;
    this.selectedProduct = {};
    this.productDetailedView = false;
    this.selectedCategory = data;
    var childernIds = [data.id];
    if(data.children.length > 0){
      for (var i = 0; i < data.children.length; i++){
        for (var j = 0; j < data.children[i].children.length; j++ ) {
          childernIds.push(data.children[i].children[j].id);
        }
        childernIds.push(data.children[i].id);
      }
    }
    this.getProducts(childernIds, null);
    this.cartView = false;
  }

  gridModel = {
    start: 0
    , limit: 50
    , sortCol: "time"
    , sortOrder: "desc"
    , searchVal: ""
    , category: null,
    productId: null
  }

  ngOnInit() {
    console.log(this.route);
  }

  selectedTab: string = "specs";
  navigateToSection(section: string) {
    this.selectedTab = section;
  }

  showDetails(product) {
    this.isSubcatView = false;
    this.selectedProduct = {
      product: product,
      selectedCategory: this.selectedCategory
    };
    this.productDetailedView = true;
  }

  backClicked() {
    this.selectedProduct = {};
    this.isSubcatView = HelperService.categorySelected.children && HelperService.categorySelected.children.length > 0;
    this.productDetailedView = false;
  }

  onProductSearch() {
    this.gridModel.category = null;
    this.gridModel.searchVal = this.productSearchVal;
    this.getProducts(null, null);
  }

  getProducts(catId, prodId) {
    this.loadingData = true;
    this.gridModel.category = catId;
    this.gridModel.productId = prodId;
    this.http.post(AppconstantsService.homeAPIs.products, this.gridModel).then((data) => {
      if (data) {
        this.productsList = {
          categoryTitle: this.selectedCategory ? this.selectedCategory["name"] : "",
          cssClass: '',
          data: [] = data.rows
        };
        this.loadingData = false;
      }
    }
      , (error) => { this.loadingData = false; })
  }

}
