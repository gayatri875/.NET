using _26July.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
namespace _26July.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        static List<Employee> employees = new List<Employee>() {
            new Employee(){Id=101, Name="Karan", LastName="Doe", Dept="CSE", PhomeNum=3456728903 },
             new Employee() { Id = 102, Name = "Falguni", LastName = "Mishra", Dept = "IT", PhomeNum = 345576389903 },
              new Employee() { Id = 103, Name = "Niti", LastName = "Mehra", Dept = "ME", PhomeNum = 3456728903 }
            };


        //get all employee
        [HttpGet]
        public IActionResult getEmployee()
        {
            return Ok(employees);//289
        }

        [HttpGet("{id} ")]
        public IActionResult getEmployeeId(int id){
            var employee = employees.FirstOrDefault(x => x.Id == id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            employees.Add(employee);
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id , Employee employee)
        {
            var employee1 = employees.FirstOrDefault(x => x.Id == id);
            if (employee1 == null)
            {
                return NotFound();

            }

            employee1.LastName = employee.LastName;
            return Ok(employee1);
        }
        [HttpGet("Dept/{dept}")]
        public IActionResult GetEmployeeBydept(string dept)
        {
            var result = employees.Where(s => s.Dept.Equals(dept, StringComparison.OrdinalIgnoreCase)).ToList();
            if (!result.Any()) 
            { return NotFound("Not employee found under this dept"); 
            }
            return Ok(result);
        }


        [HttpGet("Name/{name}")]
        public IActionResult GetEmployeeByName(string name)
        {
            var result = employees
                .Where(e => e.Name.Equals(name, StringComparison.OrdinalIgnoreCase))
                .ToList();

            if (!result.Any())
            {
                return NotFound("No employee found with this name");
            }

            return Ok(result);
        }

    }
}
