import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { NgbdSortableHeader, SortEvent } from './sortable.directive';

@Component({
  selector: 'app-table',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Output("reloadData") onDataReload: EventEmitter<any> = new EventEmitter();
  @Output("addClick") onAdd: EventEmitter<any> = new EventEmitter();
  @Output("deleteClick") onDelete: EventEmitter<any> = new EventEmitter();
  @Output("editClick") onEdit: EventEmitter<any> = new EventEmitter();
  @Output("anyButtonClick") anyButtonClick: EventEmitter<any> = new EventEmitter();

  _searchTerm: string = "";
  noSearchResult: boolean = false;
  currentPage: number = 1;
  sortColumn: string = ""
  sortDirection: number = 1;
  selectedRowId: string;
  @Input() selectedRow: any = {};

  get searchTerm() { return this._searchTerm; }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this.onPageChange(0);
    //this.showFilteredResult();
  }

  getDateFormatted(date) {
    date = new Date(date);
    return this.datePipe.transform(date, 'MMMM d, y');
  }

  onSort(header) {
    for (let columnHeader of this.config.columns) {
      if (columnHeader.id != header.id) {
        columnHeader.sortDirection = '';
      }
      else {
        if (columnHeader.sortDirection == 'asc') {
          columnHeader.sortDirection = 'desc';
        }
        else {
          columnHeader.sortDirection = 'asc';
        }
      }
    }
    this.sort(header.id, header.sortDirection);
  }

  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  sort(column: string, direction: string) {
    if (!this.config.serverSidePagination) {
      if (direction === '') {
      }
      else {
        this.config.data.sort((a, b) => {
          const res = this.compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }
    else {
      this.sortColumn = column;
      this.sortDirection = direction === 'asc' ? 1 : -1;
      this.onPageChange(this.currentPage);
    }
  }

  showFilteredResult() {
    if (this._searchTerm) {
      this.noSearchResult = true;
      let tosearch = this._searchTerm.toLowerCase();
      for (let row of this.config.data) {
        let matched = false;
        for (let columnHeader of this.config.columns) {
          if (row[columnHeader.id] && (row[columnHeader.id] + "").toLowerCase().indexOf(tosearch) != -1) {
            row.onSearchClass = "";
            matched = true;
            this.noSearchResult = false;
            false;
          }
        }
        if (!matched) {
          row.onSearchClass = "d-none";
        }
      }
    }
    else {
      this.noSearchResult = false;
      for (let row of this.config.data) {
        row.onSearchClass = "";
      }
    }
    this.selectRow(0, this.config.data[0]);
  }

  selectRow(i, row) {
    this.selectedRowId = i;
    this.selectedRow = row;
  }

  constructor(private datePipe: DatePipe) {
  }

  _config: any = {
    tableHeader: '',
    columns: [] = [],
    data: {},
    showToolBar: true,
    currentPageSize: 20,
    currentPage: 0,
    serverSidePagination: true
  };


  @Input() set config(data) {
    if (data) {
      console.log(data);
      this._config = data;
      if (this._config.data && this._config.data.rows && this._config.data.rows.length > 0) {
        this.selectRow(0, this._config.data.rows[0]);
      }
    }
  }

  get config() {
    return this._config;
  }

  ngOnInit(): void {
  }

  onPageChange(e) {
    this.currentPage = e;
    let gridModel = {
      start: this.currentPage - 1,
      limit: this.config.currentPageSize,
      sortCol: this.sortColumn,
      sortOrder: this.sortDirection,
      searchVal: this._searchTerm
    }
    this.onDataReload.emit(gridModel);
  }


  buttonClick(name,row) {
    this.anyButtonClick.emit({ action: name, row :row});
  }

  addClick() {
    this.onAdd.emit();
  }
  deleteClick() {
    this.onDelete.emit();
  }
  editClick() {
    this.onEdit.emit(this.selectedRow);
  }
}
