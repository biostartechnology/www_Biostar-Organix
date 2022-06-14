import { Component, OnInit } from '@angular/core';
import { TableConfig } from 'src/app/models/table.model';
import { AppconstantsService } from 'src/app/services/appconstants.service';
import { HelperService } from 'src/app/services/helper.service';
import { HttputilityService } from 'src/app/services/httputility.service';

@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.scss']
})
export class PluginComponent implements OnInit {

  pluginDetailsView = false;
  pluginField = [];
  constructor(private http: HttputilityService, private helper: HelperService) {
    this.refreshGrid();
  }

  ngOnInit(): void {
  }

  CancelClicked(){
    this.pluginDetailsView = false;
  }

  CreateClicked() {
    if (this.helper.isFormValid(this.pluginField)) {
      var json = {};
      this.helper.getDataJsonMapped(this.pluginField, json)
      this.http.post(AppconstantsService.CustomerApis.Plugin, json).then((d) => {
        if (d.isSucess) {
          this.pluginDetailsView = false;
          this.helper.showSuccessTostMessage("Saved Plugin");
          this.refreshGrid();
        }
        else {
          this.helper.showSuccessTostMessage("Failed to save Plugin");
        }
      });
    }
  }

  PluginTableConfig: TableConfig = {
    EnableSearch: true,
    tableHeader: 'Plugins',
    columns: [] = [
      {
        name: 'Plugin Title',
        type: 'string',
        id: 'Description'
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

  addPluginClick() {
    this.pluginDetailsView = true;
    this.initFields();
  }

  refreshGrid(){
    let grid = {
      start: 0,
      limit: this.PluginTableConfig.currentPageSize,
      sortCol: this.PluginTableConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(grid);
  }

  deletePluginClicked(row) {
    console.log(row);
    if (row && row.Id) {
      this.http.delete(AppconstantsService.CustomerApis.Plugin + "/" + row.Id).then((d) => {
        if (d && d.isSucess) {
          this.helper.showSuccessTostMessage("Deleted Plugin successfully");
          this.refreshGrid();
        }
      });
    }
  }

  setTableData(data: any, TableConfig: any) {
    console.log(data);
    this.PluginTableConfig.data = data.rows;
    this.PluginTableConfig.totalRows = data.totalRows;
  }

  getDatFromServer(grid: any) {
    this.PluginTableConfig.currentPageSize = grid.limit;
    this.http.get(AppconstantsService.CustomerApis.Plugin).then((data: any) => {
      if (data) {
        this.setTableData(data, grid);
      }
    }, (error: any) => { })
  }


  onEdit(row) {
    this.initFields();
    this.helper.MapDataToModel(this.pluginField, row);
    this.pluginDetailsView = true;
    
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
    this.pluginField = [
      {//0
        fieldId: "Description",
        label: "Plugin Title",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide plugin title",
        required: true,
      },
      {//1
        fieldId: "Script",
        label: "Script",
        fieldValue: "",
        type: "textarea",
        row:5,
        col:5,
        isValid: true,
        errorMesg: "Please provide script",
        required: true,
      },
      
    ];
  }



}
