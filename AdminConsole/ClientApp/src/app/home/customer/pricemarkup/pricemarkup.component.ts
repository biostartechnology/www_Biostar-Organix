import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableConfig } from '../../../models/table.model';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';
import { ConfirmationComponent } from '../../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-pricemarkup',
  templateUrl: './pricemarkup.component.html',
  styleUrls: ['./pricemarkup.component.scss']
})
export class PricemarkupComponent implements OnInit {

  priceMarkUpDetailsView = false;
  priceMarkUpsField = [];
  isEdit = false;
  constructor(private http: HttputilityService, private helper: HelperService, public dialog: MatDialog) {
    this.refreshGrid();
  }

  ngOnInit(): void {
  }

  CancelClicked() {
    this.priceMarkUpDetailsView = false;
  }

  CreateClicked() {
    if (this.helper.isFormValid(this.priceMarkUpsField)) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '250px',
        data: { title: "Alert", message: "Adding Price markup will increase price for all products by " + this.priceMarkUpsField[1].fieldValue+"%. Do you wish to proceed ? If Yes type Yes in following input " },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed ' + result);
        if (result == 'Yes') {
          var json = {};
          this.helper.getDataJsonMapped(this.priceMarkUpsField, json)
          this.http.put(AppconstantsService.CustomerApis.MarkUp, json).then((d) => {
            if (d.isSucess) {
              this.priceMarkUpDetailsView = false;
              this.helper.showSuccessTostMessage("Saved Price Mark Up");
              this.refreshGrid();
            }
            else {
              this.helper.showErrorTostMessage("Failed to save Price Mark Up");
            }
          });
        }
        else{
         this.priceMarkUpDetailsView = false;
        }
      });
    }
  }

  PriceMarkUpTableConfig: TableConfig = {
    EnableSearch: true,
    tableHeader: 'Price Mark Up',
    columns: [] = [
      {
        name: 'Description',
        type: 'string',
        id: 'Description'
      },
      {
        name: 'Mark Up Percent(%)',
        type: 'string',
        id: 'MarkUpPercent'
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

  addPriceMarkUpClick() {
    this.priceMarkUpDetailsView = true;
    this.initFields();
  }

  refreshGrid() {
    let grid = {
      start: 0,
      limit: this.PriceMarkUpTableConfig.currentPageSize,
      sortCol: this.PriceMarkUpTableConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(grid);
  }

  deletePriceMarkUpClicked(row) {
    console.log(row);
    if (row && row.Id) {
      this.http.delete(AppconstantsService.CustomerApis.MarkUp + "/" + row.Id).then((d) => {
        if (d && d.isSucess) {
          this.helper.showSuccessTostMessage("Deleted PriceMarkUp successfully");
          this.refreshGrid();
        }
      });
    }
  }

  setTableData(data: any, TableConfig: any) {
    console.log(data);
    this.PriceMarkUpTableConfig.data = data.rows;
    this.PriceMarkUpTableConfig.totalRows = data.totalRows;
  }

  getDatFromServer(grid: any) {
    this.PriceMarkUpTableConfig.currentPageSize = grid.limit;
    this.http.get(AppconstantsService.CustomerApis.MarkUp).then((data: any) => {
      if (data) {
        this.setTableData(data, grid);
      }
    }, (error: any) => { })
  }


  onEdit(row) {
    this.initFields();
    this.helper.MapDataToModel(this.priceMarkUpsField, row);
    this.priceMarkUpDetailsView = true;
    this.isEdit = true;
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
    this.isEdit = false;
    this.priceMarkUpsField = [
      {//0
        fieldId: "Description",
        label: "Description",
        fieldValue: "",
        type: "text",
        isValid: true,
        errorMesg: "Please provide description",
        required: true,
      },
      {//1
        fieldId: "MarkUpPercent",
        label: "MarkUp Percent",
        fieldValue: "",
        type: "number",
        isValid: true,
        errorMesg: "Please provide markup value in percentage",
        required: true,
      },
    ];
  }

}
