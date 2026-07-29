using System.Collections.Generic;

namespace ShopEase.Models
{
    public class Cart
    {
        public List<CartItem> CartItems { get; set; }

        public Cart()
        {
            CartItems = new List<CartItem>();
        }

        public void DisplayCart()
        {
            if (CartItems.Count == 0)
            {
                Console.WriteLine("Cart is Empty.");
                return;
            }

            Console.WriteLine("========== Shopping Cart ==========");

            foreach (CartItem item in CartItems)
            {
                item.DisplayCartItem();
            }

            Console.WriteLine("===================================");
        }
    }
}