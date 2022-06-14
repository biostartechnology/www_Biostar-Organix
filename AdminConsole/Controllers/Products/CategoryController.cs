using AdminConsole.Service;
using CommonModel;
using CommonUtility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdminConsole.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        [HttpPost]
        public object Post()
        {
            CategoryModel data  = Utility.GetDataFromBody<CategoryModel>(HttpContext);
            UserModel user =  AuthenticateUser.GetUserDetailsFromSession();
            if(user!= null && data!=null)
            {
                return CategoryService.AddCategory(data, user);
            }
            return null;
        }

        [HttpGet]
        public object Get()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null)
            {
                return CategoryService.GetCategories(user);

            }
            return null;
        }
    }
}
