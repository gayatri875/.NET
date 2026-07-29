namespace ShopEase.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        public Customer Customer { get; set; }

        public List<OrderItem> OrderItems { get; set; }

        public DateTime OrderDate { get; set; }

        public double TotalAmount { get; set; }

        public string PaymentStatus { get; set; }

        public Order()
        {
            OrderItems = new List<OrderItem>();
        }

        public Order(int orderId, Customer customer, DateTime orderDate,
                     double totalAmount, string paymentStatus)
        {
            OrderId = orderId;
            Customer = customer;
            OrderDate = orderDate;
            TotalAmount = totalAmount;
            PaymentStatus = paymentStatus;
            OrderItems = new List<OrderItem>();
        }

        public void DisplayOrder()
        {
            Console.WriteLine("========== Order Details ==========");
            Console.WriteLine($"Order ID       : {OrderId}");
            Console.WriteLine($"Customer Name  : {Customer.Name}");
            Console.WriteLine($"Order Date     : {OrderDate}");
            Console.WriteLine($"Total Amount   : {TotalAmount}");
            Console.WriteLine($"Payment Status : {PaymentStatus}");

            Console.WriteLine("\nOrder Items");

            foreach (OrderItem item in OrderItems)
            {
                item.DisplayOrderItem();
            }

            Console.WriteLine("===================================");
        }
    }
}