using CommonModel;
using CustomerConsole.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerConsole.Controllers.Home
{
    [Route("api/[controller]")]
    [ApiController]
    [AuthenticateUser]
    public class CouponController : ControllerBase
    {
        [HttpPost]
        public string Get(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && !string.IsNullOrWhiteSpace(id))
            {
                return CouponService.GetCouponDetails(id, user);
            }
            return null;
        }
    }
}
