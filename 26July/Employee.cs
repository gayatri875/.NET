using System.ComponentModel.DataAnnotations;

namespace _26July.Models
{
    public class Employee
    {
        [Required(ErrorMessage ="Emp id is required")]
        public int Id { get; set; }



        [Required(ErrorMessage ="Emp name is required")]
        [StringLength(25, MinimumLength =3, ErrorMessage ="name must be atleast 3 letters")]
        public string Name { get; set; }

        public string LastName { get; set; }



        [Required(ErrorMessage ="emp Dept is required")]
        [StringLength(25, ErrorMessage ="Department cannot be more than 25 letters")]
        public string Dept { get; set; }


        [Required(ErrorMessage ="Emp Phone number is Required")]
        public long PhomeNum { get; set; }


    }
}
