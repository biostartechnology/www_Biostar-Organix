import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../models/table.model';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  
  groupData = [];
  userDetailsView = false;
  usersField = [];
  editId = '';
  groupNameField = {
    fieldId: "GroupName",
    label: "Group Name",
    fieldValue: "",
    type: "text",
    isValid: true,
    errorMesg: "Please provide user name",
    required: true,
    options:[
      
    ]
  }
  constructor(private http: HttputilityService, private helper: HelperService) {
    this.getGroups();
  }

  ngOnInit(): void {

  }

  CancelClicked(){
    this.userDetailsView = false;
  }

  CreateClicked() {
    if (this.helper.isFormValid(this.usersField)) {
      var json = {};
      this.helper.getDataJsonMapped(this.usersField, json);
      this.http.put(AppconstantsService.CustomerApis.User, {id:this.editId,groupId:this.groupNameField.fieldValue}).then((d) => {
        if (d.isSucess) {
          this.userDetailsView = false;
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
        name: 'User Name',
        type: 'string',
        id: 'FirstName'
      },
      {
        name: 'Email',
        type: 'string',
        id: 'EmailId'
      },
      {
        name: 'Group Name',
        type: 'string',
        id: 'GroupName'
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
    this.userDetailsView = true;
    this.initFields();
  }

  getGroups(){
    this.http.get(AppconstantsService.CustomerApis.Group).then((data: any) => {
      if (data) {
        this.groupData = data.rows;
        for(var j=0;j<this.groupData.length;j++){
          this.groupNameField.options.push({value:this.groupData[j].Id,label:this.groupData[j].GroupName});
        }
        console.log(this.groupNameField);
        this.refreshGrid();
      }
    }, (error: any) => { });
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
      this.http.delete(AppconstantsService.CustomerApis.User + "/" + row.Id).then((d) => {
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
    this.http.post(AppconstantsService.CustomerApis.User,grid).then((data: any) => {
      if (data) {
        for(var i=0;i<data.rows.length;i++){
          data.rows[i].GroupName = 'Public';
          for(var j=0;j<this.groupData.length;j++){
            if(data.rows[i].GroupId == this.groupData[j].Id){
              data.rows[i].GroupName = this.groupData[j].GroupName;
              break;
            }
          }
        }
        this.setTableData(data, grid);
      }
    }, (error: any) => { });
  }

  onEdit(row) {
    this.initFields();
    this.helper.MapDataToModel(this.usersField, row);
    this.groupNameField.fieldValue = row.GroupId;
    this.userDetailsView = true;
    this.editId = row._id;
  }

  onAnyAction(e: any) {
    console.log(e);
    switch (e.action) {
      case "viewDetails":
        this.onEdit(e.row);
        break;
    }
  }

  pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  initFields() {
    this.editId = '';
    this.usersField = [
      {//0
        fieldId: "FirstName",
        label: "First Name",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide user name",
        required: false,
        readOnly:true,
      },
      {//0
        fieldId: "EmailId",
        label: "Email Id",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide user name",
        required: false,
        readOnly:true,
      },
     
    ];
  }
}
