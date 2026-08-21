using ECommerce.Models;
using ECommerceAPI.Models;

namespace ECommerce.Repository
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAllAsync();

        Task<Customer?> GetByIdAsync(int id);

        Task<Customer?> GetByUserIdAsync(int userId);

        Task<Customer> AddAsync(Customer customer);

        Task<Customer> UpdateAsync(Customer customer);

        Task<bool> DeleteAsync(int id);
    }
}