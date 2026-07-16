using EmployeeManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace EmployeeManagementSystem.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Employee()
        {

            List<Employee> employees = new List<Employee>()
            {
                new Employee
                {
                    EmployeeId  = 101,
                    Name = "Neha",
                    Department = "IT",
                    Salary = 5000,
                    Email = "neha@gmail.com"
                },

                new Employee
                {
                    EmployeeId = 102,
                    Name = "Naitik",
                    Department = "CS",
                    Salary = 70000,
                    Email = "naitik@gmail.com"
                },

                new Employee
                {
                    EmployeeId = 103,
                    Name = "Swara",
                    Department = "ME",
                    Salary = 58000,
                    Email = "swara@gmail.com"
                }
            };

            return View(employees);
        }

        public IActionResult Department()
        {
            List<Department> departments = new List<Department>()
            {
                new Department
                {
                    DepartmentName = "IT",
                    DepartmentHead = "Rakesh",
                    HeadContact = "7768913710",
                    HeadEmail = "rakesh@gmail.com"
                },

                new Department
                {
                    DepartmentName = "CSE",
                    DepartmentHead = "Sneha",
                    HeadContact = "7368945710",
                    HeadEmail = "sneha@gmail.com"
                },


                new Department
                {
                    DepartmentName = "ME",
                    DepartmentHead = "Vikas",
                    HeadContact = "7768927410",
                    HeadEmail = "vikas@gmail.com"
                }
            };

            return View(departments);

        }

       
    }
}
