import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  category: any;
  _productList:any;
  @Input() set ProductList(data) {
    this._productList = this.createProductView(data, HelperService.categorySelected);
    this.category = HelperService.categorySelected;
    
  }

  createProductView(data, categorySelected) {
    if(data && data.length > 0 && categorySelected.children && categorySelected.children.length > 0){
      for (var i = 0; i < categorySelected.children.length; i++) {
        if (categorySelected.children[i].children.length > 0) {
          var newEntry:any = null;
          for (var j = 0; j < categorySelected.children[i].children.length; j++) {
            for (var k = 0; k < data.length; k++) {
              if (categorySelected.children[i].children[j].id == data[k].CategoryId) {
                if (newEntry) {
                  newEntry.sizes.push(data[k]);
                }
                else {
                  newEntry = { CategoryId: categorySelected.children[i].id, shorttdiscription: data[k].shorttdiscription, ImagesUrls: data[k].ImagesUrls, sizes: [data[k]] };
                }
              }
            }
          }
          if (newEntry) {
            data.push(newEntry);
          }
        }
      }
      console.log(data);
      console.log(categorySelected);
    }
    return data;
  }

  @Output("onclick") onProductClick: EventEmitter<any> = new EventEmitter();
  constructor(private helper: HelperService, private router: Router) {
  }

  onclick(data) {
    this.onProductClick.emit(data);
    console.log(data);
  }

  sanitze(url) {
    return this.helper.sanitize(url);
  }

  ngOnInit(): void {
  }

}
