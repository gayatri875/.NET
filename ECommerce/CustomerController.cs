using ECommerce.DTOs.Customer;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;

        public CustomerController(
            CustomerService customerService)
        {
            _customerService = customerService;
        }

        // =========================================
        // GET: api/Customer
        // ADMIN ONLY
        // =========================================
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers =
                await _customerService.GetAllAsync();

            return Ok(customers);
        }

        // =========================================
        // GET: api/Customer/{id}
        // ADMIN ONLY
        // =========================================
        [Authorize(Roles = "Admin")]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var customer =
                await _customerService.GetByIdAsync(id);

            if (customer == null)
            {
                return NotFound(new
                {
                    message = "Customer not found."
                });
            }

            return Ok(customer);
        }

        // =========================================
        // GET: api/Customer/me
        // LOGGED-IN CUSTOMER
        // =========================================
        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userIdClaim =
                User.FindFirst(
                    ClaimTypes.NameIdentifier
                );

            if (userIdClaim == null ||
                !int.TryParse(
                    userIdClaim.Value,
                    out int userId))
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid or missing user ID."
                });
            }

            var customer =
                await _customerService
                    .GetByUserIdAsync(userId);

            if (customer == null)
            {
                return NotFound(new
                {
                    message =
                        "Customer profile not found."
                });
            }

            return Ok(customer);
        }

        // =========================================
        // POST: api/Customer
        // ADMIN ONLY
        // =========================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateCustomerRequest request)
        {
            var customer =
                await _customerService
                    .AddAsync(request);

            return CreatedAtAction(
                nameof(GetById),
                new { id = customer.Id },
                customer
            );
        }

        // =========================================
        // POST: api/Customer/me
        // CUSTOMER - CREATE OWN PROFILE
        // =========================================
        [HttpPost("me")]
        public async Task<IActionResult> CreateMyProfile(
            CreateMyCustomerProfileRequest request)
        {
            var userIdClaim =
                User.FindFirst(
                    ClaimTypes.NameIdentifier
                );

            if (userIdClaim == null ||
                !int.TryParse(
                    userIdClaim.Value,
                    out int userId))
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid or missing user ID."
                });
            }

            var existing =
                await _customerService
                    .GetByUserIdAsync(userId);

            if (existing != null)
            {
                return Conflict(new
                {
                    message =
                        "Customer profile already exists."
                });
            }

            var customer =
                await _customerService
                    .CreateMyProfileAsync(
                        userId,
                        request
                    );

            return CreatedAtAction(
                nameof(GetMyProfile),
                null,
                customer
            );
        }

        // =========================================
        // PUT: api/Customer/{id}
        // ADMIN ONLY
        // =========================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateCustomerRequest request)
        {
            var customer =
                await _customerService
                    .UpdateAsync(
                        id,
                        request
                    );

            if (customer == null)
            {
                return NotFound(new
                {
                    message =
                        "Customer not found."
                });
            }

            return Ok(customer);
        }

        // =========================================
        // PUT: api/Customer/me
        // CUSTOMER - UPDATE OWN PROFILE
        // =========================================
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMyProfile(
            UpdateMyCustomerProfileRequest request)
        {
            var userIdClaim =
                User.FindFirst(
                    ClaimTypes.NameIdentifier
                );

            if (userIdClaim == null ||
                !int.TryParse(
                    userIdClaim.Value,
                    out int userId))
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid or missing user ID."
                });
            }

            var customer =
                await _customerService
                    .UpdateMyProfileAsync(
                        userId,
                        request
                    );

            if (customer == null)
            {
                return NotFound(new
                {
                    message =
                        "Customer profile not found."
                });
            }

            return Ok(customer);
        }

        // =========================================
        // DELETE: api/Customer/{id}
        // ADMIN ONLY
        // =========================================
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted =
                await _customerService
                    .DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message =
                        "Customer not found."
                });
            }

            return Ok(new
            {
                message =
                    "Customer deleted successfully."
            });
        }
    }
}