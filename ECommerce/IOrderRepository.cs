using ECommerce.Models;

namespace ECommerce.Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllAsync();

        Task<Order?> GetByIdAsync(int id);

        Task<IEnumerable<Order>> GetByCustomerIdAsync(int customerId);

        Task<Order> AddAsync(Order order);

        Task<Order> UpdateAsync(Order order);

        Task<bool> DeleteAsync(int id);
    }
}