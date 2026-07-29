using _29July_Assignment.Models;
using _29July_Assignment.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _29July_Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        // GET: api/Vehicle
        [HttpGet]
        public IActionResult GetAllVehicles()
        {
            return Ok(_vehicleService.GetAllVehicles());
        }

        // GET: api/Vehicle/1
        [HttpGet("{id}")]
        public IActionResult GetVehicleById(int id)
        {
            var vehicle = _vehicleService.GetVehicleById(id);

            if (vehicle == null)
                return NotFound("Vehicle not found.");

            return Ok(vehicle);
        }

        // POST: api/Vehicle
        [HttpPost]
        public IActionResult AddVehicle([FromBody] Vehicle vehicle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _vehicleService.AddVehicle(vehicle);
            return Ok("Vehicle added successfully.");
        }

        // PUT: api/Vehicle/1
        [HttpPut("{id}")]
        public IActionResult UpdateVehicle(int id, [FromBody] Vehicle vehicle)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _vehicleService.UpdateVehicle(id, vehicle);

            if (!result)
                return NotFound("Vehicle not found.");

            return Ok("Vehicle updated successfully.");
        }

        // DELETE: api/Vehicle/1
        [HttpDelete("{id}")]
        public IActionResult DeleteVehicle(int id)
        {
            var result = _vehicleService.DeleteVehicle(id);

            if (!result)
                return NotFound("Vehicle not found.");

            return Ok("Vehicle deleted successfully.");
        }
    }
}
