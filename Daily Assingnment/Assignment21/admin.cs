namespace ShopEase.Models
{
    public class Admin
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public Admin()
        {
        }

        public Admin(string username, string password)
        {
            Username = username;
            Password = password;
        }

        public void DisplayAdmin()
        {
            Console.WriteLine("----------- Admin Details -----------");
            Console.WriteLine($"Username : {Username}");
            Console.WriteLine("-------------------------------------");
        }
    }
}