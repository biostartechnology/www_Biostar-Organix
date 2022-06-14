using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using CommonModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonUtility;

namespace AdminConsole.Service
{
    public class UserService
    {
        public static string GetClientDetailList(UserModel userDetails, GridModel grid)
        {
            try
            {
                FilterDefinition<UserModel> filter = new FilterDefinitionBuilder<UserModel>().Ne(x => x.UserType, "Admin");
                long totalRows = 0;
                if (string.IsNullOrWhiteSpace(grid.sortCol))
                {
                    grid.sortCol = "created_date";
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
                List<UserModel> Clients = Settings.mongoUtility.executeQeuryForData<UserModel>(filter, null, "users", ref totalRows, sort, grid.limit, grid.start);
                if (Clients != null)
                {
                    return JsonConvert.SerializeObject(new { rows = Clients, totalRows = totalRows });
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        public static string GetClientList(UserModel userDetails)
        {
            try
            {
                FilterDefinition<UserModel> filter = new FilterDefinitionBuilder<UserModel>().Eq(x => x.UserType, "Client");
                if (userDetails.UserType == "Agent" || userDetails.UserType == "Vendor")
                {
                    filter = filter & new FilterDefinitionBuilder<UserModel>().Eq("email_id", userDetails.EmailId);
                }
                long totalRows = 0;
                List<UserModel> Clients = Settings.mongoUtility.executeQeuryForData<UserModel>(filter, null, "users", ref totalRows);
                if (Clients != null)
                {
                    return JsonConvert.SerializeObject(Clients);
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        internal static string AddorEditClient(UserModel ClientDetails, UserModel userDetails)
        {
            try
            {
                if (ClientDetails != null && !string.IsNullOrWhiteSpace(ClientDetails.EmailId) && !string.IsNullOrWhiteSpace(ClientDetails.FirstName))
                {
                    if (string.IsNullOrWhiteSpace(ClientDetails._id))
                    {
                        FilterDefinition<UserModel> filter = new FilterDefinitionBuilder<UserModel>().Regex(x => x.EmailId, new BsonRegularExpression(ClientDetails.EmailId, "i"));
                        long existingAccountCount = Settings.mongoUtility.executeQeuryForCount<UserModel>(filter, "users");
                        ++existingAccountCount;

                        ClientDetails.UserType = "Client";
                        filter = new FilterDefinitionBuilder<UserModel>().Regex(x => x.EmailId, new BsonRegularExpression(ClientDetails.EmailId, "i"));
                        long userCount = Settings.mongoUtility.executeQeuryForCount<UserModel>(filter, "users");
                        ++userCount;

                        ClientDetails.CreatedDate = DateTime.UtcNow;
                        // ClientDetails._id = Guid.NewGuid().ToString();
                        Settings.mongoUtility.executeQeuryForInsert<UserModel>(new List<UserModel>() { ClientDetails }, "users");
                    }
                    else
                    {
                        BsonObjectId id = null;
                        BsonObjectId.TryParse(ClientDetails._id, out id);
                        FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("_id", ClientDetails._id);
                        if (id != null)
                        {
                            filter = filter | new FilterDefinitionBuilder<BsonDocument>().Eq("_id", id);
                        }
                        try
                        {
                            BsonDocument doc = ClientDetails.ToBsonDocument();
                            doc.Remove("_id");
                            Settings.mongoUtility.executeQeuryForUpdateOne("users", doc, filter);
                        }
                        catch (Exception e)
                        {
                            //Settings.mongoUtility.executeQueryForDeleteOne(filter, "users");
                            //ClientDetails._id = null;
                            //AddorEditClient(ClientDetails, userDetails);
                        }
                    }
                    return ResponseModel.getResponse(true, "Success", null);
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return ResponseModel.getResponse(false, "Failed", null);
        }

        internal static string DeleteClient(string id, UserModel userDetails)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(id))
                {
                    var filter = new FilterDefinitionBuilder<BsonDocument>().Eq("user_id", id);
                    if (userDetails != null && (userDetails.UserType == "Super_Admin"))
                    {
                        Settings.mongoUtility.executeQueryForDeleteOne(filter, "users");
                    }
                    else
                    {
                        Settings.mongoUtility.executeQeuryForUpdateOne("users", new BsonDocument() { { "vendor_id", "Super_Admin" } }, filter);
                    }
                    return ResponseModel.getResponse(true, "Success", null);
                }
            }
            catch (Exception e)
            {

                Logger.Log(e);
            }
            return ResponseModel.getResponse(false, "Failed", null);
        }

        internal static string EditClient(string id, UserModel user)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(id) && !string.IsNullOrWhiteSpace(user.EmailId) && !string.IsNullOrWhiteSpace(user.FirstName))
                {
                    var filter = new FilterDefinitionBuilder<BsonDocument>().Eq("user_id", id);
                    BsonDocument doc = new BsonDocument()
                    {
                        {"email_id" ,user.EmailId},
                        {"first_name" , user.FirstName},
                        {"last_name" , user.LastName },
                        {"password" , user.Password },
                        {"phone" , user.Phone},
                        {"user_type" , "Client" },
                        {"status" , user.Status },
                    };
                    Settings.mongoUtility.executeQeuryForUpdateOne("users", doc, filter);
                    return ResponseModel.getResponse(true, "Success", null);
                }
            }
            catch (Exception e)
            {

                Logger.Log(e);
            }
            return ResponseModel.getResponse(false, "Failed", null);
        }
      
    }
}
