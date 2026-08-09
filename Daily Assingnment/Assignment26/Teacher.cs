using System.ComponentModel.DataAnnotations;

namespace _8Aug.Models
{
    public class Teacher
    {
        public int TeacherId { get; set; }

        [Required(ErrorMessage = "Teacher name is required")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string Email { get; set; }

        [Range(1, 40, ErrorMessage = "Experience must be between 1 and 40 years")]
        public int Experience { get; set; }

        public ICollection<Course> Courses { get; set; }
            = new List<Course>();
    }
}
