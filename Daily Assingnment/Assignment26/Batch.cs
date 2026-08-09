using System.ComponentModel.DataAnnotations;

namespace _8Aug.Models
{
    public class Batch
    {
        public int BatchId { get; set; }

        [Required(ErrorMessage = "Batch name is required")]
        [StringLength(100, ErrorMessage = "Batch name cannot exceed 100 characters")]
        public string BatchName { get; set; }

        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }

        public ICollection<Student> Students { get; set; }
            = new List<Student>();
    }
}
