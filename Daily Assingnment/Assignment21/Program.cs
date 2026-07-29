using ShopEase.Models;
using ShopEase.Services;
using ShopEase.Helpers;

namespace ShopEase
{
    internal class Program
    {
        static void Main(string[] args)
        {
            AuthenticationService authenticationService = new AuthenticationService();
            CategoryService categoryService = new CategoryService();
            ProductService productService = new ProductService();
            CustomerService customerService = new CustomerService();
            CartService cartService = new CartService();
            OrderService orderService = new OrderService();
            PaymentService paymentService = new PaymentService();
            ReportService reportService = new ReportService();

            Cart cart = new Cart();
            Customer loggedInCustomer = null;

            bool exit = false;

            while (!exit)
            {
                Menu.MainMenu();

                Console.Write("Enter Your Choice: ");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        // Admin Login
                        break;

                    case 2:
                        // Customer Register
                        break;

                    case 3:
                        // Customer Login
                        break;

                    case 4:
                        exit = true;
                        Console.WriteLine("Thank You...");
                        break;

                    default:
                        Console.WriteLine("Invalid Choice.");
                        break;
                }
            }
        }
    }
}
