using System;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("=======Customer Registration======");

        //Read the in p;ut
        Console.WriteLine("Enter Customer ID : ");
        int customerId = Convert.ToInt32(Console.ReadLine());

        Console.WriteLine("Enter Name : ");
        string name = Console.ReadLine();

        Console.WriteLine("Enter Email : ");
        string email = Console.ReadLine();

        Console.WriteLine("Enter Password : ");
        string password = Console.ReadLine();


        Customer customer = new Customer(customerId, name, email, password);

        Console.WriteLine("\n Registration Succcessful");



        //Customer login
        Console.WriteLine("=======Customer Login======");
        int attempts = 0;
        while (attempts < 3)
        {

            Console.WriteLine("Enter Email");
            string loginemail = Console.ReadLine();


            Console.WriteLine("Enter Password");
            string loginpassword = Console.ReadLine();


            if (loginemail == customer.Email && loginpassword == customer.Password)
            {
                Console.WriteLine($"Welcome : {customer.Name}");
                return;
            }

            else
            {
                attempts++;
                Console.WriteLine("Invalid Email and Password");
            }


        }
        Console.WriteLine("Account Locked");


    }
}
