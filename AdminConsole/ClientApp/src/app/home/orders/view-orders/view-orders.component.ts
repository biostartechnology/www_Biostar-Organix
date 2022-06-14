import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableConfig } from 'src/app/models/table.model';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})

export class ViewOrdersComponent implements OnInit {
  orderDetailsView = false;
  orderDetail = {};
  order = {};
  OrdersList = [];
  ImgPopupDisplayStyle = "none";
  selectedImage = {};
  orderStatuses = AppconstantsService.orderStatus;
  constructor(private http: HttputilityService, private helper: HelperService, public dialog: MatDialog, private route: Router) {
    let grid = {
      start: 0,
      limit: this.OrdersTableConfig.currentPageSize,
      sortCol: this.OrdersTableConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    };
    this.getDatFromServer(grid);
  }

  sanitize(url) {
    this.selectedImage = url
    if (url) {
      return this.helper.sanitize(url);
    }
    return url;
  }

  ngOnInit(): void {
  }
  openPopupZoomImg(img) {
    this.ImgPopupDisplayStyle = "block";
   
  }
  closePopupZoomImg() {
    this.ImgPopupDisplayStyle = "none";
  }
  filterIndex: number = 0;

  OrdersTableConfig: TableConfig = {
    EnableSearch: true,
    tableHeader: 'Orders',
    columns: [] = [
      {
        name: 'Order Id',
        type: 'string',
        id: 'Id'
      },
      {
        name: 'Product Name',
        type: 'string',
        id: 'ProductName'
      },
      {
        name: 'Pick Up Schedule',
        type: 'Date',
        id: 'PickUpDateTime'
      },
      {
        name: 'Customer',
        type: 'string',
        id: 'CustomerName',
        sortable: true
      },
      {
        name: 'Email',
        type: 'string',
        id: 'CustomerEmail',
        sortable: true
      },
      {
        name: 'Phone',
        type: 'string',
        id: 'CustomerPhone',
        sortable: true
      },
      {
        name: '#',
        type: 'string',
        id: 'OrderCount',
        sortable: true
      },
      {
        name: 'Total',
        type: 'string',
        id: 'TotalCost',
        sortable: true
      },
      {
        name: 'Status',
        type: 'select',
        id: 'OrderStatus',
        sortable: true,
        displayColor: true,
        readonly: true,
        displayColorId: 'statusColor',
        options: AppconstantsService.orderStatus
      },
      {
        name: 'View Product',
        type: 'button',
        id: 'ViewProduct'
      },
      {
        name: 'Cancel',
        type: 'button',
        id: 'Cancel'
      }
    ],
    data: [],
    currentPageSize: 20,
    tableToolbar: true,
    totalRows: 0,
    sortCol: 'CreateAt',
    sortOrder: 1
  };

  setTableData(data: any, TableConfig: any) {
    this.OrdersTableConfig = {
      EnableSearch: true,
      tableHeader: 'Orders',
      columns: [] = [
        {
          name: 'Order Id',
          type: 'string',
          id: 'Id'
        },
        {
          name: 'Product Name',
          type: 'string',
          id: 'ProductName'
        },
        {
          name: 'Pick Up Schedule',
          type: 'Date',
          id: 'PickUpDateTime'
        },
        {
          name: '#',
          type: 'string',
          id: 'OrderCount',
          sortable: true
        },
        {
          name: 'Total',
          type: 'string',
          id: 'TotalCost',
          sortable: true
        },
        {
          name: 'Status',
          type: 'select',
          id: 'OrderStatus',
          sortable: true,
          displayColor: true,
          readonly: true,
          displayColorId: 'statusColor',
          options: AppconstantsService.orderStatus
        },
        {
          name: 'View Product',
          type: 'button',
          id: 'ViewProduct'
        },
        {
          name: 'Cancel',
          type: 'button',
          id: 'Cancel'
        }
      ],
      data: data,
      currentPageSize: 20,
      tableToolbar: true,
      totalRows: data.totalRows,
      sortCol: 'CreateAt',
      sortOrder: 1
    };
  }

  getOrderStatus(value) {
    switch (value) {
      case 1:
        return "Order Placed";
      case 2:
        return "Pending";
      case 3:
        return "Accepted";
      case 4:
        return "Ready For PickUp";
      case 5:
        return "Order In Progress";
      case 6:
        return "Order on the way";
      case 7:
        return "Delivered";
      case 8:
        return "AssignDM"
      case 9:
        return "Cancelled";
      case 10:
        return "Item Rejected";
    }
    return "Pending";
  }

  getDateFormatted(date) {
    return this.helper.getDateTimeFormatted(date);
  }

  getDatFromServer(grid: any) {
    this.OrdersTableConfig.currentPageSize = grid.limit;
    this.http.post(AppconstantsService.OrderAPIS.GetOrderList, grid).then((data: any) => {
      if (data) {
        this.OrdersList = data.rows;
        console.log(data);
      }
    }
      , (error: any) => { })
  }

  addOrderClick(e: any) {

  }

  deleteOrderClicked(e: any) {

  }

  removeOrderDetails(categoryId: any, index: number) {
    this.OrdersTableConfig.data.splice(index + 1, 1);
    this.OrdersTableConfig.data[index].subCatExist = "add_circle";
  }

  navigateToProduct(row: any) {
    var extra = {
      queryParams: { prodid: row.ProductId }
    };
    this.route.navigate(["/home/product"], extra);
  }

  getStatusColor(status) {
    switch (status) {
      case 0: return "#879193";
        break;
      case 1: return "#bddf57";
        break;
      case 2: return "#4a6fb3";
        break;
      case 3: return "#fccb05";
        break;
      case 4: return "#000";
        break;
      case 5: return "#7f5f3c";
        break;
      case 6: return "#ff9000";
        break;
      case 7: return "#bddf57";
        break;
      case 8: return "#cd3101";
        break;
      case 9: return "#fccb05";
        break;
      case 10: return "#72cdfa";
        break;
      case 11: return "#e7a0ae";
        break;
      case 12: return "#96f";
        break;
      case 13: return "#fccb05";
        break;
    }
    return "#fccb05";
  }

  onEdit(order, item) {
    this.orderDetailsView = true;
    this.orderDetail = item;
    this.order = order;
    console.log(order,item)
  }

  back() {
    this.orderDetailsView = false;
    this.initOrderDetails();
  }

  updateOrderStatus(row,itemIndex) {
    if (row.ItemsList[itemIndex].OrderStatus == 9) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '250px',
        data: { title: "Alert", message: "Cancelling Order, will cancel all orders placed along with this order and  will initiate refund to customer" },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed ' + result);
        var mesg = result;
        if (result) {
          this.http.put(AppconstantsService.OrderAPIS.OrderAPI + "/cancel", { JobId: row.JobId, Index: itemIndex, OrderStatus: row.OrderStatus, Notes: mesg }).then((data: any) => {
            if (data.isSuccess) {
              this.helper.showSuccessTostMessage(data.message);
            }
          }
            , (error: any) => { })
        }
      });
    }
    else {
      this.http.put(AppconstantsService.OrderAPIS.OrderAPI, { JobId: row.JobId, Index: itemIndex, OrderStatus: row.ItemsList[itemIndex].OrderStatus }).then((data: any) => {
        if (data.isSuccess) {
          this.helper.showSuccessTostMessage(data.message);
        }
      }
        , (error: any) => { })
    }
  }


  initOrderDetails() {
    this.orderDetail = {
      CategoryId: "",
      CustomerEmail: "",
      CustomerId: "",
      CustomerName: "",
      CustomerPhone: "",
      Id: "",
      OrderCount: 0,
      OrderedDate: "",
      OrderedStatus: null,
      PickUpDateTime: "",
      Price: 10,
      ProductId: "",
      ProductName: "",
      ProductSerialNo: "",
      ProductTitle: "",
      TotalCost: 0
    };
  }

  GetProductDetails(id) {
    console.log(id);
  }


  refreshTableData() {
    let TableConfig = {
      start: 0,
      limit: this.OrdersTableConfig.currentPageSize,
      sortCol: this.OrdersTableConfig.sortCol,
      sortOrder: 1,
      searchVal: ''
    }
    this.getDatFromServer(TableConfig);
  }

  orderDetailDummy = [
    {
      id: "A3868829",
      date: "03/21/2022",
      totalCost: "Total: $24.00",
      detailLink: "https://www.b2sign.com/printjob.html?pid=5951573",
      printInvoice: "https://www.b2sign.com/index.php?main_page=print_invoice&amp;order=def0e9c906dadbd7db2d49918657642d0f86cf11"
    },
    {
      jobId: "A3868829-01",
      prevImg: "https://www.b2sign.com/images/preview/5887000/5887995.jpg,q1646416970.pagespeed.ce.iW_mCDez2f.jpg",
      qty: "1",
      jobName: "Testing",
      jobDisc: "Vinyl Banner (13oz.)1' x 1')",
      status: "Completed",
      subStatus: "Job Picked Up",
      actionBtn: "Reorder",
    },
    {
      jobId: "A3868829-02",
      prevImg: "https://www.b2sign.com/images/preview/5887000/5887995.jpg,q1646416970.pagespeed.ce.iW_mCDez2f.jpg",
      qty: "2",
      jobName: "Testing1",
      status: "Completed",
      subStatus: "Job Picked Up",
      actionBtn: "Reorder",
    },
    {
      jobId: "A3868829-03",
      prevImg: "https://www.b2sign.com/images/preview/5887000/5887995.jpg,q1646416970.pagespeed.ce.iW_mCDez2f.jpg",
      qty: "3",
      jobName: "Testing3",
      status: "Completed",
      subStatus: "Job Picked Up",
      actionBtn: "Reorder",
    },
    {
      jobId: "A3868829-04",
      prevImg: "https://www.b2sign.com/images/preview/5887000/5887995.jpg,q1646416970.pagespeed.ce.iW_mCDez2f.jpg",
      qty: "4",
      jobName: "Testing4",
      status: "Completed",
      subStatus: "Job Picked Up",
      actionBtn: "Reorder",
    },
    {
      jobId: "A3868829-05",
      prevImg: "https://www.b2sign.com/images/preview/5887000/5887995.jpg,q1646416970.pagespeed.ce.iW_mCDez2f.jpg",
      qty: "5",
      jobName: "Testing5",
      status: "Completed",
      subStatus: "Job Picked Up",
      actionBtn: "Reorder",
    }
  ]
}
