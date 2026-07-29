using System.ComponentModel.DataAnnotations;

namespace _29July_Assignment.Models
{
    public class Vehicle
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(30)]
        public string VehicleName { get; set; }

        [Required]
        public string Brand { get; set; }

        [Range(10000, 5000000)]
        public decimal Price { get; set; }

        [Required]
        public string FuelType { get; set; }
    }
}

