using AdminConsole.Service;
using CommonModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminConsole.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        [HttpPost]
        public object Post(MessageModel data)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && data != null)
            {
                return MessageService.AddMessage(data, user);
            }
            return null;
        }

        [HttpDelete]
        public object Delete(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && !string.IsNullOrWhiteSpace(id) )
            {
                return MessageService.DeleteMessage(id, user);
            }
            return null;
        }

        [HttpGet]
        public object Get()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return MessageService.GetMessages(user);

            }
            return null;
        }
    }
}
