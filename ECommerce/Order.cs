using ECommerceAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models
{
    public class Order
    {
        public int Id { get; set; }

        // Customer who placed the order
        public int CustomerId { get; set; }

        public Customer? Customer { get; set; }

        // Order date
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        // Calculated by OrderService
        public decimal TotalAmount { get; set; }

        // Pending, Shipped, Delivered, Cancelled
        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "Pending";

        // Delivery address for this specific order
        [StringLength(250)]
        public string ShippingAddress { get; set; } = string.Empty;

        // Products included in this order
        public ICollection<OrderItem> OrderItems { get; set; }
            = new List<OrderItem>();

        // Shipping information
        public Shipping? Shipping { get; set; }
    }
}