namespace ShopEase.Helpers
{
    public class Menu
    {
        public static void MainMenu()
        {
            Console.WriteLine("\n========== ShopEase ==========");
            Console.WriteLine("1. Admin Login");
            Console.WriteLine("2. Customer Register");
            Console.WriteLine("3. Customer Login");
            Console.WriteLine("4. Exit");
        }

        public static void AdminMenu()
        {
            Console.WriteLine("\n========== Admin Menu ==========");
            Console.WriteLine("1. Category Management");
            Console.WriteLine("2. Product Management");
            Console.WriteLine("3. Logout");
        }

        public static void CustomerMenu()
        {
            Console.WriteLine("\n========== Customer Menu ==========");
            Console.WriteLine("1. View Products");
            Console.WriteLine("2. Add To Cart");
            Console.WriteLine("3. View Cart");
            Console.WriteLine("4. Checkout");
            Console.WriteLine("5. Order History");
            Console.WriteLine("6. Logout");
        }
    }
}