using ECommerce.Data;
using ECommerce.Models;
using ECommerce.Repository;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.RepositoryImplementation
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // GET ALL ORDERS
        // ==========================================
        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .ToListAsync();
        }

        // ==========================================
        // GET ORDER BY ID
        // ==========================================
        public async Task<Order?> GetByIdAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        // ==========================================
        // GET ORDERS BY CUSTOMER
        // ==========================================
        public async Task<IEnumerable<Order>> GetByCustomerIdAsync(
            int customerId)
        {
            return await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .Where(o => o.CustomerId == customerId)
                .ToListAsync();
        }

        // ==========================================
        // CREATE ORDER
        // ==========================================
        public async Task<Order> AddAsync(Order order)
        {
            await _context.Orders.AddAsync(order);

            await _context.SaveChangesAsync();

            return order;
        }

        // ==========================================
        // UPDATE ORDER
        // ==========================================
        public async Task<Order> UpdateAsync(Order order)
        {
            _context.Orders.Update(order);

            await _context.SaveChangesAsync();

            return order;
        }

        // ==========================================
        // DELETE ORDER
        // ==========================================
        public async Task<bool> DeleteAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return false;
            }

            _context.Orders.Remove(order);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}