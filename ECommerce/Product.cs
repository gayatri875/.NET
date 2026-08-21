using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)]
        public int Stock { get; set; }

        public string? ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;

        // Foreign Key
        public int CategoryId { get; set; }

        // Navigation Property
        public Category? Category { get; set; }
    }
}