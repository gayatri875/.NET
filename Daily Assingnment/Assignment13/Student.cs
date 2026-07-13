using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Runtime.InteropServices;

public class Student
{
    // Properties
    public int StudentId{get;set;}
    public string StudentName{get;set;}
    public string Department{get;set;}

    //List to enroll courses
    public List<Course> EnrollledCourses{get;set;}


    //Constructor
    public Student(int studentid,string studentName, string department)
    {
        StudentId = studentid;
        StudentName = studentName;
        Department = department;
        EnrollledCourses = new List<Course>();
    }
     //method to addd coursse
     public void EnrollCourse(Course course)
    {
        EnrollledCourses.Add(course);
    }


    //Method to calculate credits
    public int GetTotalCredits()
    {
        int totalCredits =0;

        foreach(Course course in EnrollledCourses)
        {
            totalCredits += course.Credits;
        }

        return totalCredits;

    }

    //Virtual method
    public virtual double CalculateFee()
    {
        return 0;
    }

    //Display Details

    public virtual void DisplayStudent()
    {
        Console.WriteLine($"Student ID : {StudentId}");
        Console.WriteLine($"Student Name : {StudentName}");
        Console.WriteLine($"Department : {Department}");
    }


}
