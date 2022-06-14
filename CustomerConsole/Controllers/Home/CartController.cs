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
    public class CartController : ControllerBase
    {

        [HttpPut]
        public string Put()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            CartModel data = Utility.GetDataFromBody<CartModel>(HttpContext);
            if (user != null && data != null)
            {
                return CartService.AddItemToCart(user, data);
            }
            return null;
        }


        [HttpGet]
        [Route("count")]
        public long Get()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return CartService.GetItemsCountInCart(user);
            }
            return 0;
        }

       
        [HttpPut]
        [Route("status")]
        public string UpdateStatus()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            CartModel data = Utility.GetDataFromBody<CartModel>(HttpContext);
            if (user != null && data != null)
            {
                return CartService.UpdateCartItemStatus(user, data.Id, data.CartStatus);
            }
            return null;
        }

        [HttpPut]
        [Route("orderCount")]
        public string UpdateOrderCount()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            CartModel data = Utility.GetDataFromBody<CartModel>(HttpContext);
          
            if (user != null && !string.IsNullOrWhiteSpace(data.Id))
            {
                return CartService.UpdateCartItemCount(user, data);
            }
            return null;
        }


        [HttpPut]
        [Route("createOrder")]
        public string CreateOrder()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return CartService.CreateOrder(user);
            }
            return null;
        }

        [HttpPut]
        [Route("captureOrder/{id}")]
        public string CaptureOrder(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return CartService.CaptureOrder(id, user);
            }
            return null;
        }

        [HttpPut]
        [Route("pickup")]
        public string UpdatePickUp()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            CartModel data = Utility.GetDataFromBody<CartModel>(HttpContext);
            if (user != null && data != null)
            {
                return CartService.UpdateCartItemPickup(user, data.Id, data.DeliveryType);
            }
            return null;
        }

        [HttpPut]
        [Route("delete")]
        public string Delete(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            CartModel data = Utility.GetDataFromBody<CartModel>(HttpContext);
            if (user != null && data != null)
            {
                return CartService.DeleteCartItem(user, data.Id);
            }
            return null;
        }

        [HttpPost]
        public string GetData(GridModel grid)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && grid != null)
            {
                return CartService.GetCartItems(grid, user);
            }
            return null;
        }
    }
}
