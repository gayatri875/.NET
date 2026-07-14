using System;

public class LoginManager
{
    private const string Username = "admin";
    private const string Password = "admin123";

    public void Login()
    {
        int attempts = 3;
        while(attempts > 0)
        {
            Console.Write("Enter Username : ");
            string username = Console.ReadLine();

            Console.Write("Enter Password : ");
            string password = Console.ReadLine();

            if(username == Username && password == Password)
            {
                Console.WriteLine("\nLogin Successfull");
                return;
            }

            attempts--;
            Console.WriteLine("\nInvalid Login");

            if (attempts > 0)
            {
                Console.WriteLine($"Attempts Left : {attempts}");
            }
        }

        throw new LoginFailedException();
    }
}