using System.ComponentModel.DataAnnotations;

namespace AutomobileManagement.Models
{
    public class Manufacturer
    {
        [Required(ErrorMessage = "Manufacturer Name is required")]
        [StringLength(50, ErrorMessage = "Manufacturer Name cannot exceed 50 characters")]
        public string ManufacturerName { get; set; }




        [Required(ErrorMessage = "Country is required")]
        [StringLength(30, ErrorMessage = "Country cannot exceed 30 characters")]
        public string Country { get; set; }



        [Required(ErrorMessage = "Contact Number is required")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Enter a valid 10-digit contact number")]
        public string ContactNumber { get; set; }



        [Required(ErrorMessage = "Email Address is required")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string EmailAddress { get; set; }
    }
}