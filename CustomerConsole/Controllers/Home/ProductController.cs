using CommonModel;
using CustomerConsole.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using CommonUtility;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CustomerConsole.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpPost]
        public string Get()
        {
            ProductGridModel data = Utility.GetDataFromBody<ProductGridModel>(HttpContext);
            if (data != null)
            {
                return ProductService.GetProducts(data);
            }
            return null;
        }
    }
}
