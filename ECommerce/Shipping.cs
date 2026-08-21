using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models
{
    public class Shipping
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public Order? Order { get; set; }

        [Required]
        [StringLength(100)]
        public string CourierName { get; set; } = string.Empty;

        [StringLength(100)]
        public string TrackingNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "Pending";

        public DateTime? ShippedDate { get; set; }

        public DateTime? DeliveredDate { get; set; }
    }
}