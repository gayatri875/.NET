using _29July.Models;

namespace _29July.Services
{
    public interface IEmployeeServices
    {
        List<Employee> getEmployees();

        Employee? getEmployee(int deptid);

        Employee? getEmployeeName(string name);

        Employee addEmployee(Employee employee);

    }
}
