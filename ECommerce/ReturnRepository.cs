using ECommerce.Data;
using ECommerce.Models;
using ECommerce.Repository;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.RepositoryImplementation
{
    public class ReturnRepository : IReturnRepository
    {
        private readonly AppDbContext _context;

        public ReturnRepository(AppDbContext context)
        {
            _context = context;
        }

        // Get all return requests
        public async Task<IEnumerable<Return>> GetAllAsync()
        {
            return await _context.Returns
                .Include(r => r.Order)
                .Include(r => r.Product)
                .ToListAsync();
        }

        // Get return by Id
        public async Task<Return?> GetByIdAsync(int id)
        {
            return await _context.Returns
                .Include(r => r.Order)
                .Include(r => r.Product)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        // Get returns by OrderId
        public async Task<IEnumerable<Return>> GetByOrderIdAsync(int orderId)
        {
            return await _context.Returns
                .Include(r => r.Product)
                .Where(r => r.OrderId == orderId)
                .ToListAsync();
        }

        // Create return request
        public async Task<Return> AddAsync(Return returnRequest)
        {
            await _context.Returns.AddAsync(returnRequest);
            await _context.SaveChangesAsync();

            return returnRequest;
        }

        // Update return request
        public async Task<Return> UpdateAsync(Return returnRequest)
        {
            _context.Returns.Update(returnRequest);
            await _context.SaveChangesAsync();

            return returnRequest;
        }

        // Delete return request
        public async Task<bool> DeleteAsync(int id)
        {
            var returnRequest = await _context.Returns
                .FirstOrDefaultAsync(r => r.Id == id);

            if (returnRequest == null)
            {
                return false;
            }

            _context.Returns.Remove(returnRequest);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}