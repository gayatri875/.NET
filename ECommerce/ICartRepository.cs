using ECommerce.Models;

namespace ECommerce.Repository
{
    public interface ICartRepository
    {
        // Get cart by customer
        Task<Cart?> GetByCustomerIdAsync(int customerId);

        // Get cart by cart id
        Task<Cart?> GetByIdAsync(int id);

        // Get cart item by cart-item id
        Task<CartItem?> GetCartItemByIdAsync(int cartItemId);

        // Create cart
        Task<Cart> AddAsync(Cart cart);

        // Update cart
        Task<Cart> UpdateAsync(Cart cart);

        // Update cart item
        Task<CartItem> UpdateCartItemAsync(CartItem cartItem);

        // Delete cart item
        Task<bool> DeleteCartItemAsync(int cartItemId);

        // Clear all items of customer cart
        Task<bool> ClearByCustomerIdAsync(int customerId);
    }
}