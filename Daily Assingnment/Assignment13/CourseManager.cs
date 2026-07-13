using System;
using System.Collections.Generic;

public class CourseManager
{
    // List to store all courses
    private List<Course> courses = new List<Course>();

    // Add Course
    public void AddCourse(Course course)
    {
        foreach (Course c in courses)
        {
            if (c.CourseId == course.CourseId)
            {
                Console.WriteLine("Course ID already exists.");
                return;
            }
        }

        courses.Add(course);
        Console.WriteLine("Course added successfully.");
    }

    // View All Courses
    public void ViewCourses()
    {
        if (courses.Count == 0)
        {
            Console.WriteLine("No courses available.");
            return;
        }

        foreach (Course course in courses)
        {
            course.DisplayCourse();
            Console.WriteLine();
        }
    }

    // Search Course by ID
    public Course SearchCourse(string courseId)
    {
        foreach (Course course in courses)
        {
            if (course.CourseId == courseId)
            {
                return course;
            }
        }

        return null;
    }
}