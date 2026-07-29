using _29July.Models;
using _29July.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _29July.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeServices _service;


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.getEmployees());
        }

        [HttpGet("{deptid}")]
        public IActionResult GetById(int deptid)
        {
            var employee = _service.getEmployee(deptid);
            if (employee == null)
                return NotFound("employee with id not found");
            return Ok(employee);
        }

        [HttpGet("{name}")]
        public IActionResult GetByName(string Name)
        {
            var employee = _service.getEmployeeName(Name);
            if (employee == null)
                return NotFound("employye name not found");
            return Ok(employee);

        }

        [HttpPost] 
        public IActionResult Post(Employee employee) 
        { 
            var res = _service.addEmployee(employee); 
            return Ok(res); 
        }
    }

}

