using AdminConsole.Service;
using CommonModel;
using CommonUtility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminConsole.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkUpController : ControllerBase
    {
        [HttpGet]
        public object Get()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return MarkUpService.GetMarkUpHistory(user);

            }
            return null;
        }

        [HttpPut]
        public object Put()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            MarkUpModel data = Utility.GetDataFromBody<MarkUpModel>(HttpContext);
            if (user != null && data != null)
            {
                return MarkUpService.AddMarkUp(data, user);

            }
            return null;
        }
    }
}
