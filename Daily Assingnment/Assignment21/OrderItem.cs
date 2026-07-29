namespace ShopEase.Models
{
    public class OrderItem
    {
        public Product Product { get; set; }

        public int Quantity { get; set; }

        public double UnitPrice { get; set; }

        public OrderItem()
        {
        }

        public OrderItem(Product product, int quantity, double unitPrice)
        {
            Product = product;
            Quantity = quantity;
            UnitPrice = unitPrice;
        }

        public double GetTotal()
        {
            return Quantity * UnitPrice;
        }

        public void DisplayOrderItem()
        {
            Console.WriteLine("--------------------------------");
            Console.WriteLine($"Product    : {Product.Name}");
            Console.WriteLine($"Quantity   : {Quantity}");
            Console.WriteLine($"Unit Price : {UnitPrice}");
            Console.WriteLine($"Total      : {GetTotal()}");
            Console.WriteLine("--------------------------------");
        }
    }
}