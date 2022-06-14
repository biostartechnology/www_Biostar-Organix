import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppconstantsService } from '../../services/appconstants.service';
import { HelperService } from '../../services/helper.service';
import { HttputilityService } from '../../services/httputility.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryList = [];
  _category = "";
  displayList = [];

  @Input() set categoryId(d) {
    this._category = d;
    if (d) {
      this.categoryList = HelperService.CategoryList;
      this.displaySubCategories();
    }
  };

  get categoryId() {
    return this._category;
  }

  constructor(private http: HttputilityService, private helper: HelperService, private router: Router) {
  }

  ngOnInit(): void {
  }

  sanitize(url) {
    return this.helper.sanitize(url);
  }

  onCategoryChange(data) {
    this.helper.setCategorySelected(data);
    if (!HelperService.ProductNavigation || window.location.href.indexOf('/product') == -1) {
      this.router.navigate(['/home/product']);
    }
    else {
      HelperService.ProductNavigation(data, HelperService.ProductNavigationArg);
    }
  }

  displaySubCategories() {
    this.displayList = [];
    for (var i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].ParentId == this.categoryId ) {
        this.displayList.push({
          name: this.categoryList[i].CategoryName,
          parentId: this.categoryList[i].ParentId,
          id: this.categoryList[i].Id,
          image: this.categoryList[i].Images ? this.categoryList[i].Images[0].Path : ""
        });
      }
    }
    console.log(this.displayList);
  }
}
