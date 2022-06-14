using CustomerConsole.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerConsole.Controllers.Home
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        [HttpGet]
        public object Get()
        {
            return MessageService.GetMessages();
        }
    }
}
