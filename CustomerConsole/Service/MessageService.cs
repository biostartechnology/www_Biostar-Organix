using CommonModel;
using CommonUtility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace CustomerConsole.Service
{
    public class MessageService
    {
        internal static object GetMessages()
        {
            try
            {
                long totalRows = 0;
                List<MessageModel> mesg = Settings.mongoUtility.executeQeuryForData<MessageModel>("{}", null, "adminmessages", ref totalRows);
                if (mesg != null)
                {
                    return JsonConvert.SerializeObject(mesg);
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
