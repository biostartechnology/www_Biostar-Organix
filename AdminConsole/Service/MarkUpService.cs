using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AdminConsole.Service
{
    public class MarkUpService
    {
        internal static object GetMarkUpHistory(UserModel user)
        {
            try
            {
                FilterDefinition<MarkUpModel> filter = new FilterDefinitionBuilder<MarkUpModel>().Eq("account_id", user._id);
                long totalRows = 0;
                List<MarkUpModel> categories = Settings.mongoUtility.executeQeuryForData<MarkUpModel>(filter, null, "markuphistory", ref totalRows);
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

        internal static string AddMarkUp(MarkUpModel markup, UserModel user)
        {
            if (markup != null)
            {
                try
                {

                    markup.Id = Guid.NewGuid().ToString();
                    markup.AccountId = user._id;
                    markup.CreateOn = DateTime.UtcNow;
                    Settings.mongoUtility.executeQeuryForInsert<MarkUpModel>(new List<MarkUpModel> { markup }, "markuphistory");

                    ProductService.UpdateProductPrice(markup, user);

                    return ResponseModel.getResponse(true, "Updated markup value successfully", null);
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
