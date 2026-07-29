using ShopEase.Models;
namespace ShopEase.Services
{
    public class ReportService
    {
        //View Order History
        public void ViewOrderHistory(List<Order> orders)
        {
            if(orders.Count == 0)
            {
                Console.WriteLine("No Orders Found");
                return;
            }

            foreach(Order order in orders)
            {
                order.DisplayOrder();
            }
        }

        //Search order
        public void SearchOrder(List<Order> orders, int orderId)
        {
            foreach(Order order in orders)
            {
                if(order.OrderId == orderId)
                {
                    order.DisplayOrder();
                    return;
                }
            }
            Console.WriteLine("Order Not Found");
        }


        //Generate Invoice
        public void GenerateInvoice(Invoice invoice)
        {
            invoice.DisplayInvoice();
        }
    }
}