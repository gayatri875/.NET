using System;

public class Course
{
    // properties
    public string CourseId {get;set;}
    public string CourseName {get;set;}
    public int Credits {get;set;}

    //Constructor
    public Course(string courseId, string courseName, int credits)
    {
        CourseId = courseId;
        CourseName = courseName;
        Credits = credits;
    }

    //Display course Details
    public void DisplayCourse()
    {
        Console.WriteLine($"Course ID  : {CourseId}");
        Console.WriteLine($"Course Name  : {CourseName}");
        Console.WriteLine($"Credits  : {Credits}");
    }


}