using ECommerce.DTOs.Cart;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;
        private readonly CustomerService _customerService;

        public CartController(
            CartService cartService,
            CustomerService customerService)
        {
            _cartService = cartService;
            _customerService = customerService;
        }

        // ==========================================
        // GET CART BY CUSTOMER
        // GET: api/Cart/customer/1
        // ==========================================
        [HttpGet("customer/{customerId:int}")]
        public async Task<IActionResult> GetByCustomerId(
            int customerId)
        {
            if (!await IsCustomerAllowed(customerId))
            {
                return Forbid();
            }

            var cart =
                await _cartService
                    .GetByCustomerIdAsync(customerId);

            if (cart == null)
            {
                return Ok(new
                {
                    id = 0,
                    customerId = customerId,
                    items = new List<object>()
                });
            }

            return Ok(cart);
        }

        // ==========================================
        // GET CART BY ID
        // GET: api/Cart/1
        // ==========================================
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cart =
                await _cartService.GetByIdAsync(id);

            if (cart == null)
            {
                return NotFound(new
                {
                    message = "Cart not found."
                });
            }

            if (!await IsCustomerAllowed(cart.CustomerId))
            {
                return Forbid();
            }

            return Ok(cart);
        }

        // ==========================================
        // ADD TO CART
        // POST: api/Cart
        // ==========================================
        [HttpPost]
        public async Task<IActionResult> AddToCart(
            AddToCartRequest request)
        {
            if (request == null)
            {
                return BadRequest(new
                {
                    message = "Cart data is required."
                });
            }

            if (request.CustomerId <= 0)
            {
                return BadRequest(new
                {
                    message = "CustomerId is required."
                });
            }

            if (!await IsCustomerAllowed(request.CustomerId))
            {
                return Forbid();
            }

            try
            {
                var cart =
                    await _cartService
                        .AddToCartAsync(request);

                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        // ==========================================
        // UPDATE CART ITEM QUANTITY
        // PUT: api/Cart/{cartItemId}
        // ==========================================
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateQuantity(
            int id,
            UpdateCartItemRequest request)
        {
            if (request == null)
            {
                return BadRequest(new
                {
                    message = "Quantity is required."
                });
            }

            if (request.Quantity <= 0)
            {
                return BadRequest(new
                {
                    message =
                        "Quantity must be greater than zero."
                });
            }

            try
            {
                var cart =
                    await _cartService
                        .UpdateQuantityAsync(
                            id,
                            request.Quantity);

                if (cart == null)
                {
                    return NotFound(new
                    {
                        message =
                            "Cart item not found."
                    });
                }

                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        // ==========================================
        // DELETE CART ITEM
        // DELETE: api/Cart/{cartItemId}
        // ==========================================
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted =
                    await _cartService
                        .DeleteAsync(id);

                if (!deleted)
                {
                    return NotFound(new
                    {
                        message =
                            "Cart item not found."
                    });
                }

                return Ok(new
                {
                    message =
                        "Cart item removed successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        // ==========================================
        // CLEAR CUSTOMER CART
        // DELETE: api/Cart/customer/{customerId}
        // ==========================================
        [HttpDelete("customer/{customerId:int}")]
        public async Task<IActionResult> ClearCart(
            int customerId)
        {
            if (!await IsCustomerAllowed(customerId))
            {
                return Forbid();
            }

            try
            {
                var cleared =
                    await _cartService
                        .ClearCartAsync(customerId);

                if (!cleared)
                {
                    return NotFound(new
                    {
                        message = "Cart not found."
                    });
                }

                return Ok(new
                {
                    message =
                        "Cart cleared successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        // ==========================================
        // CUSTOMER OWNERSHIP CHECK
        // ==========================================
        private async Task<bool> IsCustomerAllowed(
            int customerId)
        {
            var role =
                User.FindFirstValue(
                    ClaimTypes.Role);

            // Admin can access any cart
            if (role == "Admin")
            {
                return true;
            }

            var userIdClaim =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier);

            if (!int.TryParse(
                userIdClaim,
                out int userId))
            {
                return false;
            }

            var customer =
                await _customerService
                    .GetByIdAsync(customerId);

            if (customer == null)
            {
                return false;
            }

            return customer.UserId == userId;
        }
    }
}