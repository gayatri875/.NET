using System;

class Program
{
    static void Main(string[] args)
    {
        int marks = 44;

        if (marks >= 90 && marks <= 100)
        {
            Console.WriteLine("Grade: A");
        }
        else if (marks >= 80)
        {
            Console.WriteLine("Grade: B");
        }
        else if (marks >= 70)
        {
            Console.WriteLine("Grade: C");
        }
        else if (marks >= 60)
        {
            Console.WriteLine("Grade: D");
        }
        else if (marks >= 40)
        {
            Console.WriteLine("Grade: E");
        }
        else if (marks >= 0)
        {
            Console.WriteLine("Grade: F (Fail)");
        }
        else
        {
            Console.WriteLine("Invalid marks!");
        }
    }
}

}