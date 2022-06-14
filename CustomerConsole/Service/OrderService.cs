using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerConsole.Service
{
    public class OrderService
    {
        //internal static string AddOrder(UserModel user, CartModel data)
        //{
        //    if (data != null && data.OrderCount > 0 && !string.IsNullOrWhiteSpace(data.ProductId))
        //    {
        //        data.CustomerName = user.FirstName;
        //        data.CustomerEmail = user.EmailId;
        //        data.CustomerPhone = user.Phone;
        //        data.AccountId = user._id;
        //        data.Id = Guid.NewGuid().ToString();
        //        data.OrderedDate = DateTime.Now;
        //        data.OrderStatus = 2;
        //        Settings.mongoUtility.executeQeuryForInsert<CartModel>(new List<CartModel>() { data }, "orders");
        //        return ResponseModel.getResponse(true, "Placed Order. Please visit store to collect the order.", null);
        //    }
        //    return ResponseModel.getResponse(false, "Failed to place order.", null);
        //}

        internal static string UpdateCartStatus(UserModel user, string Id, int status)
        {
            if (!string.IsNullOrWhiteSpace(Id))
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", Id)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                long updatedcount = Settings.mongoUtility.executeQeuryForUpdateOne("orders", new BsonDocument() { { "order_status", status } }, filter);
                return ResponseModel.getResponse(true, "Updated Order Status.", null);
            }
            return ResponseModel.getResponse(false, "Failed to update order.", null);
        }

        internal static string GetOrderDetail(string id, UserModel user)
        {
            try
            {
                FilterDefinition<OrderModel> filter = new FilterDefinitionBuilder<OrderModel>().Eq("account_id", user._id)
                                                      & new FilterDefinitionBuilder<OrderModel>().Eq("paypalorder_id", id);

                long totalRows = 0;
                List<OrderModel> order = Settings.mongoUtility.executeQeuryForData<OrderModel>(filter, null, "orders", ref totalRows);
                if (order != null && order.Count > 0)
                {
                    return JsonConvert.SerializeObject(order[0]);
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        internal static string GetOrdersAwaitingArtWork(UserModel user)
        {
            try
            {
                FilterDefinition<OrderModel> filter = new FilterDefinitionBuilder<OrderModel>().Eq("account_id", user._id)
                                                    & new FilterDefinitionBuilder<OrderModel>().In("item_list.order_status", new List<int> () { 11,12,13,14});
                long totalRows = 0;
               
                SortDefinition<OrderModel> sort = "{ordered_Date:-1 }";

                List<OrderModel> order = Settings.mongoUtility.executeQeuryForData<OrderModel>(filter, null, "orders", ref totalRows, sort);

                if (order != null)
                {
                    return JsonConvert.SerializeObject(new { rows = order, totalRows = totalRows });
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        internal static string UpdateArtwork(UserModel user,OrderModel order)
        {
            try
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id)
                                                    & new FilterDefinitionBuilder<BsonDocument>().Eq("_id", order.JobId);
               
                string path = "/" + user._id + "/ArtworkImages/" + order.JobId +"/" + order.Index + "/";
                Settings.FTPService.HandleDirectoryCreation(path);
                string imgPath = "";
                if (!string.IsNullOrWhiteSpace(order.Image))
                {
                    if (!order.Image.Contains("http://") && !order.Image.Contains("https://"))
                    {
                        if (order.Image.Contains(","))
                        {
                            order.Image = order.Image.Substring(order.Image.IndexOf(",") + 1);
                        }
                        string uploadPath = path + order.ImageName;
                        if (UploadFile(order.Image, uploadPath))
                        {
                            imgPath = Settings.FTPDownloadPath + uploadPath;
                            order.Image = "";
                        }
                    }
                }

                BsonDocument doc = new BsonDocument() { { "item_list." + order.Index + ".artwork_image", imgPath },{ "item_list." + order.Index + ".order_status", 12} };
                long updatedcount = Settings.mongoUtility.executeQeuryForUpdateOne("orders", doc, filter);
                return ResponseModel.getResponse(true, "Uploaded artwork successfully. We will review it.", null);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        public static bool UploadFile(string data, string path)
        {
            byte[] file = Convert.FromBase64String(data);
            return Settings.FTPService.UploadFileStream(file, path);
        }

        internal static string GetOrders(GridModel grid, UserModel user)
        {
            try
            {
                FilterDefinition<OrderModel> filter = new FilterDefinitionBuilder<OrderModel>().Eq("account_id", user._id);
                long totalRows = 0;
                if (string.IsNullOrWhiteSpace(grid.sortCol))
                {
                    grid.sortCol = "ordered_Date";
                }
                SortDefinition<OrderModel> sort = "{ordered_Date:-1 }";

                //if (!string.IsNullOrWhiteSpace(grid.searchVal))
                //{
                //    var filterbuilder = new FilterDefinitionBuilder<OrderModel>();
                //    filter = filter &
                //        (
                //          filterbuilder.Where(x => x.ItemsList.)
                //        );
                //}

                List<OrderModel> order = Settings.mongoUtility.executeQeuryForData<OrderModel>(filter, null, "orders", ref totalRows, sort, grid.limit, grid.start);
                if (order != null)
                {
                    return JsonConvert.SerializeObject(new { rows = order, totalRows = totalRows });
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        internal static void MoveItemsToOrdersList(string shppingAddress, string totalPrice, string payPayOrderId, UserModel user, string paymentMethod)
        {
            FilterDefinition<CartModel> filter = new FilterDefinitionBuilder<CartModel>().Eq("account_id", user._id)
                                                    & new FilterDefinitionBuilder<CartModel>().Eq("cart_status", 0);

            if (!string.IsNullOrWhiteSpace(payPayOrderId))
            {
                filter &= new FilterDefinitionBuilder<CartModel>().Eq("paypal_orderid", payPayOrderId);
            }
            else
            {
                payPayOrderId = Guid.NewGuid().ToString().Split("-")[0].ToUpper();
            }

            long totalRows = 0;
            List<CartModel> data = Settings.mongoUtility.executeQeuryForData<CartModel>(filter, null, "cart", ref totalRows);
            if (data != null)
            {

                List<string> ids = new List<string>();

                for (int i = 0; i < data.Count; i++)
                {
                    ids.Add(data[i].Id);
                    data[i].JobId = payPayOrderId + " - " + i;
                    data[i].OrderStatus = 1;
                    data[i].CustomerEmail = user.EmailId;
                    data[i].CustomerName = user.FirstName;
                    data[i].CustomerPhone = user.Phone;
                }
                OrderModel order = new OrderModel()
                {
                    ItemsList = data,
                    OrderedDate = DateTime.UtcNow,
                    ShippingAddress = shppingAddress,
                    AccountId = user._id,
                    OrderStatus = 1,
                    TotalCost = totalPrice,
                    OrderId = payPayOrderId,
                    JobId = Guid.NewGuid().ToString(),
                    PaymentMethod = paymentMethod
                };
                Settings.mongoUtility.executeQeuryForInsert<OrderModel>(new List<OrderModel>() { order }, "orders");
                Settings.mongoUtility.executeQueryForDeleteMany(new FilterDefinitionBuilder<BsonDocument>().In("_id", ids), "cart");
                SendOrderSuccessMail(shppingAddress, payPayOrderId, user, totalPrice);
            }
        }

        private static void SendOrderSuccessMail(string shppingAddress, string orderId, UserModel user, string totalPrice)
        {
            try
            {
                string html = @"<table width='100%' style='border:1px solid #e6c0c0;background:#eaeaea;font-size: 13px;background: #eaeaea;'>
                             <tbody>
                                <tr style='border:1px solid grey'>
                                    <td style='padding: 27px;'>
				                        <p>Vector-NLS</p>
			                        </td>
			                        <td style='padding: 27px;'>
				                        <p>Order Confirmation</p>
				                        <p>Order Id {0}<br/>
				                        </p>
			                        </td>
		                        </tr>
		                        <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Hi {1},</p>
				                        <p>Thank you for your order. We’ll send a confirmation when your order ships. Your estimated delivery date is indicated below. If you would like to view the status of your order or make any changes to it, please visit <a href='lasigns.nlshelp.com/orders'>Your Orders</a> on LAsigns.</p>
			                        </td>
		                        </tr>
                                <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Shipping Address</p>
				                        <p>{2}</p>
			                        </td>
		                        </tr>
                                <tr style='border:1px solid grey'>
			                        <td style='padding: 27px;'>
				                        <p>Order Summary</p>
				                        <p>Order Id : {3}</p>
                                        <p>Placed on Thrusday : {4}</p>
                                        <br />
                                        <p>Order Total: {5}</p>
			                        </td>
		                        </tr>
	                        </tbody>
                        </table>";
                string actiationMail = Settings.BaseUrl + "/session/verifyEmail?id=" + user._id;
                string now = GetMonth(DateTime.UtcNow.Month) + " " + DateTime.UtcNow.Day;
                html = string.Format(html, orderId, user.FirstName, shppingAddress.Replace(",", "<br/>"), orderId, now, totalPrice);
                Settings.mailUtility.Send("Order Confirmation", html, user.EmailId, Settings.BccEmailAddress, true);
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }

        private static string GetMonth(int n)
        {
            switch (n)
            {
                case 1: return "Jan";
                case 2: return "Feb";
                case 3: return "Mar";
                case 4: return "Apr";
                case 5: return "May";
                case 6: return "June";
                case 7: return "July";
                case 8: return "Aug";
                case 9: return "Sept";
                case 10: return "Oct";
                case 11: return "Nov";
                case 12: return "Dec";
            }
            return "This";
        }
    }
}
