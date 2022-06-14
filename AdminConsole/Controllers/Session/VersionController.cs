using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AdminConsole.Controllers.Session
{
    [Route("api/[controller]")]
    [ApiController]
    [AuthenticateUser]
    public class VersionController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            string d = HttpContext.Session.GetString("testt");
            HttpContext.Session.SetString("testt","hello");
            return "1";
        }

    }
}
