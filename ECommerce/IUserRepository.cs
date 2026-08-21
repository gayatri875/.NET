using ECommerce.Models;
using ECommerceAPI.Models;

namespace ECommerce.Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();

        Task<User?> GetByIdAsync(int id);

        Task<User?> GetByEmailAsync(string email);

        Task<User> AddAsync(User user);

        Task<User> UpdateAsync(User user);

        Task<bool> DeleteAsync(int id);
    }
}