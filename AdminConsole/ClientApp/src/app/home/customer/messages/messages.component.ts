import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../models/table.model';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messageDetailsView = false;
  messagesField = [];
  constructor(private http: HttputilityService, private helper: HelperService) {
    this.refreshGrid();
  }

  ngOnInit(): void {
  }

  CancelClicked(){
    this.messageDetailsView = false;
  }

  CreateClicked() {
    if (this.helper.isFormValid(this.messagesField)) {
      var json = {};
      this.helper.getDataJsonMapped(this.messagesField, json)
      this.http.post(AppconstantsService.CustomerApis.Message, json).then((d) => {
        if (d.isSucess) {
          this.messageDetailsView = false;
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
        name: 'Message Title',
        type: 'string',
        id: 'MessageTitle'
      },
      {
        name: 'Expiry',
        type: 'Date',
        id: 'Expiry'
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
    this.messageDetailsView = true;
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
      this.http.delete(AppconstantsService.CustomerApis.Message + "/" + row.Id).then((d) => {
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
    this.http.get(AppconstantsService.CustomerApis.Message).then((data: any) => {
      if (data) {
        this.setTableData(data, grid);
      }
    }, (error: any) => { })
  }


  onEdit(row) {
    this.initFields();
    this.helper.MapDataToModel(this.messagesField, row);
    this.messageDetailsView = true;
    
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
    var month = (new Date().getMonth() + 1);
    var date = new Date().getDate();
    this.messagesField = [
      {//0
        fieldId: "MessageTitle",
        label: "Message Title",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide message title",
        required: true,
      },
      {//1
        fieldId: "Message",
        label: "Message",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide message",
        required: true,
      },
      {//2
        fieldId: "Expiry",
        label: "Message Expiry",
        fieldValue: "",
        type: "date",
        isValid: true,
        errorMesg: "Please provide message expiry",
        required: true,
        min: new Date().getFullYear() + '-' + this.pad(month, 2) + '-' + this.pad(date, 2)
      },
    ];
  }


}
