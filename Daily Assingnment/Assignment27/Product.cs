using System.ComponentModel.DataAnnotations;

namespace _6July.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Product name is Mandatory")]
        [StringLength(60,ErrorMessage ="Product name must be 60 letters")]
        public string PName { get; set; }



        [Required(ErrorMessage = "Product Price is Mandatory")]
        [Range(15, 1000000, ErrorMessage ="Product price cannot be less than 15 and more than 100000")]
        public decimal Price { get; set; }


        [Required(ErrorMessage = "Product Quantity is Mandatory")]
        [StringLength(3, ErrorMessage ="Product stock can  be max 3 letters")]
        public int Quantity { get; set; }


        [Required(ErrorMessage = "Product Stock Available is Mandatory")]
        public bool Avaliability { get; set; }
    }
}
