import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../models/table.model';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit {

  groupDetailsView = false;
  groupsField = [];
  editId = '';
  selectedCatId = [];
  selectedCatName = '';
  constructor(private http: HttputilityService, private helper: HelperService) {
    this.refreshGrid();
  }

  ngOnInit(): void {
  }

  CancelClicked(){
    this.groupDetailsView = false;
  }

  CreateClicked() {
    if (this.helper.isFormValid(this.groupsField)) {
      var json = {};
      this.helper.getDataJsonMapped(this.groupsField, json);
      json["selectedCategory"] = this.selectedCatId;
      json["Id"] = this.editId;
      this.http.post(AppconstantsService.CustomerApis.Group, json).then((d) => {
        if (d.isSucess) {
          this.groupDetailsView = false;
          this.helper.showSuccessTostMessage("Saved Message");
          this.refreshGrid();
        }
        else {
          this.helper.showSuccessTostMessage("Failed to save Message");
        }
      });
    }
  }

  MessageTableConfig: TableConfig = {
    EnableSearch: true,
    tableHeader: 'Messages',
    columns: [] = [
      {
        name: 'Group Name',
        type: 'string',
        id: 'GroupName'
      },
      {
        name: 'Last Modified',
        type: 'Date',
        id: 'CreateOn'
      },
      {
        name: 'Action',
        type: 'action',
        id: 'Status'
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: true,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };

  addMessageClick() {
    this.groupDetailsView = true;
    this.initFields();
  }

  refreshGrid(){
    let grid = {
      start: 0,
      limit: this.MessageTableConfig.currentPageSize,
      sortCol: this.MessageTableConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(grid);
  }

  deleteMessageClicked(row) {
    console.log(row);
    if (row && row.Id) {
      this.http.delete(AppconstantsService.CustomerApis.Group + "/" + row.Id).then((d) => {
        if (d && d.isSucess) {
          this.helper.showSuccessTostMessage("Deleted Message successfully");
          this.refreshGrid();
        }
      });
    }
  }

  setTableData(data: any, TableConfig: any) {
    console.log(data);
    this.MessageTableConfig.data = data.rows;
    this.MessageTableConfig.totalRows = data.totalRows;
  }

  getDatFromServer(grid: any) {
    this.MessageTableConfig.currentPageSize = grid.limit;
    this.http.get(AppconstantsService.CustomerApis.Group).then((data: any) => {
      if (data) {
        this.setTableData(data, grid);
      }
    }, (error: any) => { })
  }

  onEdit(row) {
    this.initFields();
    this.helper.MapDataToModel(this.groupsField, row);
    this.selectedCatId = row.selectedCategory;
    if(this.selectedCatId == null){
      this.selectedCatId = [];
    }
    this.groupDetailsView = true;
    this.editId = row.Id;
  }

  onAnyAction(e: any) {
    console.log(e);
    switch (e.action) {
      case "viewDetails":
        this.onEdit(e.row);
        break;
    }
  }
  
  initFields() {
    this.editId = '';
    this.groupsField = [
      {//0
        fieldId: "GroupName",
        label: "Group Name",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide group name",
        required: true,
      }
    ];
  }

}
