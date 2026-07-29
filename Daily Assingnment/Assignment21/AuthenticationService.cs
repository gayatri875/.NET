using ShopEase.Models;
namespace ShopEase.Services
{
    public class AuthenticationService
    {
        private List<Customer> customers = new List<Customer>();
        private Admin admin = new Admin("admin", "addim123");

        //customer registration
        public void Register(Customer customer)
        {
            customers.Add(customer);
            Console.WriteLine("registration Successful");
        }

        // customer Loigin
        public Customer CustomerLogin(string email, string pasword)
        {
            foreach (Customer customer in customers)
            {
                if(customer.Email == email && customer.Password == pasword)
                {
                    Console.WriteLine("Customer Loigin Successfull");
                    return customer;
                }
            }

            Console.WriteLine("Invalid Email or Password");
            return null;
        }


        //Admin Login
        public bool AdminLogin(string username, string password)
        {
            if(admin.Username == username && admin.Password == password)
            {
                Console.WriteLine("Admin login Successful");
                return true;
            }

            Console.WriteLine("Invalid Username or Password");
            return false;
        }

        //Logout
        public void logout()
        {
            Console.WriteLine("Logged Out Succeesfully");
        }
    }
}