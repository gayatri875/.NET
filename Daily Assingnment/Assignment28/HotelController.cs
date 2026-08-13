using _12Aug.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _12Aug.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;
        public HotelController (ApplicationDbcontext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult AvialableHotels()
        {
            var hotels = _context.Hotels.ToList();
            return Ok(hotels);

        }
    }
}
