using _12Aug.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _12Aug.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbcontext _context;

        public CustomerController(ApplicationDbcontext context)
        {
            _context = context;

        }

        [HttpGet("{customerId}/bookings")]
        public IActionResult GetBookings(int customerId)
        {
            var bookings = _context.Bookings.Where(b => b.CustomerId == customerId).ToList();
            return Ok(bookings);
        }
    }
}
