
using System;

class Program
{
    static void Main(string[] args)
    {
        AgeValidator validator = new AgeValidator();

        try
        {
            Console.Write("Enter your age: ");
            int age = Convert.ToInt32(Console.ReadLine());

            validator.CheckAge(age);
        }
        catch (InvalidAgeException ex)
        {
            Console.WriteLine("User Defined Exception: " + ex.Message);
        }
        catch (FormatException)
        {
            Console.WriteLine("Please enter a valid number.");
        }
        finally
        {
            Console.WriteLine("Program execution completed.");
        }
    }
}