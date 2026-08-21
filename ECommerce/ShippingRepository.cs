using ECommerce.Data;
using ECommerce.Models;
using ECommerce.Repository;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.RepositoryImplementation
{
    public class ShippingRepository : IShippingRepository
    {
        private readonly AppDbContext _context;

        public ShippingRepository(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET ALL SHIPPING
        // ==========================================
        public async Task<IEnumerable<Shipping>> GetAllAsync()
        {
            return await _context.Shippings
                .Include(s => s.Order)
                .ToListAsync();
        }

        // ==========================================
        // GET SHIPPING BY ID
        // ==========================================
        public async Task<Shipping?> GetByIdAsync(int id)
        {
            return await _context.Shippings
                .Include(s => s.Order)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        // ==========================================
        // GET SHIPPING BY ORDER ID
        // ==========================================
        public async Task<Shipping?> GetByOrderIdAsync(int orderId)
        {
            return await _context.Shippings
                .Include(s => s.Order)
                .FirstOrDefaultAsync(
                    s => s.OrderId == orderId);
        }

        // ==========================================
        // CREATE SHIPPING
        // ==========================================
        public async Task<Shipping> AddAsync(
            Shipping shipping)
        {
            await _context.Shippings.AddAsync(shipping);

            await _context.SaveChangesAsync();

            return shipping;
        }

        // ==========================================
        // UPDATE SHIPPING
        // ==========================================
        public async Task<Shipping> UpdateAsync(
            Shipping shipping)
        {
            _context.Shippings.Update(shipping);

            await _context.SaveChangesAsync();

            return shipping;
        }

        // ==========================================
        // DELETE SHIPPING
        // ==========================================
        public async Task<bool> DeleteAsync(int id)
        {
            var shipping =
                await _context.Shippings
                    .FirstOrDefaultAsync(s => s.Id == id);

            if (shipping == null)
            {
                return false;
            }

            _context.Shippings.Remove(shipping);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}