using System.ComponentModel.DataAnnotations;

namespace _29July.Models
{
    public class Employee
    {
        public int Id { get; set; }


        [Required(ErrorMessage ="Name is required")]
        [StringLength(30, MinimumLength =3, ErrorMessage ="Name must contain aat least 3 characters")]
        public string Name { get; set; }


        [Range(8,10, ErrorMessage ="Number must be 8  or 10 Digit")]
        public long PhoneN { get; set; }



        [Required(ErrorMessage = "Email is Required")]
        [EmailAddress(ErrorMessage ="Invalid Email Address")]
        public string email { get; set; }


        [Required(ErrorMessage ="Deptid is Required")]
        public int DeptId { get; set; }

    }
}
