using ECommerce.Models;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReturnController : ControllerBase
    {
        private readonly ReturnService _returnService;

        public ReturnController(ReturnService returnService)
        {
            _returnService = returnService;
        }

        // ==========================================
        // GET ALL RETURNS
        // ADMIN ONLY
        // GET: api/Return
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var returns =
                await _returnService.GetAllAsync();

            return Ok(returns);
        }


        // ==========================================
        // GET RETURN BY ID
        // CUSTOMER + ADMIN
        // GET: api/Return/1
        // ==========================================
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var returnRequest =
                await _returnService.GetByIdAsync(id);

            if (returnRequest == null)
            {
                return NotFound(new
                {
                    message = "Return request not found."
                });
            }

            return Ok(returnRequest);
        }


        // ==========================================
        // GET RETURNS BY ORDER
        // CUSTOMER + ADMIN
        // GET: api/Return/order/1
        // ==========================================
        [HttpGet("order/{orderId:int}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            var returns =
                await _returnService.GetByOrderIdAsync(orderId);

            return Ok(returns);
        }


        // ==========================================
        // CREATE RETURN
        // CUSTOMER + ADMIN
        // POST: api/Return
        // ==========================================
        [HttpPost]
        public async Task<IActionResult> Create(
            Return returnRequest)
        {
            var createdReturn =
                await _returnService.CreateAsync(
                    returnRequest);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdReturn.Id },
                createdReturn);
        }


        // ==========================================
        // UPDATE RETURN
        // ADMIN ONLY
        // PUT: api/Return/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            int id,
            Return returnRequest)
        {
            var updatedReturn =
                await _returnService.UpdateAsync(
                    id,
                    returnRequest);

            if (updatedReturn == null)
            {
                return NotFound(new
                {
                    message = "Return request not found."
                });
            }

            return Ok(updatedReturn);
        }


        // ==========================================
        // DELETE RETURN
        // ADMIN ONLY
        // DELETE: api/Return/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted =
                await _returnService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Return request not found."
                });
            }

            return Ok(new
            {
                message =
                    "Return request deleted successfully."
            });
        }
    }
}