using ECommerceAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public Customer? Customer { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
    }
}