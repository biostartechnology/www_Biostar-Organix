using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AdminConsole.Service
{
    public class GroupService
    {
        internal static object GetGroups(UserModel user)
        {
            try
            {
                FilterDefinition<GroupModel> filter = new FilterDefinitionBuilder<GroupModel>().Eq("account_id", user._id);
                long totalRows = 0;
                List<GroupModel> groups = Settings.mongoUtility.executeQeuryForData<GroupModel>(filter, null, "groups", ref totalRows);
                if (groups != null)
                {
                    return JsonConvert.SerializeObject(new { rows = groups, totalRows = totalRows });
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return null;
        }

        internal static string DeleteGroup(string id, UserModel user)
        {
            if (!string.IsNullOrWhiteSpace(id))
            {
                try
                {
                    FilterDefinition<UserModel> filter = new FilterDefinitionBuilder<UserModel>().Ne("group_id", id);

                    if (Settings.mongoUtility.executeQeuryForCount<UserModel>(filter, "groups") == 0)
                    {
                        BsonDocument filter1 = new BsonDocument() { { "_id", id } };
                        Settings.mongoUtility.executeQueryForDeleteOne(filter1, "groups");
                        return ResponseModel.getResponse(true, "Group deleted successfully", null);
                    }
                    else
                    {
                        return ResponseModel.getResponse(false, "Users are assigned to this group. Cannot be deleted.", null);
                    }
                }
                catch (Exception e)
                {
                    Logger.Log(e);
                }
            }
            return null;
        }

        internal static string UpdateGroup(GroupModel group, UserModel user)
        {
            if (group != null && !string.IsNullOrWhiteSpace(group.GroupName) && user.UserType == "Admin")
            {
                try
                {
                    FilterDefinition<GroupModel> filter = new FilterDefinitionBuilder<GroupModel>().Eq("group_name", group.GroupName)
                                                            & new FilterDefinitionBuilder<GroupModel>().Eq("account_id", user._id)
                                                             & new FilterDefinitionBuilder<GroupModel>().Ne("_id", group.Id);

                    if (Settings.mongoUtility.executeQeuryForCount<GroupModel>(filter, "groups") == 0)
                    {
                        BsonDocument filter1 = new BsonDocument() { { "_id", group.Id } };
                        BsonDocument doc = group.ToBsonDocument();
                        doc.Remove("_id");
                        Settings.mongoUtility.executeQeuryForUpdateOne("groups", doc, filter1);
                        return ResponseModel.getResponse(true, "Group updated successfully", null);
                    }
                    else
                    {
                        return ResponseModel.getResponse(false, "Group with same already exist", null);
                    }
                }
                catch (Exception e)
                {
                    Logger.Log(e);
                }
            }
            return null;
        }

        internal static string AddGroup(GroupModel group, UserModel user)
        {
            if (group != null && !string.IsNullOrWhiteSpace(group.GroupName))
            {
                if (!string.IsNullOrWhiteSpace(group.Id))
                {
                    return UpdateGroup(group, user);
                }
                else
                {
                    try
                    {
                        FilterDefinition<GroupModel> filter = new FilterDefinitionBuilder<GroupModel>().Eq("group_name", group.GroupName)
                                                                & new FilterDefinitionBuilder<GroupModel>().Eq("account_id", user._id);
                        if (Settings.mongoUtility.executeQeuryForCount<GroupModel>(filter, "groups") == 0)
                        {

                            group.Id = Guid.NewGuid().ToString();
                            group.CreateOn = DateTime.UtcNow;
                            group.AccountId = user._id;
                            Settings.mongoUtility.executeQeuryForInsert<GroupModel>(new List<GroupModel>() { group }, "groups");
                            return ResponseModel.getResponse(true, "Group added successfully", null);
                        }
                        else
                        {
                            return ResponseModel.getResponse(false, "Group with same already exist", null);
                        }
                    }
                    catch (Exception e)
                    {
                        Logger.Log(e);
                    }
                }
            }
            return null;
        }
    }
}
