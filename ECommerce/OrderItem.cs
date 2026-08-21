using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        // Order
        public int OrderId { get; set; }

        public Order? Order { get; set; }

        // Product
        public int ProductId { get; set; }

        public Product? Product { get; set; }

        // Quantity
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        // Price at the time of order
        // OrderService will set this from Product.Price
        public decimal UnitPrice { get; set; }

        // Total for this item
        public decimal TotalPrice =>
            UnitPrice * Quantity;
    }
}