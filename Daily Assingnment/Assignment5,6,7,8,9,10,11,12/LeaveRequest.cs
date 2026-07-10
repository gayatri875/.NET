using System;

public class LeaveRequest
{
    public int LeaveId { get; set; }
    public int EmployeeId { get; set; }
    public int NumberOfDays { get; set; }
    public string Reason { get; set; } = "";

    public void DisplayLeave()
    {
        Console.WriteLine("-------------------------");
        Console.WriteLine($"Leave ID : {LeaveId}");
        Console.WriteLine($"Employee ID : {EmployeeId}");
        Console.WriteLine($"Days : {NumberOfDays}");
        Console.WriteLine($"Reason : {Reason}");
    }
}