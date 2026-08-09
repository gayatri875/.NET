using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace _8Aug.Models
{
    public class Student
    {
        public int StudentId { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        [StringLength(50, ErrorMessage = "First Name cannot exceed 50 characters")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(50, ErrorMessage = "Last Name cannot exceed 50 characters")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Enter a valid phone number")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Date of Birth is required")]
        public DateTime DateOfBirth { get; set; }

        public int BatchId { get; set; }

        public Batch Batch { get; set; }

        public ICollection<Course> Courses { get; set; }
            = new List<Course>();
    }
}
