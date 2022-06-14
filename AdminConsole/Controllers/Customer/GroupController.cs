using AdminConsole.Service;
using CommonModel;
using CommonUtility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminConsole.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        [HttpPut]
        public object Put()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            GroupModel data = Utility.GetDataFromBody<GroupModel>(HttpContext);
            if (user != null && data !=null)
            {
                return GroupService.UpdateGroup(data, user);
            }
            return null;
        }

        [HttpGet]
        public object Get()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            GridModel data = Utility.GetDataFromBody<GridModel>(HttpContext);
            if (user != null)
            {
                return GroupService.GetGroups(user);

            }
            return null;
        }

        [HttpPost]
       
        public object Post()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            GroupModel data = Utility.GetDataFromBody<GroupModel>(HttpContext);
            if (user != null && data!=null )
            {
                return GroupService.AddGroup(data, user);
            }
            return null;
        }

        [HttpDelete]
        public object Delete(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return GroupService.DeleteGroup(id, user);

            }
            return null;
        }
    }
}
