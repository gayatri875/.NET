using _28JULY.Models;

namespace _28JULY.Interfaces
{
    public interface ICourseService
    {
        List<Course> GetAllCourses();

        Course? GetCourseById(int id);
        void AddCourse(Course course);
        bool UpdateCourse(int id, Course course);
        bool DeleteCourse(int id);

    }
}
