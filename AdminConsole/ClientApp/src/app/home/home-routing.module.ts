import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ViewComponent } from './products/view/view.component';
import { AddProductDetailsComponent } from './products/add-product-details/add-product-details.component';
import { ViewOrdersComponent } from './orders/view-orders/view-orders.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { ProductCategoriesComponent } from './products/product-categories/product-categories.component';
import { MessagesComponent } from './customer/messages/messages.component';
import { CustomerComponent } from './customer/customer.component';
import { PluginComponent } from './customer/plugin/plugin.component';
import { GroupsComponent } from './customer/groups/groups.component';
import { UsersComponent } from './customer/users/users.component';
import { PricemarkupComponent } from './customer/pricemarkup/pricemarkup.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'products', component: ProductsComponent,
        children: [
          {
            path: 'view', component: ViewComponent,
          },
          // {
          //   path: 'quickAdd', component: AddProductComponent,
          // },
          {
            path: 'detailedAdd', component: AddProductDetailsComponent,
          },

          //     {
          //       path: 'import', component: ImportProductComponent,
          //     },
          //     {
          //       path: 'export', component: ExportProductComponent,
          //     },
          {
            path: 'productCategories', component: ProductCategoriesComponent,
          },
          //     {
          //       path: 'productReviews', component: ProductReviewComponent,
          //     },
          //     {
          //       path: 'brands', component: BrandsComponent,
          //     },
          //     { path: 'addProduct', component: AddProductDetailsComponent,}
        ]
      },
      {
        path: 'user', component: ProductsComponent,
        children: [
          {
            path: 'users', component: ViewComponent,
          },
        ]
      },
      {
        path: 'orders', component: OrdersComponent,
        children: [
          {
            path: 'view', component: ViewOrdersComponent,
          },
          {
            path: 'add', component: AddOrderComponent,
          },
          // {
          //   path: 'export', component: ExportOrdersComponent,
          // },
          // {
          //   path: 'draftOrders', component: DraftOrdersComponent,
          // },
          // {
          //   path: 'trackingNumbers', component: TrackingNumbersComponent,
          // },
          // {
          //   path: 'giftCertificates', component: GiftCertificatesComponent,
          // },
          // {
          //   path: 'orderStatuses', component: OrderStatusComponent,
          // }
        ]
      },
      {
        path: 'customer', component: CustomerComponent,
        children: [
          {
            path: 'messages', component: MessagesComponent,
          },
          {
            path: 'plugin', component: PluginComponent,
          },
          {
            path: 'groups', component: GroupsComponent,
          },
          {
            path: 'users', component: UsersComponent,
          },
          {
            path: 'markup', component: PricemarkupComponent,
          }
        ]
      },
      {
        path: 'marketting', component: HomeComponent,
      },
      // {
      //   path: 'user', component: UsersComponent,
      //   children: [
      //     {
      //       path: 'user',
      //       component: UserManageListComponent
      //     },
      //     {
      //       path: 'logout',
      //       component: UserLogoutComponent
      //     }
      //   ]
      // }

    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
