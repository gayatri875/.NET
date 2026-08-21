using ECommerce.Models;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ShippingController : ControllerBase
    {
        private readonly ShippingService _shippingService;

        public ShippingController(ShippingService shippingService)
        {
            _shippingService = shippingService;
        }

        // ==========================================
        // GET ALL SHIPPING
        // ADMIN ONLY
        // GET: api/Shipping
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var shipping =
                await _shippingService.GetAllAsync();

            return Ok(shipping);
        }


        // ==========================================
        // GET SHIPPING BY ID
        // CUSTOMER + ADMIN
        // GET: api/Shipping/1
        // ==========================================
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var shipping =
                await _shippingService.GetByIdAsync(id);

            if (shipping == null)
            {
                return NotFound(new
                {
                    message = "Shipping record not found."
                });
            }

            return Ok(shipping);
        }


        // ==========================================
        // GET SHIPPING BY ORDER
        // CUSTOMER + ADMIN
        // GET: api/Shipping/order/1
        // ==========================================
        [HttpGet("order/{orderId:int}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            var shipping =
                await _shippingService
                    .GetByOrderIdAsync(orderId);

            if (shipping == null)
            {
                return NotFound(new
                {
                    message =
                        "Shipping record not found for this order."
                });
            }

            return Ok(shipping);
        }


        // ==========================================
        // CREATE SHIPPING
        // ADMIN ONLY
        // POST: api/Shipping
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            Shipping shipping)
        {
            var createdShipping =
                await _shippingService
                    .CreateAsync(shipping);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdShipping.Id },
                createdShipping);
        }


        // ==========================================
        // UPDATE SHIPPING
        // ADMIN ONLY
        // PUT: api/Shipping/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            int id,
            Shipping shipping)
        {
            var updatedShipping =
                await _shippingService
                    .UpdateAsync(id, shipping);

            if (updatedShipping == null)
            {
                return NotFound(new
                {
                    message =
                        "Shipping record not found."
                });
            }

            return Ok(updatedShipping);
        }


        // ==========================================
        // DELETE SHIPPING
        // ADMIN ONLY
        // DELETE: api/Shipping/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted =
                await _shippingService
                    .DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message =
                        "Shipping record not found."
                });
            }

            return Ok(new
            {
                message =
                    "Shipping deleted successfully."
            });
        }
    }
}