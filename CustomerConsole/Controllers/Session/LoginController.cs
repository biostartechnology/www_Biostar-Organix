using CommonModel;
using CommonUtility;
using CustomerConsole.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CustomerConsole.Controllers.Session
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // POST api/<LoginController>
        [HttpPost]
        public string Post()
        {
            UserModel value = Utility.GetDataFromBody<UserModel>(HttpContext);
            if (value != null)
            {
                HttpContext.Session.SetString("testt", "hello");
                return LoginService.ValidateLogin(value.EmailId, value.Password,HttpContext);
            }
            return null;
        }

       
        [HttpGet]
        [Route("verifyresetPswd/{id}")]
        public bool verifyresetPswd(string id)
        {
            if (!string.IsNullOrWhiteSpace(id))
            {
                return LoginService.IsValidResetRequest(id);
            }
            return false;
        }

        [HttpPost]
        [Route("setnewpassword")]
        public string setNewPassword()
        {
            ForgotPasswordModel value = Utility.GetDataFromBody<ForgotPasswordModel>(HttpContext);
            if (value != null)
            {
                return LoginService.SetNewPassword(value.Id, value.NewPassword);
            }
            return null;
        }


        [HttpPost]
        [Route("resetPswd")]
        public string resetPswd()
        {
            UserModel value = Utility.GetDataFromBody<UserModel>(HttpContext);
            if (value != null)
            {
                return LoginService.VerifyAccountAndSendResetMail(value.EmailId);
            }
            return null;
        }

        [HttpDelete]
        [Route("logout")]
        public string logout()
        {
            return AuthenticateUser.DeleteSession();
            
        }

    }


}
