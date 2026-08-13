using _12Aug.Data;
using _12Aug.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _12Aug.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;

        public BookingController(ApplicationDbcontext context)
        {
            _context = context;

        }

        [HttpPost]
        public IActionResult BookRooms(Booking Booking)
        {
            _context.Bookings.Add(Booking);
            _context.SaveChanges();
            return Ok(Booking);
        }
    }
}
