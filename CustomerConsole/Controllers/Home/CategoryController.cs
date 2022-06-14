using CustomerConsole.Service;
using CommonModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerConsole.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
      
        [HttpGet]
        public object Get()
        {
            return CategoryService.GetCategories();
        }
    }
}
