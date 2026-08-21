using ECommerce.Models;

namespace ECommerce.Repository
{
    public interface IReturnRepository
    {
        Task<IEnumerable<Return>> GetAllAsync();

        Task<Return?> GetByIdAsync(int id);

        Task<IEnumerable<Return>> GetByOrderIdAsync(int orderId);

        Task<Return> AddAsync(Return returnRequest);

        Task<Return> UpdateAsync(Return returnRequest);

        Task<bool> DeleteAsync(int id);
    }
}