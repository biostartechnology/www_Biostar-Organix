using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AdminConsole.Service
{
    public class PluginService
    {
        internal static object GetPlugins(UserModel user)
        {
            try
            {
                FilterDefinition<PluginModel> filter = new FilterDefinitionBuilder<PluginModel>().Eq("account_id", user._id);
                long totalRows = 0;
                List<PluginModel> categories = Settings.mongoUtility.executeQeuryForData<PluginModel>(filter, null, "adminplugins", ref totalRows);
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

        public static string DeletePlugin(string id, UserModel user)
        {

            if (!string.IsNullOrWhiteSpace(id))
            {
                try
                {
                    FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id)
                                                               & new FilterDefinitionBuilder<BsonDocument>().Eq("_id", id);

                    Settings.mongoUtility.executeQueryForDeleteOne(filter, "adminplugins");
                    return ResponseModel.getResponse(true, "Plugin deleted successfully", null);
                }
                catch (Exception e)
                {
                    Logger.Log(e);
                }
            }
            return null;
        }
        internal static string UpdatePlugin(PluginModel Plugin, UserModel user)
        {
            if (Plugin != null && !string.IsNullOrWhiteSpace(Plugin.Script)
                && !string.IsNullOrWhiteSpace(Plugin.Description))
            {
                try
                {
                    FilterDefinition<BsonDocument> filter = new FilterDefinitionBuilder<BsonDocument>().Eq("account_id", user._id)
                                                               & new FilterDefinitionBuilder<BsonDocument>().Eq("_id", Plugin.Id);
                    BsonDocument doc = new BsonDocument {
                            {"description", Plugin.Description},
                            {"script", Plugin.Script},
                            {"created_date",DateTime.UtcNow }
                        };
                    Settings.mongoUtility.executeQeuryForUpdateOne("adminplugins", doc, filter);
                    return ResponseModel.getResponse(true, "Plugin added successfully", null);
                }
                catch (Exception e)
                {
                    Logger.Log(e);
                }
            }
            return null;
        }

        internal static string AddPlugin(PluginModel Plugin, UserModel user)
        {
            if (Plugin != null && !string.IsNullOrWhiteSpace(Plugin.Script)
                  && !string.IsNullOrWhiteSpace(Plugin.Description))
            {
                try
                {
                    Plugin.Id = Guid.NewGuid().ToString();
                    Plugin.CreateOn = DateTime.UtcNow;
                    Plugin.AccountId = user._id;
                    Settings.mongoUtility.executeQeuryForInsert<PluginModel>(new List<PluginModel>() { Plugin }, "adminplugins");
                    return ResponseModel.getResponse(true, "Plugin added successfully", null);
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
