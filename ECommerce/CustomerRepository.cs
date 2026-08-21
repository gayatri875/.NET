using ECommerce.Data;
using ECommerce.Models;
using ECommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly AppDbContext _context;

        public CustomerRepository(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL CUSTOMERS
        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            return await _context.Customers
                .ToListAsync();
        }

        // GET CUSTOMER BY CUSTOMER ID
        public async Task<Customer?> GetByIdAsync(int id)
        {
            return await _context.Customers
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        // GET CUSTOMER BY USER ID
        public async Task<Customer?> GetByUserIdAsync(int userId)
        {
            return await _context.Customers
                .FirstOrDefaultAsync(c => c.UserId == userId);
        }

        // CREATE CUSTOMER
        public async Task<Customer> AddAsync(Customer customer)
        {
            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        // UPDATE CUSTOMER
        public async Task<Customer> UpdateAsync(Customer customer)
        {
            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        // DELETE CUSTOMER
        public async Task<bool> DeleteAsync(int id)
        {
            var customer =
                await _context.Customers
                    .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return false;
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}