using ECommerce.Data;
using ECommerce.Models;
using ECommerce.Repository;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.RepositoryImplementation
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET CART BY CUSTOMER ID
        // ==========================================
        public async Task<Cart?> GetByCustomerIdAsync(
            int customerId)
        {
            return await _context.Carts
                .Include(c => c.Items)
                    .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(
                    c => c.CustomerId == customerId);
        }

        // ==========================================
        // GET CART BY CART ID
        // ==========================================
        public async Task<Cart?> GetByIdAsync(int id)
        {
            return await _context.Carts
                .Include(c => c.Items)
                    .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(
                    c => c.Id == id);
        }

        // ==========================================
        // GET CART ITEM BY ID
        // ==========================================
        public async Task<CartItem?> GetCartItemByIdAsync(
            int cartItemId)
        {
            return await _context.CartItems
                .FirstOrDefaultAsync(
                    i => i.Id == cartItemId);
        }

        // ==========================================
        // CREATE CART
        // ==========================================
        public async Task<Cart> AddAsync(
            Cart cart)
        {
            await _context.Carts.AddAsync(cart);

            await _context.SaveChangesAsync();

            return cart;
        }

        // ==========================================
        // UPDATE CART
        // ==========================================
        public async Task<Cart> UpdateAsync(
            Cart cart)
        {
            _context.Carts.Update(cart);

            await _context.SaveChangesAsync();

            return cart;
        }

        // ==========================================
        // UPDATE CART ITEM
        // ==========================================
        public async Task<CartItem> UpdateCartItemAsync(
            CartItem cartItem)
        {
            _context.CartItems.Update(cartItem);

            await _context.SaveChangesAsync();

            return cartItem;
        }

        // ==========================================
        // DELETE CART ITEM
        // ==========================================
        public async Task<bool> DeleteCartItemAsync(
            int cartItemId)
        {
            var cartItem =
                await _context.CartItems
                    .FirstOrDefaultAsync(
                        i => i.Id == cartItemId);

            if (cartItem == null)
            {
                return false;
            }

            _context.CartItems.Remove(cartItem);

            await _context.SaveChangesAsync();

            return true;
        }

        // ==========================================
        // CLEAR CUSTOMER CART
        // ==========================================
        public async Task<bool> ClearByCustomerIdAsync(
            int customerId)
        {
            var cart =
                await _context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefaultAsync(
                        c => c.CustomerId == customerId);

            if (cart == null)
            {
                return false;
            }

            if (cart.Items.Any())
            {
                _context.CartItems.RemoveRange(
                    cart.Items);

                await _context.SaveChangesAsync();
            }

            return true;
        }
    }
}