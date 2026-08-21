using ECommerce.Models;

namespace ECommerce.Repository
{
    public interface IShippingRepository
    {
        Task<IEnumerable<Shipping>> GetAllAsync();

        Task<Shipping?> GetByIdAsync(int id);

        Task<Shipping?> GetByOrderIdAsync(int orderId);

        Task<Shipping> AddAsync(Shipping shipping);

        Task<Shipping> UpdateAsync(Shipping shipping);

        Task<bool> DeleteAsync(int id);
    }
}