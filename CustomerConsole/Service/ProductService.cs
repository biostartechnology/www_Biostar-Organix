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

namespace CustomerConsole.Service
{
    public class ProductService
    {
        internal static string GetProducts(ProductGridModel grid)
        {
            try
            {
                long totalRows = 0;
                if (string.IsNullOrWhiteSpace(grid.sortCol))
                {
                    grid.sortCol = "product_name";
                }
                SortDefinition<ProductModel> sort = "{" + grid.sortCol + ":" + grid.sortOrder + " }";

                var filterbuilder = new FilterDefinitionBuilder<ProductModel>();

                FilterDefinition<ProductModel> filter = "{}";

                if (!string.IsNullOrWhiteSpace(grid.productId))
                {
                    filter = filterbuilder.Eq(x => x.Id, grid.productId);
                }
                else if (!string.IsNullOrWhiteSpace(grid.searchVal))
                {
                    //if search ignore category
                    filter = filterbuilder.Regex(x => x.ProductName, new BsonRegularExpression(grid.searchVal, "i"));
                }
                else if(grid.category != null && grid.category.Length > 0)
                {
                    filter = filterbuilder.In("category_id", grid.category);
                }

                UserModel user = AuthenticateUser.GetUserDetailsFromSession();

                if(user != null)
                {
                    string allotedGroup = user.GroupId;
                    if (!string.IsNullOrWhiteSpace(allotedGroup))
                    {

                        var groupFilter = new FilterDefinitionBuilder<GroupModel>().Eq("_id", allotedGroup);
                        var project = "{selected_category:1}";
                        List<GroupModel> groups = Settings.mongoUtility.executeQeuryForData<GroupModel>(groupFilter, project, "groups", ref totalRows);
                        if(groups != null && groups.Count > 0)
                        {
                            filter = filter & filterbuilder.In(x => x.CategoryId, groups[0].selectedCategory);
                        }
                    }
                }

                List<ProductModel> products = Settings.mongoUtility.executeQeuryForData<ProductModel>(filter, null, "products", ref totalRows);
                
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
