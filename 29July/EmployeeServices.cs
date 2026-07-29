using _29July.Models;

namespace _29July.Services
{
    public class EmployeeServices : IEmployeeServices
    {
        private static List<Employee> employees = new List<Employee>()
        {

            new Employee { Id = 101, Name = "Rita", PhoneN = 357796283, email = "rita@gmail.com", DeptId = 1 },
            new Employee { Id = 102, Name = "Miita", PhoneN = 567896283, email = "miita@gmail.com", DeptId = 2 },
            new Employee { Id = 103, Name = "Siita", PhoneN = 983596283, email = "siita@gmail.com", DeptId = 3 },
        };

        public List<Employee> getEmployees()
        {
            return employees;
        }

        public Employee? getEmployee(int deptid)
        {
            return employees.FirstOrDefault(e => e.DeptId == e.DeptId);
        }


        public Employee? getEmployeeName(string Name)
        {
            return employees.FirstOrDefault(e => e.Name == e.Name);
        }


        public Employee addEmployee(Employee employee)
        {
            employees.Add(employee);
            return employee;
        }

    }
}
