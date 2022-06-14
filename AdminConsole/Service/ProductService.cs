using CommonModel;
using CommonUtility;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AdminConsole.Service
{
    public class ProductService
    {
        internal static string GetProducts(GridModel grid, string status, UserModel user)
        {
            try
            {
                FilterDefinition<ProductModel> filter = new FilterDefinitionBuilder<ProductModel>().Eq("account_id", user._id);
                long totalRows = 0;
                if (string.IsNullOrWhiteSpace(grid.sortCol))
                {
                    grid.sortCol = "product_name";
                }
                SortDefinition<ProductModel> sort = "{" + grid.sortCol + ":" + grid.sortOrder + " }";
                if (!string.IsNullOrWhiteSpace(grid.searchVal))
                {
                    var filterbuilder = new FilterDefinitionBuilder<ProductModel>();
                    filter = filter &
                        (
                          filterbuilder.Regex(x => x.ProductName, new BsonRegularExpression(grid.searchVal, "i"))
                        );
                }
                List<ProductModel> products = Settings.mongoUtility.executeQeuryForData<ProductModel>(filter, null, "products", ref totalRows, sort, grid.limit, grid.start);
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

        internal static void UpdateProductPrice(MarkUpModel markup, UserModel user)
        {
            try
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                BsonDocument doc = new BsonDocument() { { "$mul", new BsonDocument { { "price", 1 + (markup.MarkUpPercent / 100) } } }, { "$set", new BsonDocument() { { "last_priceupdate", DateTime.UtcNow } } } };
                Settings.mongoUtility.executeQeuryForUpdateWithNoSetForMany(doc, filter, "products");
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
        }

        internal static bool DeleteProduct(string id, UserModel user)
        {
            try
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", id)
                                                        & new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id);
                Settings.mongoUtility.executeQueryForDeleteOne(filter, "products");
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        internal static string AddProduct(ProductModel data, UserModel user)
        {
            List<string> uploadUrls = new List<string>();
            try
            {
                if (data != null && user != null)
                {
                    string prodId = string.IsNullOrWhiteSpace(data.Id) ? Guid.NewGuid().ToString() : data.Id;
                    string path = "/" + user._id + "/ProductImages/" + prodId;
                    Settings.FTPService.HandleDirectoryCreation(path);
                    if (data.ImagesUrls.Count > 0)
                    {
                        for (int i = 0; i < data.ImagesUrls.Count; i++)
                        {
                            if (data.ImagesUrls[i].Value != null && !data.ImagesUrls[i].Value.Contains("http://") && !data.ImagesUrls[i].Value.Contains("https://"))
                            {
                                if (data.ImagesUrls[i].Value.Contains(","))
                                {
                                    data.ImagesUrls[i].Value = data.ImagesUrls[i].Value.Substring(data.ImagesUrls[i].Value.IndexOf(",") + 1);
                                }
                                string uploadPath = path + "/" + data.ImagesUrls[i].Name;
                                if (UploadFile(data.ImagesUrls[i].Value, uploadPath))
                                {
                                    data.ImagesUrls[i].Path = Settings.FTPDownloadPath + uploadPath;
                                    data.ImagesUrls[i].Value = "";
                                }
                            }
                            else
                            {
                                data.ImagesUrls[i].Path = data.ImagesUrls[i].Value;
                            }
                        }
                        data.DefaultImage = data.ImagesUrls[0].Path;
                    }

                    if (data.CustomAttributes.Count > 0)
                    {
                        for (int i = 0; i < data.CustomAttributes.Count; i++)
                        {
                            var key = Guid.NewGuid().ToString();
                            data.CustomAttributes[i].Key = key;
                            string path1 = path + "/CustomAttrImages/" + key;
                            Settings.FTPService.HandleDirectoryCreation(path1);
                            if (data.CustomAttributes[i].ImageData != null)
                            {
                                for (var j = 0; j < data.CustomAttributes[i].ImageData.Count; j++)
                                {
                                    var imgData = data.CustomAttributes[i].ImageData[j];

                                    if (!string.IsNullOrWhiteSpace(imgData.Value) && !imgData.Value.Contains("http://") && !imgData.Value.Contains("https://"))
                                    {
                                        if (imgData.Value.Contains(","))
                                        {
                                            imgData.Value = imgData.Value.Substring(imgData.Value.IndexOf(",") + 1);
                                        }
                                        string uploadPath = path1 + "/" + imgData.Name;
                                        if (UploadFile(imgData.Value, uploadPath))
                                        {
                                            imgData.Path = Settings.FTPDownloadPath + uploadPath;
                                            imgData.Value = "";
                                        }
                                    }
                                    else
                                    {
                                        imgData.Path = imgData.Value;
                                    }
                                }
                            }
                        }
                    }

                    if (data.VariantsDetails.Count > 0)
                    {
                        for (int i = 0; i < data.VariantsDetails.Count; i++)
                        {
                            var key = Guid.NewGuid().ToString();
                            data.VariantsDetails[i].Id = key;
                            string path1 = path + "/VariantImages/" + key;
                            Settings.FTPService.HandleDirectoryCreation(path1);
                            if (data.VariantsDetails[i].ImageData != null)
                            {
                                for (var j = 0; j < data.VariantsDetails[i].ImageData.Count; j++)
                                {
                                    var imgData = data.VariantsDetails[i].ImageData[j];
                                    if (!string.IsNullOrWhiteSpace(imgData.Value) && !imgData.Value.Contains("http://") && !imgData.Value.Contains("https://"))
                                    {
                                        if (imgData.Value.Contains(","))
                                        {
                                            imgData.Value = imgData.Value.Substring(imgData.Value.IndexOf(",") + 1);
                                        }
                                        string uploadPath = path1 + "/" + imgData.Name;
                                        if (UploadFile(imgData.Value, uploadPath))
                                        {
                                            imgData.Path = Settings.FTPDownloadPath + uploadPath;
                                            imgData.Value = "";
                                        }
                                    }
                                    else
                                    {
                                        imgData.Path = imgData.Value;
                                    }
                                }
                            }
                        }
                    }
                    data.CreatedDate = DateTime.Now;
                    data.AccountId = user._id;

                    if (string.IsNullOrWhiteSpace(data.Id))
                    {
                        data.Id = prodId;
                        Settings.mongoUtility.executeQeuryForInsert<ProductModel>(new List<ProductModel>() { data }, "products");
                        return ResponseModel.getResponse(true, "Saved product details successfully.", uploadUrls);
                    }
                    else
                    {
                        FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", data.Id);
                        BsonDocument doc = data.ToBsonDocument();
                        doc.Remove("_id");
                        Settings.mongoUtility.executeQeuryForUpdateOne("products", doc, filter);
                        return ResponseModel.getResponse(true, "Updated product details successfully.", uploadUrls);
                    }

                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return ResponseModel.getResponse(false, "", uploadUrls);
        }

        public static bool UploadFile(string data, string path)
        {
            byte[] file = Convert.FromBase64String(data);
            return Settings.FTPService.UploadFileStream(file, path);
        }

    }
}
