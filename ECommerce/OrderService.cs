using ECommerce.Models;
using ECommerce.Repository;

namespace ECommerce.Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IShippingRepository _shippingRepository;

        public OrderService(
            IOrderRepository orderRepository,
            IProductRepository productRepository,
            IShippingRepository shippingRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _shippingRepository = shippingRepository;
        }

        // ==========================================
        // GET ALL ORDERS
        // ==========================================
        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _orderRepository.GetAllAsync();
        }

        // ==========================================
        // GET ORDER BY ID
        // ==========================================
        public async Task<Order?> GetByIdAsync(int id)
        {
            return await _orderRepository.GetByIdAsync(id);
        }

        // ==========================================
        // GET ORDERS BY CUSTOMER
        // ==========================================
        public async Task<IEnumerable<Order>> GetByCustomerIdAsync(
            int customerId)
        {
            return await _orderRepository
                .GetByCustomerIdAsync(customerId);
        }

        // ==========================================
        // CREATE ORDER
        // ==========================================
        public async Task<Order> CreateAsync(Order order)
        {
            if (order == null)
            {
                throw new Exception(
                    "Order data is required.");
            }

            if (order.CustomerId <= 0)
            {
                throw new Exception(
                    "CustomerId is required.");
            }

            if (order.OrderItems == null ||
                !order.OrderItems.Any())
            {
                throw new Exception(
                    "At least one order item is required.");
            }

            // ======================================
            // ORDER BASIC DATA
            // ======================================
            order.OrderDate = DateTime.UtcNow;
            order.Status = "Pending";

            // ======================================
            // VALIDATE PRODUCTS + STOCK
            // ======================================
            foreach (var item in order.OrderItems)
            {
                if (item.ProductId <= 0)
                {
                    throw new Exception(
                        "Invalid ProductId.");
                }

                if (item.Quantity <= 0)
                {
                    throw new Exception(
                        "Quantity must be greater than zero.");
                }

                var product =
                    await _productRepository
                        .GetByIdAsync(item.ProductId);

                if (product == null)
                {
                    throw new Exception(
                        $"Product with Id {item.ProductId} not found.");
                }

                if (!product.IsActive)
                {
                    throw new Exception(
                        $"Product '{product.Name}' is not active.");
                }

                if (product.Stock < item.Quantity)
                {
                    throw new Exception(
                        $"Insufficient stock for '{product.Name}'. " +
                        $"Available: {product.Stock}, " +
                        $"Requested: {item.Quantity}");
                }

                // Server decides price
                item.UnitPrice = product.Price;

                // Reduce stock
                product.Stock -= item.Quantity;
            }

            // ======================================
            // CALCULATE TOTAL
            // ======================================
            order.TotalAmount =
                order.OrderItems.Sum(
                    item =>
                        item.UnitPrice *
                        item.Quantity);

            // ======================================
            // SAVE ORDER
            // ======================================
            var createdOrder =
                await _orderRepository
                    .AddAsync(order);

            // ======================================
            // CREATE SHIPPING AUTOMATICALLY
            // ======================================
            var shipping = new Shipping
            {
                OrderId = createdOrder.Id,

                CourierName = "Not Assigned",

                TrackingNumber = string.Empty,

                Status = "Pending",

                ShippedDate = null,

                DeliveredDate = null
            };

            await _shippingRepository
                .AddAsync(shipping);

            // Return created order
            return createdOrder;
        }

        // ==========================================
        // UPDATE ORDER / CANCEL
        // ==========================================
        public async Task<Order?> UpdateAsync(
            int id,
            Order order)
        {
            var existingOrder =
                await _orderRepository
                    .GetByIdAsync(id);

            if (existingOrder == null)
            {
                return null;
            }

            // ======================================
            // CANCEL ORDER
            // ======================================
            if (string.Equals(
                order.Status,
                "Cancelled",
                StringComparison.OrdinalIgnoreCase))
            {
                if (string.Equals(
                    existingOrder.Status,
                    "Cancelled",
                    StringComparison.OrdinalIgnoreCase))
                {
                    throw new Exception(
                        "Order is already cancelled.");
                }

                if (string.Equals(
                    existingOrder.Status,
                    "Delivered",
                    StringComparison.OrdinalIgnoreCase))
                {
                    throw new Exception(
                        "Delivered order cannot be cancelled. " +
                        "Please request a return.");
                }

                // Restore stock
                foreach (var item in existingOrder.OrderItems)
                {
                    var product =
                        await _productRepository
                            .GetByIdAsync(item.ProductId);

                    if (product != null)
                    {
                        product.Stock += item.Quantity;
                    }
                }

                existingOrder.Status = "Cancelled";
            }
            else
            {
                existingOrder.Status =
                    order.Status;
            }

            // Update shipping address
            existingOrder.ShippingAddress =
                order.ShippingAddress;

            // Recalculate total
            existingOrder.TotalAmount =
                existingOrder.OrderItems.Sum(
                    item =>
                        item.UnitPrice *
                        item.Quantity);

            return await _orderRepository
                .UpdateAsync(existingOrder);
        }

        // ==========================================
        // DELETE ORDER
        // ==========================================
        public async Task<bool> DeleteAsync(int id)
        {
            return await _orderRepository
                .DeleteAsync(id);
        }
    }
}