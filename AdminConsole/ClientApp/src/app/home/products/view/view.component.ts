import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'rxjs';
import { TableConfig } from 'src/app/models/table.model';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HttputilityService } from '../../../services/httputility.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  filterIndex:number = 0;
  editMode: boolean = false;
  productData = {};

  constructor(private http: HttputilityService, private route: Router) {
    this.onTabSelected(0);
  }
  
  ItemsTableConfig: TableConfig =  {
    EnableSearch:true,
    tableHeader:'Products',
    enablePagination:true,
    columns:[] = [
      {
        name:'Checkbox',
        type:'checkbox',
        id:'checkbox'
      },
      {
        name:'Image',
        type:'image',
        id:'DefaultImage'
      },
      {
        name:'Serial No',
        type:'string',
        id:'SerialNo',
        sortable:true
      },
      {
        name:'Stock Availability',
        type:'string',
        id:'AvailableCount',
        sortable:true
      },
      {
        name:'Product Name',
        type:'string',
        id:'ProductName',
        sortable:true
      },
      {
        name:'Price',
        type:'string',
        id:'Price',
        sortable:true
      },
      {
        name:'CategoryName',
        type:'string',
        id:'CategoryName',
        sortable:true
      },
      //{
      //  name:'',
      //  type:'button',
      //  id:'Status',
      //  iconClass:'remove_red_eye',
      //  compareVal:'Active',
      //  activeClass:'icon-color-green',
      //  sortable:true,
      //  usedefaultIcon:true
      //},
      //{
      //  name:'',
      //  type:'button',
      //  id:'Featured',
      //  iconClass:'star_outline',
      //  compareVal:'Featured',
      //  activeClass:'icon-color-green',
      //  sortable:true,
      //  usedefaultIcon:true
      //},
      {
        name:'Action',
        type:'action',
        id:'Status'
      }
    ],
    data : [],
    currentPageSize:20,
    tableToolbar:true,
    totalRows:0,
    sortCol:'CreatedDate',
    sortOrder:1
  };

  onEditDone() {
    this.editMode = false;
    let gridModel = {
      start: 0,
      limit: this.ItemsTableConfig.currentPageSize,
      sortCol: 'ProductName',
      sortOrder: 1,
      searchVal: ''
    }
    this.getDatFromServer(gridModel);
  }

  getDatFromServer(gridModel: any) {
    this.ItemsTableConfig.currentPageSize = gridModel.limit;
    this.http.post(AppconstantsService.ProductAPIs.productListAPi + "/" + this.filterIndex,gridModel).then((data)=>{
      if(data){
        this.setTableData(data,gridModel);
      }
    }
    ,(error)=>{})
  }
  
  setTableData(data: any, gridModel:any) {
    this.ItemsTableConfig.data = data.rows;
    this.ItemsTableConfig.totalRows = data.totalRows;
  }

  ngOnInit(): void {
  }

  deleteProductClicked(row: any) {
    this.http.delete(AppconstantsService.ProductAPIs.productAPI + "/" + row[0].Id).then((data) => {
      if (data) {
        this.onTabSelected(0);
      }
    }, (er) => {
    });
  }

  addProductClick(e:any){
    this.route.navigate(["/home/products/detailedAdd"]);
  }
  
		
  onTabSelected(tabId:number){
    this.filterIndex = tabId;
    let gridModel = {
      start : 0,
      limit : this.ItemsTableConfig.currentPageSize,
      sortCol : 'ProductName',
      sortOrder : 1,
      searchVal: ''
     }
    this.getDatFromServer(gridModel);
  }

  onAnyAction(e:any){
    switch(e.action){
      case "click":
        var col = e.columnHeader.id;
        var currentval = e.row[col];
        e.row[col] = this.getNegateVal(currentval);
        this.http.post(AppconstantsService.ProductAPIs.editProductApi, e.row, null, true).then((data)=>{
          console.log(data);
        },(er)=>{
        });
        break;
      case "viewDetails":
        this.productData = e.row;
        this.editMode = true;
        break;
    }
  }

  getNegateVal(val: any): any {
    switch(val) {
      case "Active":
        return "Inactive";
      case "Inactive":
        return "Active";
       default:
        return "Active";
    }
  }
}

