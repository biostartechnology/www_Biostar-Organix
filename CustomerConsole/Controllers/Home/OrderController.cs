using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CustomerConsole.Service;
using CommonModel;
using CommonUtility;

namespace CustomerConsole.Controllers.Home
{
    [Route("api/[controller]")]
    [ApiController]
    [AuthenticateUser]
    public class OrderController : ControllerBase
    {

        [HttpPut]
        [Route("status")]
        public string UpdateStatus()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            CartModel data = Utility.GetDataFromBody<CartModel>(HttpContext);
            if (user != null && data != null)
            {
                return OrderService.UpdateCartStatus(user, data.Id, data.OrderStatus);
            }
            return null;
        }


        [HttpGet]
        [Route("{id}")]
        public string Get(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && !string.IsNullOrWhiteSpace(id))
            {
                return OrderService.GetOrderDetail(id, user);
            }
            return null;
        }


        [HttpPost]
        public string GetData(GridModel grid)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && grid != null)
            {
                return OrderService.GetOrders(grid, user);
            }
            return null;
        }

        [HttpPost]
        [Route("artwork")]
        public string GetArtWorkData()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return OrderService.GetOrdersAwaitingArtWork(user);
            }
            return null;
        }

        [HttpPut]
        [Route("artwork")]
        public string UpdateArtWork()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            OrderModel data = Utility.GetDataFromBody<OrderModel>(HttpContext);
            if (user != null && data != null)
            {
                return OrderService.UpdateArtwork(user, data);
            }
            return null;
        }


    }
}
