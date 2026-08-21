using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models
{
    public class Return
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public Order? Order { get; set; }

        public int ProductId { get; set; }

        public Product? Product { get; set; }

        [Required]
        [StringLength(500)]
        public string Reason { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "Requested";

        public DateTime RequestedDate { get; set; } = DateTime.UtcNow;

        public DateTime? ApprovedDate { get; set; }

        public DateTime? CompletedDate { get; set; }
    }
}