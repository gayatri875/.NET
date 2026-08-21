using ECommerce.DTOs.Order;
using ECommerce.Models;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        private readonly CustomerService _customerService;

        public OrderController(
            OrderService orderService,
            CustomerService customerService)
        {
            _orderService = orderService;
            _customerService = customerService;
        }

        // ==========================================
        // GET ALL ORDERS
        // ADMIN ONLY
        // GET: api/Order
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var orders =
                await _orderService.GetAllAsync();

            return Ok(
                orders.Select(MapToResponse)
            );
        }

        // ==========================================
        // GET ORDER BY ID
        // ADMIN -> Any Order
        // CUSTOMER -> Own Order Only
        // GET: api/Order/1
        // ==========================================
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var order =
                await _orderService.GetByIdAsync(id);

            if (order == null)
            {
                return NotFound(new
                {
                    message = "Order not found."
                });
            }

            var role =
                User.FindFirstValue(
                    ClaimTypes.Role);

            // Admin can access any order
            if (role == "Admin")
            {
                return Ok(
                    MapToResponse(order)
                );
            }

            var userIdClaim =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier);

            if (!int.TryParse(
                userIdClaim,
                out int userId))
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid user identity."
                });
            }

            // Customer can access only own order
            if (order.Customer == null ||
                order.Customer.UserId != userId)
            {
                return Forbid();
            }

            return Ok(
                MapToResponse(order)
            );
        }

        // ==========================================
        // GET ORDERS BY CUSTOMER
        // ADMIN -> Any Customer
        // CUSTOMER -> Own Customer Only
        // GET: api/Order/customer/1
        // ==========================================
        [HttpGet("customer/{customerId:int}")]
        public async Task<IActionResult> GetByCustomerId(
            int customerId)
        {
            var role =
                User.FindFirstValue(
                    ClaimTypes.Role);

            // Admin can view any customer's orders
            if (role == "Admin")
            {
                var adminOrders =
                    await _orderService
                        .GetByCustomerIdAsync(
                            customerId);

                return Ok(
                    adminOrders.Select(
                        MapToResponse)
                );
            }

            var userIdClaim =
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier);

            if (!int.TryParse(
                userIdClaim,
                out int userId))
            {
                return Unauthorized(new
                {
                    message =
                        "Invalid user identity."
                });
            }

            var customer =
                await _customerService
                    .GetByIdAsync(customerId);

            if (customer == null)
            {
                return NotFound(new
                {
                    message =
                        "Customer not found."
                });
            }

            // Customer can access only own orders
            if (customer.UserId != userId)
            {
                return Forbid();
            }

            var orders =
                await _orderService
                    .GetByCustomerIdAsync(
                        customerId);

            return Ok(
                orders.Select(
                    MapToResponse)
            );
        }

        // ==========================================
        // CREATE ORDER
        // CUSTOMER + ADMIN
        // POST: api/Order
        // ==========================================
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateOrderRequest request)
        {
            if (request == null)
            {
                return BadRequest(new
                {
                    message =
                        "Order data is required."
                });
            }

            if (request.CustomerId <= 0)
            {
                return BadRequest(new
                {
                    message =
                        "CustomerId is required."
                });
            }

            if (request.OrderItems == null ||
                !request.OrderItems.Any())
            {
                return BadRequest(new
                {
                    message =
                        "At least one order item is required."
                });
            }

            var role =
                User.FindFirstValue(
                    ClaimTypes.Role);

            // ======================================
            // CUSTOMER OWNERSHIP
            // ======================================
            if (role != "Admin")
            {
                var userIdClaim =
                    User.FindFirstValue(
                        ClaimTypes.NameIdentifier);

                if (!int.TryParse(
                    userIdClaim,
                    out int userId))
                {
                    return Unauthorized(new
                    {
                        message =
                            "Invalid user identity."
                    });
                }

                var customer =
                    await _customerService
                        .GetByIdAsync(
                            request.CustomerId);

                if (customer == null)
                {
                    return NotFound(new
                    {
                        message =
                            "Customer not found."
                    });
                }

                if (customer.UserId != userId)
                {
                    return Forbid();
                }
            }

            try
            {
                // DTO -> Entity
                var order = new Order
                {
                    CustomerId =
                        request.CustomerId,

                    ShippingAddress =
                        request.ShippingAddress,

                    OrderItems =
                        request.OrderItems
                            .Select(item =>
                                new OrderItem
                                {
                                    ProductId =
                                        item.ProductId,

                                    Quantity =
                                        item.Quantity
                                })
                            .ToList()
                };

                var createdOrder =
                    await _orderService
                        .CreateAsync(order);

                return CreatedAtAction(
                    nameof(GetById),
                    new
                    {
                        id = createdOrder.Id
                    },
                    MapToResponse(
                        createdOrder)
                );
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
        // UPDATE ORDER
        // ADMIN ONLY
        // PUT: api/Order/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            int id,
            Order order)
        {
            try
            {
                var updatedOrder =
                    await _orderService
                        .UpdateAsync(id, order);

                if (updatedOrder == null)
                {
                    return NotFound(new
                    {
                        message =
                            "Order not found."
                    });
                }

                return Ok(
                    MapToResponse(updatedOrder)
                );
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
        // DELETE ORDER
        // ADMIN ONLY
        // DELETE: api/Order/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(
            int id)
        {
            var deleted =
                await _orderService
                    .DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message =
                        "Order not found."
                });
            }

            return Ok(new
            {
                message =
                    "Order deleted successfully."
            });
        }

        // ==========================================
        // ENTITY -> RESPONSE DTO
        // ==========================================
        private static OrderResponse MapToResponse(
            Order order)
        {
            return new OrderResponse
            {
                Id = order.Id,

                CustomerId =
                    order.CustomerId,

                OrderDate =
                    order.OrderDate,

                TotalAmount =
                    order.TotalAmount,

                Status =
                    order.Status,

                ShippingAddress =
                    order.ShippingAddress,

                OrderItems =
                    order.OrderItems?
                        .Select(item =>
                            new OrderItemResponse
                            {
                                Id = item.Id,

                                ProductId =
                                    item.ProductId,

                                ProductName =
                                    item.Product?.Name
                                    ?? string.Empty,

                                Quantity =
                                    item.Quantity,

                                UnitPrice =
                                    item.UnitPrice,

                                TotalPrice =
                                    item.UnitPrice *
                                    item.Quantity
                            })
                        .ToList()
                    ?? new List<OrderItemResponse>()
            };
        }
    }
}