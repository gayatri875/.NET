using _16July.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace _16July.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            List<Student> students = new List<Student>()
    {
        new Student { Id = 101, Name = "abc", Age = 14, Course = "CSE" , Qualification="B.E", Gender ="F"},
        new Student { Id = 102, Name = "Rahul", Age = 20, Course = "IT", Qualification="M.E", Gender ="M" },
        new Student { Id = 103, Name = "Priya", Age = 19, Course = "CSE" ,Qualification="B.E", Gender ="F"}
    };

            return View(students);
        }

    }
}
