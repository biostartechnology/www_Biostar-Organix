using CommonModel;
using CommonUtility;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace CustomerConsole.Service
{
    public class CouponService
    {
        internal static string GetCouponDetails(string id, UserModel user)
        {
            try
            {
                FilterDefinition<CouponModel> filter = new FilterDefinitionBuilder<CouponModel>().Eq("account_id", user._id);
                long totalRows = 0;
                List<CouponModel> couponDetails = Settings.mongoUtility.executeQeuryForData<CouponModel>(filter, null, "orders", ref totalRows);
                if (couponDetails != null && couponDetails.Count > 0)
                {
                    return JsonConvert.SerializeObject(couponDetails[0]);
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
