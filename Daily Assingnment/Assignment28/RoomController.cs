using _12Aug.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _12Aug.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;
        public RoomController(ApplicationDbcontext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetRooms(int hotelId)
        {
            var rooms = _context.Rooms.Where(r => r.HotelId == hotelId).ToList();
            return Ok(rooms);
        }

    }
}
