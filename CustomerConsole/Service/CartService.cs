using CommonModel;
using CommonUtility;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace CustomerConsole.Service
{
    public class CartService
    {
        internal static string AddItemToCart(UserModel user, CartModel data)
        {
            if (data != null && data.OrderCount > 0 && !string.IsNullOrWhiteSpace(data.ProductId))
            {
                data.AccountId = user._id;
                data.Id = Guid.NewGuid().ToString();
                data.CartStatus = 0;
                Settings.mongoUtility.executeQeuryForInsert<CartModel>(new List<CartModel>() { data }, "cart");
                return ResponseModel.getResponse(true, "Added Item to cart.", null);
            }
            return ResponseModel.getResponse(false, "Failed to add item to cart.", null);
        }

        internal static string UpdateCartItemPickup(UserModel user, string Id, int status)
        {
            if (!string.IsNullOrWhiteSpace(Id))
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", Id)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                long updatedcount = Settings.mongoUtility.executeQeuryForUpdateOne("cart", new BsonDocument() { { "delivery_type", status } }, filter);
                return ResponseModel.getResponse(true, "Changed Delivery Mode.", null);
            }
            return ResponseModel.getResponse(false, "Failed.", null);
        }

        public static string UpdateCartItemCount(UserModel user, CartModel item)
        {
            if (!string.IsNullOrWhiteSpace(item.Id))
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", item.Id)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                double TotalCost = (item.OrderCount * item.UnitPrice ) + (item.ShippingCost);
                var doc = new BsonDocument() { { "order_count", item.OrderCount }, { "total_cost", TotalCost } };
                long updatedcount = Settings.mongoUtility.executeQeuryForUpdateOne("cart", doc, filter);
                return ResponseModel.getResponse(true, "Updated order count.", null);
            }
            return ResponseModel.getResponse(false, "Failed.", null);
        }

        internal static string CaptureOrder(string id, UserModel user)
        {
            if (string.IsNullOrWhiteSpace(id) || id == "null")
            {
                List<CartModel> cartItems = GetUserCartItems(user);
                List<string> ids = new List<string>();
                double total = 0;
                if (cartItems.Count > 0)
                {
                    for (var i = 0; i < cartItems.Count; i++)
                    {
                        var item = cartItems[i];
                        total += item.TotalCost;
                        ids.Add(item.Id);
                    }
                }
                OrderService.MoveItemsToOrdersList("Offline Payment", total.ToString(), null, user,"Offline Payment");
                return ResponseModel.getResponse(true, "Payment success", "Set Manual Payment");
            }
            else
            {
                var data = PaypalService.CapturePayment(id);
                if (!string.IsNullOrWhiteSpace(data))
                {
                    dynamic json = JsonConvert.DeserializeObject(data);
                    if (json != null)
                    {
                        var purchaseUnits = json.purchase_units[0];
                        BsonDocument doc = new BsonDocument() {
                            {"AccountId",user._id },
                            { "_id", Guid.NewGuid().ToString() },
                            {"paymentinfo", data},
                            {"orderid",id },
                            {"refund_url",purchaseUnits.payments.captures[0].links[1].href.ToString() }
                        };
                        string totalPrice = purchaseUnits.payments.captures[0].amount.value;
                        Settings.mongoUtility.executeQeuryForInsert<BsonDocument>(new List<BsonDocument>() { doc }, "paymentinfo");
                        if (json.status == "COMPLETED")
                        {
                            var shipping = purchaseUnits.shipping;
                            string shppingAddress = shipping.name.full_name + "," +
                                                    shipping.address.address_line_1 + "," +
                                                    shipping.address.address_line_2 + "," +
                                                    shipping.address.admin_area_2 + "," +
                                                    shipping.address.admin_area_1 + "," +
                                                    shipping.address.postal_code + "," +
                                                    shipping.address.country_code;
                            OrderService.MoveItemsToOrdersList(shppingAddress, totalPrice, id, user,"Paypal");
                            return ResponseModel.getResponse(true, "Payment success", data);
                        }
                        else
                        {
                            return ResponseModel.getResponse(false, "Payment Failed", data);
                        }
                    }
                }
                return ResponseModel.getResponse(false, "Payment Failed", null);
            }
        }

        internal static string CreateOrder(UserModel user)
        {

            List<CartModel> cartItems = GetUserCartItems(user);
            List<string> ids = new List<string>();
            if (cartItems.Count > 0)
            {
                double total = 0;
                for (var i = 0; i < cartItems.Count; i++)
                {
                    var item = cartItems[i];
                    total += item.TotalCost + item.ShippingCost;
                    ids.Add(item.Id);
                }
                var data = PaypalService.CreateOrder(total);
                dynamic json = JsonConvert.DeserializeObject<dynamic>(data);
                if (json != null)
                {
                    string id = json.id;
                    FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().In("_id", ids)
                                                            & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                    long updatedcount = Settings.mongoUtility.executeQeuryForUpdateMany(new BsonDocument() { { "paypal_orderid", id } }, filter, "cart");
                    return JsonConvert.SerializeObject(new { id = id });
                }


            }
            return null;
        }

        internal static string UpdateCartItemStatus(UserModel user, string Id, int status)
        {
            if (!string.IsNullOrWhiteSpace(Id))
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", Id)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                long updatedcount = Settings.mongoUtility.executeQeuryForUpdateOne("cart", new BsonDocument() { { "cart_status", status } }, filter);
                if (status == 0)
                {
                    return ResponseModel.getResponse(true, "Moved item to cart.", null);
                }
                else
                {
                    return ResponseModel.getResponse(true, "Saved item for later.", null);
                }

            }
            return ResponseModel.getResponse(false, "Failed.", null);
        }

        internal static string DeleteCartItem(UserModel user, string id)
        {
            if (!string.IsNullOrWhiteSpace(id))
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", id)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                long updatedcount = Settings.mongoUtility.executeQueryForDeleteOne(filter, "cart");
                return ResponseModel.getResponse(true, "Successfully deleted item from cart.", null);
            }
            return ResponseModel.getResponse(false, "Failed to delete item.", null);
        }

        internal static List<CartModel> GetUserCartItems(UserModel user)
        {
            try
            {
                FilterDefinition<CartModel> filter = new FilterDefinitionBuilder<CartModel>().Eq("account_id", user._id)
                                                     & new FilterDefinitionBuilder<CartModel>().Eq("cart_status", 0);
                long totalRows = 0;
                return Settings.mongoUtility.executeQeuryForData<CartModel>(filter, null, "cart", ref totalRows);

            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        internal static long GetItemsCountInCart(UserModel user)
        {
            try
            {
                FilterDefinition<CartModel> filter = new FilterDefinitionBuilder<CartModel>().Eq("account_id", user._id)
                                                       & new FilterDefinitionBuilder<CartModel>().Eq("cart_status", 0);
                return Settings.mongoUtility.executeQeuryForCount(filter, "cart");
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return 0;
        }

        internal static string GetCartItems(GridModel grid, UserModel user)
        {
            try
            {
                FilterDefinition<CartModel> filter = new FilterDefinitionBuilder<CartModel>().Eq("account_id", user._id)
                    & new FilterDefinitionBuilder<CartModel>().Eq("cart_status", 0);
                long totalRows = 0;
                if (string.IsNullOrWhiteSpace(grid.sortCol))
                {
                    grid.sortCol = "ordered_Date";
                }
                SortDefinition<CartModel> sort = "{" + grid.sortCol + ":" + grid.sortOrder + " }";
                if (!string.IsNullOrWhiteSpace(grid.searchVal))
                {
                    var filterbuilder = new FilterDefinitionBuilder<CartModel>();
                    filter = filter &
                        (
                          filterbuilder.Regex(x => x.ProductName, new BsonRegularExpression(grid.searchVal, "i"))
                        );
                }
                List<CartModel> products = Settings.mongoUtility.executeQeuryForData<CartModel>(filter, null, "cart", ref totalRows, sort, grid.limit, grid.start);
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
