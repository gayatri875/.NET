namespace ShopEase.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Address { get; set; }

        public string MobileNumber { get; set; }

        public Customer()
        {
        }

        public Customer(int customerId, string name, string email,
                        string password, string address, string mobileNumber)
        {
            CustomerId = customerId;
            Name = name;
            Email = email;
            Password = password;
            Address = address;
            MobileNumber = mobileNumber;
        }

        public void DisplayCustomer()
        {
            Console.WriteLine("----------- Customer Details -----------");
            Console.WriteLine($"Customer ID   : {CustomerId}");
            Console.WriteLine($"Name          : {Name}");
            Console.WriteLine($"Email         : {Email}");
            Console.WriteLine($"Address       : {Address}");
            Console.WriteLine($"Mobile Number : {MobileNumber}");
            Console.WriteLine("----------------------------------------");
        }
    }
}