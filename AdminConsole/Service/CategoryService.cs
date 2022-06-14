using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AdminConsole.Service
{
    public class CategoryService
    {
        internal static object GetCategories(UserModel user)
        {
            try
            {
                FilterDefinition<CategoryModel> filter = new FilterDefinitionBuilder<CategoryModel>().Eq("account_id", user._id);
                long totalRows = 0;
                List<CategoryModel> categories = Settings.mongoUtility.executeQeuryForData<CategoryModel>(filter, null, "category", ref totalRows);
                if (categories != null)
                {
                    return JsonConvert.SerializeObject(new { rows = categories, totalRows = totalRows });
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        internal static string AddCategoryImages(CategoryModel data, UserModel user)
        {

            if (data.Images != null && data.Images.Count > 0)
            {
                string path = "/" + user.AccountId + "/CategoryImages/" + data.Id;
                for (int i = 0; i < data.Images.Count; i++)
                {
                    Settings.FTPService.HandleDirectoryCreation(path);
                    if (data.Images[i] != null)
                    {
                        var imgData = data.Images[i];
                        if (!string.IsNullOrWhiteSpace(imgData.Value) && !imgData.Value.Contains("http://") && !imgData.Value.Contains("https://"))
                        {
                            if (imgData.Value.Contains(","))
                            {
                                imgData.Value = imgData.Value.Substring(imgData.Value.IndexOf(",") + 1);
                            }
                            string uploadPath = path + "/" + imgData.Name;
                            if (ProductService.UploadFile(imgData.Value, uploadPath))
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

                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", data.Id);

                long updatedcount = Settings.mongoUtility.executeQeuryForUpdateOne("category", new BsonDocument() { { "images", JsonConvert.SerializeObject(data.Images) } }, filter);
                return ResponseModel.getResponse(true, "Added images successfully.", null);
            }

            return ResponseModel.getResponse(true, "Failed to add images.", null);
        }

      

        internal static string AddCategory(CategoryModel category, UserModel user)
        {
            if (category != null && !string.IsNullOrWhiteSpace(category.CategoryName))
            {
                try
                {
                    FilterDefinition<CategoryModel> filter = new FilterDefinitionBuilder<CategoryModel>().Eq("category_name", category.CategoryName)
                                                            & new FilterDefinitionBuilder<CategoryModel>().Eq("account_id", user._id);

                    if (category.Images != null && category.Images.Count > 0)
                    {
                        string path = "/" + user.AccountId + "/CategoryImages/" + category.Id;
                        for (int i = 0; i < category.Images.Count; i++)
                        {
                            Settings.FTPService.HandleDirectoryCreation(path);
                            if (category.Images[i] != null)
                            {
                                var imgData = category.Images[i];
                                if (!string.IsNullOrWhiteSpace(imgData.Value) && !imgData.Value.Contains("http://") && !imgData.Value.Contains("https://"))
                                {
                                    if (imgData.Value.Contains(","))
                                    {
                                        imgData.Value = imgData.Value.Substring(imgData.Value.IndexOf(",") + 1);
                                    }
                                    string uploadPath = path + "/" + imgData.Name;
                                    if (ProductService.UploadFile(imgData.Value, uploadPath))
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

                    if (Settings.mongoUtility.executeQeuryForCount<CategoryModel>(filter, "category") == 0)
                    {

                        category.Id = Guid.NewGuid().ToString();
                        category.CreateOn = DateTime.UtcNow;
                        category.AccountId = user._id;
                        Settings.mongoUtility.executeQeuryForInsert<CategoryModel>(new List<CategoryModel>() { category }, "category");
                        return ResponseModel.getResponse(true, "Category added successfully", null);
                    }
                    else
                    {
                        return ResponseModel.getResponse(false, "Category with same already exist", null);
                    }
                }
                catch (Exception e)
                {
                    Logger.Log(e);
                }
            }
            return null;
        }
    }
}
