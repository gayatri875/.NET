using System;

class Assignment3
{
    

    public static void Show()
    {
        // Array Declaration of sales of 6 Employees
        int[] sales = { 25000, 32000, 40000, 35000, 88000, 44000 };

        // Variables for storing
        int total = 0;
        int highest = sales[0];
        int lowest = sales[0];

        Console.WriteLine("Monthly Sales Of Employees:");

        // Loop to access Array
        foreach (int s in sales)
        {
            // Display Current Employee Sales
            Console.WriteLine("₹" + s);

            // Add current sales
            total += s;

            // Check for greater sales
            if (s > highest)
            {
                highest = s;
            }

            // Check for lowest sales
            if (s < lowest)
            {
                lowest = s;
            }
        }

        // Calculate Average Sales
        double average = (double)total / sales.Length;

        // Display total sales
        Console.WriteLine("\nTotal Sales = ₹" + total);

        // Display average sales
        Console.WriteLine("Average Sales = ₹" + average);

        // Display highest sales
        Console.WriteLine("Highest Sales = ₹" + highest);

        // Display lowest sales
        Console.WriteLine("Lowest Sales = ₹" + lowest);
    }
}