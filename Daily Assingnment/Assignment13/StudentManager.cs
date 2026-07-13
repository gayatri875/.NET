using System;
using System.Collections.Generic;
using System.Security.Cryptography;


public class StudentManager
{
   // List to store all students
   private List<Student> students = new List<Student>();

   //register student
   
   public void RegisterStudent(Student student)
    {
        foreach(Student s in students)
        {
            if (s.StudentId == student.StudentId)
            {
                Console.WriteLine("Student ID alrady exists");
                return;
            } 
        }
        students.Add(student);
        Console.WriteLine("Student registered successfully");
    } 


    //View All Students
    public void ViewStudents()
    {
        if(students.Count == 0)
        {
            Console.WriteLine("No Students register");
            return;
        }

        foreach(Student student in students)
        {
            student.DisplayStudent();
            Console.WriteLine();
        }
    }


    //Search Student By Id
    public Student SearchStudent(int studentId)
    {
        foreach (Student student in students)
        {
            if (student.StudentId == studentId)
            {
                return student;
            }
        }
        return null;
    }
}