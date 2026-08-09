using _8Aug.Data;
using _8Aug.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _8Aug.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        // Used to access the database
        private readonly AppDbContext _context;

        // Receives the database context
        public TeacherController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/teachers
        // Gets all teachers
        [HttpGet]
        public IActionResult GetTeachers()
        {
            var teachers = _context.Teachers.ToList();

            return Ok(teachers);
        }

        // GET: api/teachers/1
        // Gets a teacher by ID
        [HttpGet("{id}")]
        public IActionResult GetTeacher(int id)
        {
            var teacher = _context.Teachers.Find(id);

            // Checks if the teacher exists
            if (teacher == null)
            {
                return NotFound();
            }

            return Ok(teacher);
        }

        // POST: api/teachers
        // Adds a new teacher
        [HttpPost]
        public IActionResult AddTeacher(Teacher teacher)
        {
            _context.Teachers.Add(teacher);

            // Saves the teacher to the database
            _context.SaveChanges();

            return Ok(teacher);
        }

        // PUT: api/teachers/1
        // Updates an existing teacher
        [HttpPut("{id}")]
        public IActionResult UpdateTeacher(int id, Teacher teacher)
        {
            // Finds the existing teacher
            var existingTeacher = _context.Teachers.Find(id);

            // Checks if the teacher exists
            if (existingTeacher == null)
            {
                return NotFound();
            }

            // Updates teacher details
            existingTeacher.Name = teacher.Name;
            existingTeacher.Email = teacher.Email;
            existingTeacher.Experience = teacher.Experience;

            // Saves the changes to the database
            _context.SaveChanges();

            return Ok(existingTeacher);
        }

        // DELETE: api/teachers/1
        // Deletes a teacher
        [HttpDelete("{id}")]
        public IActionResult DeleteTeacher(int id)
        {
            // Finds the teacher
            var teacher = _context.Teachers.Find(id);

            // Checks if the teacher exists
            if (teacher == null)
            {
                return NotFound();
            }

            // Removes the teacher
            _context.Teachers.Remove(teacher);

            // Saves the changes to the database
            _context.SaveChanges();

            return Ok("Teacher deleted successfully");
        }
    }
}
