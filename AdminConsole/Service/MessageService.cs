using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AdminConsole.Service
{
    public class MessageService
    {
        internal static object GetMessages(UserModel user)
        {
            try
            {
                FilterDefinition<MessageModel> filter = new FilterDefinitionBuilder<MessageModel>().Eq("account_id", user._id);
                long totalRows = 0;
                List<MessageModel> categories = Settings.mongoUtility.executeQeuryForData<MessageModel>(filter, null, "adminmessages", ref totalRows);
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

        public static string DeleteMessage(string id, UserModel user)
        {

            if (!string.IsNullOrWhiteSpace(id))
            {
                try
                {
                    FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id)
                                                               & new FilterDefinitionBuilder<BsonDocument>().Eq("_id", id);

                    Settings.mongoUtility.executeQueryForDeleteOne(filter, "adminmessages");
                    return ResponseModel.getResponse(true, "Message deleted successfully", null);
                }
                catch (Exception e)
                {
                    Logger.Log(e);
                }
            }
            return null;
        }
        internal static string UpdateMessage(MessageModel message, UserModel user)
        {
            if (message != null && !string.IsNullOrWhiteSpace(message.Message)
                && !string.IsNullOrWhiteSpace(message.MessageTitle) && message.Expiry != null)
            {
                try
                {
                    FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id)
                                                               & new FilterDefinitionBuilder<BsonDocument>().Eq("_id", message.Id);
                    BsonDocument doc = new BsonDocument {                          
                            {"message_title", message.MessageTitle},
                            {"message", message.Message},
                            {"expiry", message.Expiry},
                            {"created_date",DateTime.UtcNow }
                        };
                    Settings.mongoUtility.executeQeuryForUpdateOne("adminmessages",doc,filter);
                    return ResponseModel.getResponse(true, "Message added successfully", null);
                }
                catch (Exception e)
                {
                    Logger.Log(e);
                }
            }
            return null;
        }

        internal static string AddMessage(MessageModel message, UserModel user)
        {
            if (message != null && !string.IsNullOrWhiteSpace(message.Message)
                && !string.IsNullOrWhiteSpace(message.MessageTitle) && message.Expiry != null)
            {
                try
                {
                    message.Id = Guid.NewGuid().ToString();
                    message.CreateOn = DateTime.UtcNow;
                    message.AccountId = user._id;
                    Settings.mongoUtility.executeQeuryForInsert<MessageModel>(new List<MessageModel>() { message }, "adminmessages");
                    return ResponseModel.getResponse(true, "Message added successfully", null);
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
