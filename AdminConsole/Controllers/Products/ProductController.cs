using CommonModel;
using AdminConsole.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using CommonUtility;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AdminConsole.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpPost]
        public string Post()
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            ProductModel data = Utility.GetDataFromBody<ProductModel>(HttpContext);
            if (user != null && data != null)
            {
                return ProductService.AddProduct(data, user);
            }
            return null;
        }


        [HttpDelete]
        [Route("{id}")]
        public bool Delete(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            if (user != null && !string.IsNullOrWhiteSpace(id))
            {
                return ProductService.DeleteProduct(id, user);
            }
            return false;
        }



        [HttpPost]
        [Route("GetProducts/{id}")]
        public string Get(string id)
        {
            UserModel user = AuthenticateUser.GetUserDetailsFromSession();
            GridModel data = Utility.GetDataFromBody<GridModel>(HttpContext);
            if (user != null && data != null)
            {
                return ProductService.GetProducts(data,id, user);
            }
            return null;
        }

    }
}
