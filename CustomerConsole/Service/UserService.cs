using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using CommonModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonUtility;

namespace CustomerConsole.Service
{
    public class UserService
    {
        internal static string UpdateProfile(string id, UserModel user)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(id) && !string.IsNullOrWhiteSpace(user.Phone) && !string.IsNullOrWhiteSpace(user.FirstName))
                {
                    var filter = new FilterDefinitionBuilder<BsonDocument>().Eq("user_id", id);
                    BsonDocument doc = new BsonDocument()
                    {
                        {"phone" , user.Phone},
                        {"first_name" , user.FirstName },
                        {"dateofbirth", user.DOB},
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
