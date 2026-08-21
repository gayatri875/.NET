using ECommerce.Data;
using ECommerce.Models;
using ECommerce.Repository;
using ECommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.RepositoryImplementation
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> AddAsync(User user)
        {
            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> UpdateAsync(User user)
        {
            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}