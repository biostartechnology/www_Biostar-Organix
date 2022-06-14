using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AdminConsole.Service
{
    public class CustomerService
    {
        public static object UpdateGroup(string groupId, string userId, UserModel user)
        {
            if (user.UserType == "Admin")
            {
                FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", userId);
                BsonDocument doc = new BsonDocument() { { "group_id", groupId } };
                Settings.mongoUtility.executeQeuryForUpdateOne("users", doc, filter);
                return ResponseModel.getResponse(true, "Updated user group successfully.", null);
            }
            return null;
        }

        internal static string GetUsers(GridModel grid, UserModel user)
        {
            try
            {
                if (user.UserType == "Admin")
                {
                    FilterDefinition<UserModel> filter = new FilterDefinitionBuilder<UserModel>().Ne("user_type", "Admin");
                    long totalRows = 0;
                    if (string.IsNullOrWhiteSpace(grid.sortCol))
                    {
                        grid.sortCol = "first_name";
                    }
                    SortDefinition<UserModel> sort = "{" + grid.sortCol + ":" + grid.sortOrder + " }";
                    if (!string.IsNullOrWhiteSpace(grid.searchVal))
                    {
                        var filterbuilder = new FilterDefinitionBuilder<UserModel>();
                        filter = filter &
                                                (
                                                    filterbuilder.Regex(x => x.FirstName, new BsonRegularExpression(grid.searchVal, "i"))
                                                  | filterbuilder.Regex(x => x.EmailId, new BsonRegularExpression(grid.searchVal, "i"))
                                                );
                    }
                    List<UserModel> users = Settings.mongoUtility.executeQeuryForData<UserModel>(filter, null, "users", ref totalRows, sort, grid.limit, grid.start);
                    if (users != null)
                    {
                        return JsonConvert.SerializeObject(new { rows = users, totalRows = totalRows });
                    }
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
