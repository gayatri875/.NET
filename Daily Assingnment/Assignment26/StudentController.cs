using _8Aug.Data;
using _8Aug.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _8Aug.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        //Used to access the databse
        private readonly AppDbContext _context;

        //Receives the database context
        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        //Gets all students
        [HttpGet]
        public IActionResult GetStudents()
        {
            var students = _context.Students.ToList();
            return Ok(students);
        }

        // Gets a student by ID
        [HttpGet("{id}")]
        public IActionResult GetStudent(int id)
        {
            //Checks if the student exists
            var student = _context.Students.Find(id);
            if(student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }


        // Adds  new student
        [HttpPost]
        public IActionResult AddStudent(Student student)
        {
            _context.Students.Add(student);
            // saves the srydent to the databse

            _context.SaveChanges();
            return Ok(student);
        }


        //Updates an existing student
        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id, Student student)
        {
            //Finds the existing student
            var existingStudent = _context.Students.Find(id);

            // Checks id the student exists
            if(existingStudent == null)
            {
                return NotFound();
            }

            //Update Student details
            existingStudent.FirstName = student.FirstName;
            existingStudent.LastName = student.LastName;
            existingStudent.Email = student.Email;
            existingStudent.Phone = student.Phone;
            existingStudent.DateOfBirth = student.DateOfBirth;
            existingStudent.BatchId = student.BatchId;

            // Saves the changes top the database

            _context.SaveChanges();
            return Ok(existingStudent);
        }

        //Delete a Student
        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            //finds the student
            var student = _context.Students.Find(id);

            // Check if the student exists
            if(student == null)
            {
                return NotFound();
            }

            // Removes the student
            _context.Students.Remove(student);

            //Saves the changes to the database
            _context.SaveChanges();
            return Ok("Student deleted successfully");
        }

    }
}
