using System;
using System.Collections.Generic;

class Program
{
    static void Main(string[] args)
    {
        List<Employee> employees = new List<Employee>();

        PermanentEmployee e1 = new PermanentEmployee
        {
            EmployeeId = 101,
            Name = "Gayatri",
            Department = "IT"
        };
        e1.SetLeaveBalance();

        ContractEmployee e2 = new ContractEmployee
        {
            EmployeeId = 102,
            Name = "Rahul",
            Department = "HR"
        };
        e2.SetLeaveBalance();

        PermanentEmployee e3 = new PermanentEmployee
        {
            EmployeeId = 103,
            Name = "Amit",
            Department = "Finance"
        };
        e3.SetLeaveBalance();

        ContractEmployee e4 = new ContractEmployee
        {
            EmployeeId = 104,
            Name = "Sneha",
            Department = "Marketing"
        };
        e4.SetLeaveBalance();

        employees.Add(e1);
        employees.Add(e2);
        employees.Add(e3);
        employees.Add(e4);

        Console.WriteLine("===== Employees =====");

        foreach (Employee emp in employees)
        {
            emp.DisplayDetails();
        }

        List<LeaveRequest> leaves = new List<LeaveRequest>()
        {
            new LeaveRequest
            {
                LeaveId = 1,
                EmployeeId = 101,
                NumberOfDays = 2,
                Reason = "Medical"
            },

            new LeaveRequest
            {
                LeaveId = 2,
                EmployeeId = 103,
                NumberOfDays = 4,
                Reason = "Family Function"
            }
        };

        Console.WriteLine("\n===== Leave Requests =====");

        foreach (LeaveRequest leave in leaves)
        {
            leave.DisplayLeave();
        }

        Console.WriteLine("\n===== Permanent Employees =====");

        foreach (Employee emp in employees)
        {
            if (emp is PermanentEmployee)
            {
                emp.DisplayDetails();
            }
        }

        Console.WriteLine("\n===== Employee ID 103 =====");

        Employee? found = employees.Find(e => e.EmployeeId == 103);
        if (found != null)
        {
            found.DisplayDetails();
        }
        else
        {
            Console.WriteLine("Employee not found.");
        }
        Console.WriteLine($"\nTotal Employees : {employees.Count}");
        Console.WriteLine($"Total Leave Requests : {leaves.Count}");
    }
}