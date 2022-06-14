using CommonModel;
using CommonUtility;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace CustomerConsole.Service
{
    public class CategoryService
    {
        internal static object GetCategories()
        {
            try
            {
                long totalRows = 0;
                List<CategoryModel> category = Settings.mongoUtility.executeQeuryForData<CategoryModel>("{}", null, "category", ref totalRows);
                if (category != null)
                {
                    return JsonConvert.SerializeObject( category);
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
