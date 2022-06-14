using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AdminConsole.Service;
using CommonModel;
using CommonUtility;

namespace AdminConsole.Controllers.Home
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        [HttpPut]
        public string Put()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            OrderModel data = Utility.GetDataFromBody<OrderModel>(HttpContext);
            if (user != null && data != null)
            {
                return OrderService.UpdateOrderStatus(user, data.JobId, data.OrderStatus,data.Index);
            }
            return null;
        }

        [HttpPut]
        [Route("/cancel")]
        public string Cancel()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            OrderModel data = Utility.GetDataFromBody<OrderModel>(HttpContext);
            if (user != null && data != null)
            {
                return OrderService.CancelOrder(user, data);
            }
            return null;
        }

        [HttpPost]
        [Route("GetOrders")]
        public string GetData(GridModel grid)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && grid != null)
            {
                return OrderService.GetOrders(grid, user);
            }
            return null;
        }

    }
}
