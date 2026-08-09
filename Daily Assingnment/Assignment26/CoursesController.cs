using _8Aug.Data;
using _8Aug.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _8Aug.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        // Used to access the database
        private readonly AppDbContext _context;

        // Receives the database context
        public CoursesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/courses
        // Gets all courses
        [HttpGet]
        public IActionResult GetCourses()
        {
            var courses = _context.Courses.ToList();

            return Ok(courses);
        }

        // GET: api/courses/1
        // Gets a course by ID
        [HttpGet("{id}")]
        public IActionResult GetCourse(int id)
        {
            var course = _context.Courses.Find(id);

            // Checks if the course exists
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        // POST: api/courses
        // Adds a new course
        [HttpPost]
        public IActionResult AddCourse(Course course)
        {
            _context.Courses.Add(course);

            // Saves the course to the database
            _context.SaveChanges();

            return Ok(course);
        }

        // PUT: api/courses/1
        // Updates an existing course
        [HttpPut("{id}")]
        public IActionResult UpdateCourse(int id, Course course)
        {
            // Finds the existing course
            var existingCourse = _context.Courses.Find(id);

            // Checks if the course exists
            if (existingCourse == null)
            {
                return NotFound();
            }

            // Updates course details
            existingCourse.CourseName = course.CourseName;
            existingCourse.Duration = course.Duration;
            existingCourse.TeacherId = course.TeacherId;

            // Saves the changes to the database
            _context.SaveChanges();

            return Ok(existingCourse);
        }

        // DELETE: api/courses/1
        // Deletes a course
        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(int id)
        {
            // Finds the course
            var course = _context.Courses.Find(id);

            // Checks if the course exists
            if (course == null)
            {
                return NotFound();
            }

            // Removes the course
            _context.Courses.Remove(course);

            // Saves the changes to the database
            _context.SaveChanges();

            return Ok("Course deleted successfully");
        }
    }
}
