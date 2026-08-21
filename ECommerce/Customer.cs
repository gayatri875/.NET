using System.ComponentModel.DataAnnotations;

namespace ECommerceAPI.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [StringLength(250)]
        public string Address { get; set; } = string.Empty;

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}