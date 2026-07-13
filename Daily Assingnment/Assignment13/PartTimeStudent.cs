using System;

public class PartTimeStudent : Student
{
    //constructor
    public PartTimeStudent(int studentId, string studentName,string department) : base(studentId, studentName, department)
    {
        
    }

    //override calculte fees
    public override double CalculateFee()
    {
        return GetTotalCredits()*700;
    }

    // Display Student 
    public override void DisplayStudent()
    {
        base.DisplayStudent();
        Console.WriteLine("Student Tyep : Part- Time");
    }
}