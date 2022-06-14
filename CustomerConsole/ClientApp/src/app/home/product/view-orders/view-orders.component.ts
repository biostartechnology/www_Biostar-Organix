import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableConfig } from 'src/app/models/table.model';
import { AppconstantsService } from '../../../services/appconstants.service';
import { HelperService } from '../../../services/helper.service';
import { HttputilityService } from '../../../services/httputility.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})

export class ViewOrdersComponent implements OnInit {
  orderDetailsView = false;
  orderDetail = {};
  OrdersList = [];
  ShippingCost = 0;
  constructor(private http: HttputilityService, private helper: HelperService, private route: Router) {
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
    return this.helper.sanitize(url);
  }

  ngOnInit(): void {
  }

  filterIndex: number = 0;


  OrdersTableConfig = {
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
    data: [],
    currentPageSize: 200,
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
    this.http.post(AppconstantsService.homeAPIs.orders, grid).then((data: any) => {
      if (data) {
        //  var json = {};
        //  for(var i=0;i<data.rows.length;i++){
        //    if(json[data.rows[i].JobId]){
        //     json[data.rows[i].JobId].push(data.rows[i])
        //    }
        //    else{
        //     json[data.rows[i].JobId] = [data.rows[i]];
        //    }
        //  }
        this.OrdersList = data.rows;
        console.log(data);
        //  this.setTableData(data, grid);
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

  onAnyAction(e: any) {
    console.log(e);
    switch (e.action) {
      case "select":
        this.updateOrderStatus(e.row);
        break;
      case "Cancel":
        this.updateOrderStatus(e.row);
        break;
      case "View Product":
        this.navigateToProduct(e.row);
        break;
      case "viewDetails":
        this.onEdit(e.row);
        break;
    }
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
  }

  backClicked() {
    this.orderDetailsView = false;
    this.orderDetail = {}
    this.ShippingCost = 0;
  }

  onEdit(row) {
    for (var i = 0; i < row.ItemsList.length; i++) {
      this.ShippingCost += row.ItemsList[i].ShippingCost;
    }
    this.orderDetailsView = true;
    this.orderDetail = row;
    console.log(row);
  }

  back() {
    this.orderDetailsView = false;
    this.initOrderDetails();
  }

  updateOrderStatus(row) {
    if (row.OrderStatus != 9) {
      this.http.put(AppconstantsService.homeAPIs.orders + "/status", { Id: row.Id, OrderStatus: 9 }).then((data: any) => {
        if (data.isSucess) {
          this.helper.showSuccessTostMessage(data.message, data.close);
          this.refreshTableData();
        }
      }
        , (error: any) => { })
    }

  }

  reOderPressed(item) {
      var json = {
        OrderCount: item.OrderCount,
        TotalCost: item.TotalPrice,
        PickUpDateTime: item.PickUpDateTime,
        ProductId: item.ProductId,
        Price: item.Price,
        ProductName: item.ProductName,
        ProductTitle: item["ProductTitle"],
        AccountId: item["AccountId"],
        CategoryId: item["CategoryId"],
        ProductSerialNo: item["SerialNo"],
        JobName: item.JobName +"-duplicate",
        DeliveryType: item.shippingType,
        WidthFt: item.widthFt,
        WidthInch: item.widthInch,
        HeightFt: item.heightFt,
        HeightInch: item.heightInch,
        NoOfSides: item.noOfSides,
        PolePocket: item.polePocket,
        Hem: item.hem,
        Grommet: item.grommet,
        Windslit: item.windslit,
        Webbing: item.webbing,
        Corner: item.corner,
        Rope: item.rope,
        TurnAround: item.turnAround,
        DesignProof: item.designProof,
        ProductImage: item.ProductImage,
        Products: item.selectedTabid,
        PoleBannerSize: item.poleBannerSize,
        PoleWidth: item.poleBannerSize,
      }

      this.http.put(AppconstantsService.homeAPIs.cart, json).then((d) => {
        if (d && d.isSucess) {
          this.helper.showSuccessTostMessage(d.message, d.close);
          HelperService.CartCountUpdateMethod(HelperService.CartCountUpdateArg);
        }
      }, (e) => {
        console.log(e);
      });
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
