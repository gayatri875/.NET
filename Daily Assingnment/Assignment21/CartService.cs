using ShopEase.Models;
namespace ShopEase.Services
{
    public class CartService
    {
        //Add product
        public void AddTocart(Cart cart, Product product, int quantity)
        {
            CartItem item = new CartItem(product, quantity);
            cart.CartItems.Add(item);
            Console.WriteLine("product Added To cart");
        }

        //View cart
        public void ViewCart(Cart cart)
        {
            cart.DisplayCart();
        }

        //remove Product from cart
        public void RemoveFromCart(Cart cart, int productId)
        {
            CartItem? item = null;
            foreach(CartItem cartItem in cart.CartItems)
            {
                if(cartItem.Product.ProductId == productId)
                {
                    item = cartItem;
                    break;
                }
            }

            if(item != null)
            {
                cart.CartItems.Remove(item);
                Console.WriteLine("Product removed Successfully");
            }
            else
            {
                Console.WriteLine("Product not Found");
            }
        }

        // Update Quantity
        public void UpdateQuantity(Cart cart, int productId, int quantity)
        {
            foreach(CartItem item in cart.CartItems)
            {
                if(item.Product.ProductId == productId)
                {
                    item.Quantity = quantity;
                    Console.WriteLine("Quantity Updated");
                    return;
                }
            }

            Console.WriteLine("product Not Found");
        }


        //Clear Cart
        public void ClearCart(Cart cart)
        {
            cart.CartItems.Clear();
            Console.WriteLine("Cart Cleared");
        }


        //Get TOtal
        public double GetTotal(Cart cart)
        {
            double total =0;
            foreach(CartItem item in cart.CartItems)
            {
                total += item.GetTotal();
            }
            return total;
        }


    }
}