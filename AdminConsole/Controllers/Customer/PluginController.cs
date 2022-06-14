using AdminConsole.Service;
using CommonModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminConsole.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class PluginController : ControllerBase
    {

        [HttpPost]
        public object Post(PluginModel data)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && data != null)
            {
                return PluginService.AddPlugin(data, user);
            }
            return null;
        }

        [HttpDelete]
        public object Delete(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && !string.IsNullOrWhiteSpace(id))
            {
                return PluginService.DeletePlugin(id, user);
            }
            return null;
        }

        [HttpGet]
        public object Get()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return PluginService.GetPlugins(user);

            }
            return null;
        }
    }
}
