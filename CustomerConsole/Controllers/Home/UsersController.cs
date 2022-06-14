using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CustomerConsole.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonModel;

namespace CustomerConsole.Controllers.Home
{

    [Route("api/[controller]")]
    [ApiController]
    [AuthenticateUser]
    public class UsersController : ControllerBase
    {
        [HttpPost]
        public string Post()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            UserModel data = CommonUtility.Utility.GetDataFromBody<UserModel>(HttpContext);
            if (user != null  && data != null)
            {
                return UserService.UpdateProfile(user._id, data);
            }
            return null;
        }
     
    }
}
