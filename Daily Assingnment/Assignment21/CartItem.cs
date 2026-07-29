
namespace ShopEase.Models
{
    public class CartItem
    {
        public Product Product { get; set; }

        public int Quantity { get; set; }

        public CartItem()
        {
        }

        public CartItem(Product product, int quantity)
        {
            Product = product;
            Quantity = quantity;
        }

        public double GetTotal()
        {
            return Product.Price * Quantity;
        }

        public void DisplayCartItem()
        {
            Console.WriteLine("--------------------------------");
            Console.WriteLine($"Product : {Product.Name}");
            Console.WriteLine($"Price   : {Product.Price}");
            Console.WriteLine($"Quantity: {Quantity}");
            Console.WriteLine($"Total   : {GetTotal()}");
            Console.WriteLine("--------------------------------");
        }
    }
}