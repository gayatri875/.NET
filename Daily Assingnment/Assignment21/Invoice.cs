namespace ShopEase.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }

        public Order Order { get; set; }

        public DateTime InvoiceDate { get; set; }

        public double GST { get; set; }

        public double Discount { get; set; }

        public double GrandTotal { get; set; }

        public Invoice()
        {
        }

        public Invoice(int invoiceId, Order order, DateTime invoiceDate,
                       double gst, double discount, double grandTotal)
        {
            InvoiceId = invoiceId;
            Order = order;
            InvoiceDate = invoiceDate;
            GST = gst;
            Discount = discount;
            GrandTotal = grandTotal;
        }

        public void DisplayInvoice()
        {
            Console.WriteLine("\n========== INVOICE ==========");
            Console.WriteLine($"Invoice ID   : {InvoiceId}");
            Console.WriteLine($"Invoice Date : {InvoiceDate}");
            Console.WriteLine($"Order ID     : {Order.OrderId}");
            Console.WriteLine($"Customer     : {Order.Customer.Name}");
            Console.WriteLine($"GST          : {GST}");
            Console.WriteLine($"Discount     : {Discount}");
            Console.WriteLine($"Grand Total  : {GrandTotal}");
            Console.WriteLine("=============================");
        }
    }
}