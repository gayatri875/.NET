using ShopEase.Models;
namespace ShopEase.Services
{
    public class OrderService
    {
        private List<Order> orders = new List<Order>();

        //Place Order
        public void PlaceOrder(Order order)
        {
            orders.Add(order);
            Console.WriteLine("Order Placed Successfully");
        }

        // View All Orders
        public void ViewOrders()
        {
            if(orders.Count == 0)
            {
                Console.WriteLine("No Orders found");
                return;
            }

            foreach(Order order in orders)
            {
                order.DisplayOrder();
            }
        }

        // Search Order
        public Order SearchOrder(int orederId)
        {
            foreach(Order order in orders)
            {
                if(order.OrderId == orederId)
                {
                    return order;
                }
            }
            return null;
        }


        //CheckOut
        public Order Checkout(Customer customer, Cart cart, int orderId)
        {
            Order order = new Order();
            order.OrderId = orderId;
            order.Customer = customer;
            order.OrderDate = DateTime.Now;
            order.TotalAmount = 0;
            order. PaymentStatus = "Pending";

            foreach(CartItem item in cart.CartItems)
            {
                OrderItem orderItem = new OrderItem(item.Product, item.Quantity, item.Product.Price);
                order.OrderItems.Add(orderItem);
                order.TotalAmount += orderItem.GetTotal();

            }

            orders.Add(order);
            Console.WriteLine("ChackOut Successful");
            return order;
        }
    }
}