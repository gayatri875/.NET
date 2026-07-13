using System;

class Program
{
    static void Main(string[] args)
    {
        StudentManager studentManager = new StudentManager();
        CourseManager courseManager = new CourseManager();
        Feecalculator feecalculator = new Feecalculator();

        bool exit = false;

        while (!exit)
        {
            Console.WriteLine("\n======Student Management System======");
            Console.WriteLine("1. Student Management");
            Console.WriteLine("2. Course Management");
            Console.WriteLine("3. Register Management");
            Console.WriteLine("4. View Student Details");
            Console.WriteLine("5. Exit");
            Console.WriteLine("Enter Your Choice");

            int choice = Convert.ToInt32(Console.ReadLine());
            switch (choice)
            {
                case 1:
                    Console.WriteLine("Student Management");
                    break;

                case 2:
                    Console.WriteLine("Course Management");
                    break;


                case 3:
                    Console.WriteLine("Register Course");
                    break;

                case 4:
                    Console.WriteLine("View Student Details");
                    break;


                case 5:
                    exit = true;
                    Console.WriteLine("Thank You");
                    break;

                default:
                    Console.WriteLine("Invalid Choice");
                    break;


            }

            Console.WriteLine("\n------ Course Management ------");
            Console.WriteLine("1. Add Course");
            Console.WriteLine("2. View Courses");
            Console.Write("Enter Choice : ");

            int courseChoice = Convert.ToInt32(Console.ReadLine());

            switch (courseChoice)
            {
                case 1:

                    Console.Write("Enter Course ID : ");
                    string courseId = Console.ReadLine();

                    Console.Write("Enter Course Name : ");
                    string courseName = Console.ReadLine();

                    Console.Write("Enter Credits : ");
                    int credits = Convert.ToInt32(Console.ReadLine());

                    Course course = new Course(courseId, courseName, credits);

                    courseManager.AddCourse(course);

                    break;

                case 2:

                    courseManager.ViewCourses();

                    break;

                default:

                    Console.WriteLine("Invalid Choice");
                    break;
            }



            Console.Write("Enter Student ID : ");
            int studentId = Convert.ToInt32(Console.ReadLine());

            Student selectedStudent = studentManager.SearchStudent(studentId);

            if (selectedStudent == null)
            {
                Console.WriteLine("Student Not Found.");
                break;
            }

            Console.Write("Enter Course ID : ");
            string searchCourseId = Console.ReadLine();

            Course selectedCourse = courseManager.SearchCourse(searchCourseId);

            if (selectedCourse == null)
            {
                Console.WriteLine("Course Not Found.");
                break;
            }

            selectedStudent.EnrollCourse(selectedCourse);

            Console.WriteLine("Course Registered Successfully.");

            break;

        }


    }
}