using System.ComponentModel.DataAnnotations;
namespace AutomobileManagement.Models
{
    public class Automobile
    {
        [Required(ErrorMessage ="Vehicle ID is required")]
        [Range(1, 9999, ErrorMessage ="Vehicle ID must be between 1 and 9999")]
        public int VehicleId { get; set; }



        [Required(ErrorMessage = "Vehicle Name is required")]
        [StringLength(50, MinimumLength =3,ErrorMessage ="Vehicle name must be between 3 and 50 characters")]
        public string VehicleName { get; set; }



        [Required(ErrorMessage = "Brand is required")]
        [StringLength(30, ErrorMessage = "Brand cannot eceed 30 characters")]
        public string Brand{ get; set; }



        [Required(ErrorMessage = "Model Year is required")]
        [Range(2000, 2035, ErrorMessage = "Model Year must be between 2000 and 2035")]
        public int ModelYear { get; set; }



        [Required(ErrorMessage = "Price is required")]
        [Range(50000, 10000000, ErrorMessage = "Price must be between 50000 and 1000000")]
        public decimal Price { get; set; }



        [Required(ErrorMessage = "Fuel Type is required")]
        [RegularExpression("^(Petrol|Diesel|CNG|Electric)$", ErrorMessage = "Fuel Type must be Petrol, Diesel, CNG or Electric")]
        public string FuelType{ get; set; }




    }
}
