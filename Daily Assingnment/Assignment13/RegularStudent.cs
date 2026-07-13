using System;

public class RegularStudent : Student
{
    // constructor
    public RegularStudent(int studentId, string studentName, string department) : base(studentId , studentName, department)
    {
        
    }

    //override calculatefess
    public override double CalculateFee()
    {
       return GetTotalCredits()*1000; 
    }

    //override DisplayStudent
    public  override void DisplayStudent()
    {
        base.DisplayStudent();
        Console.WriteLine("Student Type : Regular");
    }
}