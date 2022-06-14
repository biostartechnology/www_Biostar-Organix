using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AdminConsole.Service
{
    public class OrderService
    {
        //internal static string AddOrder(UserModel user, OrderModel data)
        //{
        //    if (data != null)
        //    {
        //        data.CustomerName = user.FirstName;
        //        data.CustomerEmail = user.EmailId;
        //        data.CustomerPhone = user.Phone;
        //        data.AccountId = user._id;
        //        data.JobId = Guid.NewGuid().ToString();
        //        data.OrderedDate = DateTime.Now;
        //        data.OrderStatus = 2;
        //        Settings.mongoUtility.executeQeuryForInsert<OrderModel>(new List<OrderModel>() { data }, "orders");
        //        return ResponseModel.getResponse(true, "Placed Order. Please visit store to collect the order.", null);
        //    }
        //    return ResponseModel.getResponse(false, "Failed to place order.", null);
        //}

        internal static string CancelOrder(UserModel user, OrderModel data)
        {
            if (data != null)
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", data.JobId)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                long updatedcount = Settings.mongoUtility.executeQeuryForUpdateOne("orders", new BsonDocument() { { "notes", data.Notes }, { "order_status", data.OrderStatus } }, filter);

                if (updatedcount > 0)
                {
                    long t = 0;
                    List<BsonDocument> doc = Settings.mongoUtility.executeQeuryForData<BsonDocument>(filter, "{ 'paypal_orderid':1 }", "orders", ref t);
                    if (doc != null && doc.Count > 0)
                    {
                        string payPalId = doc[0]["paypal_orderid"].ToString();
                        if (!string.IsNullOrWhiteSpace(payPalId) && payPalId != "Offline Payment")
                        {
                            filter = new FilterDefinitionBuilder<BsonDocument>().Eq("orderid", payPalId)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                            doc = Settings.mongoUtility.executeQeuryForData<BsonDocument>(filter, "{ 'refund_url':1 }", "paymentinfo", ref t);
                            if (doc != null && doc.Count > 0)
                            {
                                string url = doc[0]["refund_url"].ToString();
                                string refundData = PaypalService.RefundPayment(url);
                                dynamic json = JsonConvert.DeserializeObject(refundData);
                                if (json != null && json.status== "COMPLETED")
                                {
                                    Settings.mongoUtility.executeQeuryForUpdateOne("paymentinfo", new BsonDocument() { { "refund_json", refundData } } , filter);
                                    filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", data.JobId)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                                    Settings.mongoUtility.executeQeuryForUpdateOne("orders", new BsonDocument() { { "refund_status", "Success" } }, filter);
                                }
                                else
                                {
                                    MarkRefundFailed(data.JobId, user._id, "Refund failed from paypal");
                                }
                            }
                            else
                            {
                                MarkRefundFailed(data.JobId, user._id, "Refund data not found");
                            }
                        }
                        else
                        {
                            MarkRefundFailed(data.JobId, user._id, "Offline Payment opted.");
                        }
                    }
                }
                return ResponseModel.getResponse(true, "Updated Order Status.", null);
            }
            return ResponseModel.getResponse(false, "Failed to update order.", null);
        }

        private static void MarkRefundFailed(string id, string acc_id, string mesg )
        {
            var filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", id)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", acc_id);
            Settings.mongoUtility.executeQeuryForUpdateOne("orders", new BsonDocument() { { "refund_status", mesg } }, filter);
        }

        private static void SendOrderStatusChangeAlert(UserModel user, int status,string JobId,string reason = "")
        {
            switch (status)
            {
                case 3://Accepted
                    OrderMailService.SendOrderAcceptedMail(JobId, user);
                    break;
                case 4://Ready For PickUp
                    OrderMailService.SendOrderReadyForPickUpMail(JobId, user);
                    break;
                case 7://Delivered
                    OrderMailService.SendOrderDelieveredMail(JobId, user);
                    break;
                case 9://Cancelled
                    OrderMailService.SendOrderCancelledMail(JobId, user,reason);
                    break;
                case 10://Item Rejected
                    break;
                case 11://Add Art Work
                    OrderMailService.SendOrderArtRequestedMail(JobId, user);
                    break;
                case 13://Art Work Approved
                    OrderMailService.SendOrderArtApprovedMail(JobId, user);
                    break;
                case 14://art rejected
                    OrderMailService.SendOrderArtRejectedMail(JobId, user,reason);
                    break;
                case 15://Shipped
                    OrderMailService.SendOrderShippedMail(JobId, user);
                    break;
            }
        }

        internal static string UpdateOrderStatus(UserModel user, string JobId, int status,string index)
        {
            if (!string.IsNullOrWhiteSpace(JobId))
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", JobId);
               
                long updatedcount = Settings.mongoUtility.executeQeuryForUpdateOne("orders", new BsonDocument() { { "item_list." + index + ".order_status", status } }, filter);
                
                return ResponseModel.getResponse(true, "Updated Order Status.", null);
            }
            return ResponseModel.getResponse(false, "Failed to update order.", null);
        }

        internal static string DeleteOrder(UserModel user, string JobId)
        {
            if (!string.IsNullOrWhiteSpace(JobId))
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", JobId)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("AccountId", user._id);
                Settings.mongoUtility.executeQueryForDeleteOne(filter, "orders");
                return ResponseModel.getResponse(true, "Order Deleted Successfully.", null);
            }
            return ResponseModel.getResponse(false, "Failed to delete order.", null);
        }

        internal static string GetOrders(GridModel grid, UserModel user)
        {
            try
            {
                FilterDefinition<OrderModel> filter = "{}";
                long totalRows = 0;
                if (string.IsNullOrWhiteSpace(grid.sortCol))
                {
                    grid.sortCol = "ordered_Date";
                }
                SortDefinition<OrderModel> sort = "{" + grid.sortCol + ":" + grid.sortOrder + " }";
                if (!string.IsNullOrWhiteSpace(grid.searchVal))
                {
                    var filterbuilder = new FilterDefinitionBuilder<OrderModel>();
                    filter = filter &
                        (
                          filterbuilder.Regex("item_list.product_name", new BsonRegularExpression(grid.searchVal, "i"))
                          | filterbuilder.Regex("item_list.customer_name", new BsonRegularExpression(grid.searchVal, "i"))
                          | filterbuilder.Regex("item_list.customer_email", new BsonRegularExpression(grid.searchVal, "i"))
                          | filterbuilder.Regex(x => x.JobId, new BsonRegularExpression(grid.searchVal, "i"))
                        );
                }
                List<OrderModel> products = Settings.mongoUtility.executeQeuryForData<OrderModel>(filter, null, "orders", ref totalRows, sort, grid.limit, grid.start);
                if (products != null)
                {
                    return JsonConvert.SerializeObject(new { rows = products, totalRows = totalRows });
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }


    }
}
