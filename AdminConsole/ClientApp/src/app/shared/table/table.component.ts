import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridModel } from 'src/app/models/grid.model';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  
  @Output("reloadData") onDataReload: EventEmitter<any> = new EventEmitter();
  @Output("addClick") onAdd: EventEmitter<any> = new EventEmitter();
  @Output("deleteClick") onDelete: EventEmitter<any> = new EventEmitter();
  @Output("onAnyAction") onAnyAction: EventEmitter<any> = new EventEmitter();

  @Input() height: string;
  constructor(private sanitizer: DomSanitizer, private datePipe: DatePipe) { }
  sortColumn:string = ""
  sortOrder:number = 1;
  selectedRowId: number = -1;
  searchVal:string = "";
  page:number=0;
  @Input() selectedRow: any = {};
  showType:string = 'list';
  actionRow:any;
  actionHeader:any;
  allCheck:boolean = false;
  checkedRows: any = {};

  getDateFormatted(date) {
    if(date){
      date = new Date(date);
      return this.datePipe.transform(date, 'MMMM d, y HH:mm');
    }
    return "";
  }

  @Input() config: GridModel = {
    tableHeader: '',
    columns: [] = [],
    data: [] = [],
    currentPageSize:50,
    tableToolbar:true,
    totalRows:0,
    sortCol:'',
    sortOrder:1,
    EnableSearch: true,
    enablePagination: true
  };

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onSort(header:any) {
    if(header.sortable){
      for (let columnHeader of this.config.columns) {
        if (columnHeader.id != header.id) {
          columnHeader.sortOrder = 0;
        }
        else {
          if (columnHeader.sortOrder == 1) {
            columnHeader.sortOrder = -1;
          }
          else {
            columnHeader.sortOrder = 1;
          }
          this.sortColumn = columnHeader.id;
          this.sortOrder = columnHeader.sortOrder;
        }
      }
      this.tableRefresh();
    }
  }

  compare(v1:any, v2:any) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

	onEditProduct(data:any){
  }
  
  deleteProduct(i:any){
  }
	   
  selectRow(i:any, row:any) {
    this.selectedRowId = i;
    this.selectedRow = row;
    this.onAnyAction.emit({ row: row, action: 'rowSelected', index: i });
  }
 
  printLog(d:any){
    console.log(d)
  }
  
  ngOnInit(): void {
  }

  addNewRow(e:any){
    this.onAdd.emit(e);
  }

  onDeleteClick(){
    var selectRows = [];
    for(var key in this.checkedRows){
      if(this.checkedRows[key]){
        selectRows.push(this.checkedRows[key])
      }
    }
    if(selectRows.length > 0){
      this.onDelete.emit(selectRows);
    }
  }
  
  productShowType(type:string){
    this.showType = type;
  }

  onPageChange(pageData:any){
     this.page = pageData.pageIndex;
     this.config.currentPageSize = pageData.pageSize; 
     this.tableRefresh();
  }

  checkAll(colHeader:any){
    console.log(this.allCheck);
    this.config.data.forEach(e=>{
      if(this.allCheck){
          e[colHeader.id] = true;
      }
      else{
        e[colHeader.id] = false;
      }
    })
  }

  checkedRow(row:any,i:number,columnHeader:any){
    if(row[columnHeader.id]){
      this.checkedRows[i] = row;
    }
    else{
      this.checkedRows[i] = null;
    }
  }

  setActionRow(row:any, columnHeader:any,i:number){
    this.actionRow = row;
    this.actionHeader = columnHeader;
    this.selectedRowId = i;
  }

  actionBtnClick(action:string){
    this.onAnyAction.emit({row:this.actionRow,columnHeader:this.actionHeader,action:action,index:this.selectedRowId});
  }

 
  colButtonClick(row: any, columnHeader: any, index: number, status: string){
    this.onAnyAction.emit({ row: row, columnHeader: columnHeader, action: status, index: index });
  }

  tableRefresh(){
    let gridModel = {
      start : this.page,
      limit : this.config.currentPageSize,
      sortCol : this.sortColumn,
      sortOrder : this.sortOrder,
      searchVal: this.searchVal
     }
     this.onDataReload.emit(gridModel);
  }

  showMyself(i:number,show:boolean){
    return show;
  }

}
