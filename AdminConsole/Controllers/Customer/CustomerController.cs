using AdminConsole.Service;
using CommonModel;
using CommonUtility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminConsole.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        [HttpPut]
        public object Put()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            dynamic data = Utility.GetDataFromBody<dynamic>(HttpContext);
            if (user != null && data !=null)
            {
                return CustomerService.UpdateGroup(data.groupId.ToString(), data.id.ToString(), user);
            }
            return null;
        }

        [HttpPost]
        public object Post()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            GridModel data = Utility.GetDataFromBody<GridModel>(HttpContext);
            if (user != null && data!=null)
            {
                return CustomerService.GetUsers(data, user);

            }
            return null;
        }
    }
}
