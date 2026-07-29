namespace ShopEase.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public int OrderId { get; set; }

        public string PaymentMethod { get; set; }

        public string PaymentStatus { get; set; }

        public double Amount { get; set; }

        public Payment()
        {
        }

        public Payment(int paymentId, int orderId, string paymentMethod,
                       string paymentStatus, double amount)
        {
            PaymentId = paymentId;
            OrderId = orderId;
            PaymentMethod = paymentMethod;
            PaymentStatus = paymentStatus;
            Amount = amount;
        }

        public void DisplayPayment()
        {
            Console.WriteLine("========== Payment Details ==========");
            Console.WriteLine($"Payment ID     : {PaymentId}");
            Console.WriteLine($"Order ID       : {OrderId}");
            Console.WriteLine($"Payment Method : {PaymentMethod}");
            Console.WriteLine($"Payment Status : {PaymentStatus}");
            Console.WriteLine($"Amount         : {Amount}");
            Console.WriteLine("=====================================");
        }
    }
}