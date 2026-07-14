using System;

public class Assignment16

{
    public static void Main(string[] args)
    {
        Console.WriteLine("Choose Payment Method");
        Console.WriteLine("1. UPI");
        Console.WriteLine("2. Credit Card");
        Console.WriteLine("3. Debit Card");
        Console.WriteLine("4. Cash on Delivery");
        Console.Write("Enter Your Choice : ");

        int choice = Convert.ToInt32(Console.ReadLine());

        switch (choice)
        {
            case 1:
                Console.WriteLine("Payment Successful (UPI)");
                break;

            case 2:
                Console.WriteLine("Payment Successful (Credit Card)");
                break;

            case 3:
                Console.WriteLine("Payment Successful (Debit Card)");
                break;

            case 4:
                Console.WriteLine("Payment Successful (Cash on Delivery)");
                break;

            default:
                Console.WriteLine("Invalid Option");
                break;
        }
    }
}