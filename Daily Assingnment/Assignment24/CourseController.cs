using _28JULY.Interfaces;
using _28JULY.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _28JULY.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        // GET: api/Course
        [HttpGet]
        public IActionResult GetAllCourses()
        {
            return Ok(_courseService.GetAllCourses());
        }

        // GET: api/Course/1
        [HttpGet("{id}")]
        public IActionResult GetCourseById(int id)
        {
            var course = _courseService.GetCourseById(id);

            if (course == null)
                return NotFound("Course not found.");

            return Ok(course);
        }

        // POST: api/Course
        [HttpPost]
        public IActionResult AddCourse([FromBody] Course course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _courseService.AddCourse(course);
            return Ok("Course registered successfully.");
        }

        // PUT: api/Course/1
        [HttpPut("{id}")]
        public IActionResult UpdateCourse(int id, [FromBody] Course course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _courseService.UpdateCourse(id, course);

            if (!result)
                return NotFound("Course not found.");

            return Ok("Course updated successfully.");
        }

        // DELETE: api/Course/1
        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(int id)
        {
            var result = _courseService.DeleteCourse(id);

            if (!result)
                return NotFound("Course not found.");

            return Ok("Course deleted successfully.");
        }
    }
}

