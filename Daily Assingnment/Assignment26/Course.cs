using System.ComponentModel.DataAnnotations;

namespace _8Aug.Models
{
    public class Course
    {
        public int CourseId { get; set; }

        [Required(ErrorMessage = "Course name is required")]
        [StringLength(100, ErrorMessage = "Course name cannot exceed 100 characters")]
        public string CourseName { get; set; }

        [Range(1, 24, ErrorMessage = "Duration must be between 1 and 24 months")]
        public int Duration { get; set; }

        public int TeacherId { get; set; }

        public Teacher Teacher { get; set; }

        public ICollection<Student> Students { get; set; }
            = new List<Student>();
    }
}
