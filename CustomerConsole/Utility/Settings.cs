using CommonUtility;
using Microsoft.Extensions.Configuration;
using StorageUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace CustomerConsole
{
    public class Settings
    {
        public static string MongoConnectionString;
        public static int MaxConnectionPool;
        public static int MaxWaitQueueSize;
        public static MongoDbUtility mongoUtility;
        public static bool UseConnectionPooling;
        public static string Mongdbname;
        public static string ReadNodeTagName;
        public static IConfigurationSection _configuration;
        public static string EmailUsername;
        public static string EmailPassword;
        public static string EmailFrom;
        public static int EmailPort;
        public static string EmailSmtpHost;
        public static string BaseUrl;
        public static string IpDetailsURL;
        public static string BccEmailAddress;
        public static string notifyEmailAddress;
        public static MailUtility mailUtility;
        public static string PayPalURL;
        public static string HMACSecret;
        public static string PayPalClientId;
        public static string PayPalAppSecret;
        public static FTPUtility FTPService;
        public static string FTPPath;
        public static string FTPUserName;
        public static string FTPPassword;
        public static string FTPDownloadPath;
        public Settings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("AppSettings");
            MongoConnectionString = ReadStringValueFromConfig("MongoConnectionString", "mongodb://127.0.0.1:27017");
            MaxConnectionPool = ReadIntValueFromConfig("MaxConnectionPool", 100);
            MaxWaitQueueSize = ReadIntValueFromConfig("MaxWaitQueueSize", 500);
            UseConnectionPooling = ReadBooleanValueFromConfig("UseConnectionPooling", false);
            Mongdbname = ReadStringValueFromConfig("Mongdbname", "lasignsdb");
            ReadNodeTagName = ReadStringValueFromConfig("ReadNodeTagName", "ELECTABLE");
            EmailUsername = ReadStringValueFromConfig("EmailUsername", "contact@nlshelp.com");
            EmailPassword = ReadStringValueFromConfig("EmailPassword", "smurvkduoaynexrh");
            EmailFrom = ReadStringValueFromConfig("EmailFrom", "contact@nlshelp.com");
            EmailPort = ReadIntValueFromConfig("EmailPort", 587);
            EmailSmtpHost = ReadStringValueFromConfig("EmailSmtpHost", "smtp.gmail.com");
            BaseUrl = ReadStringValueFromConfig("BaseUrl", "https://localhost:44342");
            IpDetailsURL = ReadStringValueFromConfig("IpDetailsURL", "https://api.ipregistry.co/{0}?key=uf27y7o4azyh7z");
            HMACSecret = ReadStringValueFromConfig("HMACSecret", "dc5264a38ed2ed059e7f260f0145806e56c909da6941e00d757f9febc91750ae");
            PayPalURL = ReadStringValueFromConfig("PayPalURL", "https://api-m.sandbox.paypal.com");
            PayPalAppSecret = ReadStringValueFromConfig("PayPalAppSecret", "EJB0dlth5FrsJRKr4DH2idRU7uH1Aqi6yPiRJmIc5kXh-6Gdn9GYwDLuBL1CDXZDNn0x0SIqFqOr0y7p");
            PayPalClientId = ReadStringValueFromConfig("PayPalClientId", "Ac-KXrKpxm4ML8sLWjb8x5RsZIcz3_RIs5oUAkU4rEpUAp_eIW0SsMeJQkx6koV4YOmxP0Y02rdbmnmC");
            FTPPath = ReadStringValueFromConfig("FTPPath", "ftp://127.0.0.1");
            FTPUserName = ReadStringValueFromConfig("FTPUserName", "");
            FTPPassword = ReadStringValueFromConfig("FTPPassword", "");
            FTPDownloadPath = ReadStringValueFromConfig("FTPDownloadPath", "http://localhost/");

            PaypalService.PayPalAppSecret = PayPalAppSecret;
            PaypalService.PayPalURL = PayPalURL;
            PaypalService.PayPalClientId = PayPalClientId;
            FTPService = new FTPUtility(FTPUserName, FTPPassword, FTPPath);
            mongoUtility = new MongoDbUtility();
            mongoUtility.SetMongoConnectionSettings(Settings.MongoConnectionString, Settings.MaxConnectionPool,
                                                        Settings.MaxWaitQueueSize, Settings.ReadNodeTagName,
                                                        Settings.Mongdbname, Settings.UseConnectionPooling);
            BccEmailAddress = ReadStringValueFromConfig("BccEmailAddress", "evelyne@nlstechnology.com,ulysses@nlstechnology.com");
            notifyEmailAddress = ReadStringValueFromConfig("notifyEmailAddress", "ulysses@nlstechnology.com,evelyne@nlstechnology.com,manasaprakash8@gmail.com");
            mailUtility = new MailUtility(EmailUsername, EmailPassword, EmailFrom, EmailPort, EmailSmtpHost);
        }



        private static bool ReadBooleanValueFromConfig(string name, bool defaultVal)
        {
            try
            {
                string val = ReadStringValueFromConfig(name, "");
                if (!string.IsNullOrWhiteSpace(val))
                {
                    return bool.Parse(val);
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return defaultVal;
        }


        private static int ReadIntValueFromConfig(string name, int defaultVal)
        {
            try
            {
                string val = ReadStringValueFromConfig(name, "");
                if (!string.IsNullOrWhiteSpace(val))
                {
                    return int.Parse(val);
                }

            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return defaultVal;
        }

        private static string ReadStringValueFromConfig(string name, string defaultVal)
        {
            try
            {
                string val = _configuration.GetSection(name).Value;
                if (!string.IsNullOrWhiteSpace(val))
                {
                    return val;
                }
            }
            catch (Exception e)
            {
                Logger.Log(e);
            }
            return defaultVal;
        }
    }

}
