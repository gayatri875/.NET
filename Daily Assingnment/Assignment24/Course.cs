using System.ComponentModel.DataAnnotations;

namespace _28JULY.Models
{
    public class Course
    {
        [Range(1, 1000, ErrorMessage ="course Id must be betweeen 1 and 1000.")]
        public int Id { get; set; }


        [Required(ErrorMessage ="Course Title is Required")]
        [StringLength(50, MinimumLength =3, ErrorMessage ="Title must be between 3 and 50 characters")]
        public string Title { get; set; }


        [Range(1, 10, ErrorMessage ="Credits must be between 1 and 10.")]
        public int Credits { get; set; }


        [Range(1, 52, ErrorMessage ="Duration must be between 1 and 52 weeks.")]
        public int Duration { get; set; }


    }
}
