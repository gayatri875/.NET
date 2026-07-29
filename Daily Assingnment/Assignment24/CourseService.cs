using _28JULY.Interfaces;
using _28JULY.Models;

namespace _28JULY.Services
{
    public class CourseService : ICourseService
    {
        private readonly List<Course> courses = new List<Course>
        {
            new Course { Id = 1, Title = "ASP.NET Core", Credits = 4, Duration = 12 },
            new Course { Id = 2, Title = "Web API", Credits = 3, Duration = 8 }
        };

        public List<Course> GetAllCourses()
        {
            return courses;
        }

        public Course? GetCourseById(int id)
        {
            return courses.FirstOrDefault(c => c.Id == id);
        }

        public void AddCourse(Course course)
        {
            courses.Add(course);
        }

        public bool UpdateCourse(int id, Course course)
        {
            var existingCourse = courses.FirstOrDefault(c => c.Id == id);

            if (existingCourse == null)
                return false;

            existingCourse.Title = course.Title;
            existingCourse.Credits = course.Credits;
            existingCourse.Duration = course.Duration;

            return true;
        }

        public bool DeleteCourse(int id)
        {
            var course = courses.FirstOrDefault(c => c.Id == id);

            if (course == null)
                return false;

            courses.Remove(course);
            return true;
        }
    }
}

