using ECommerce.Models;

namespace ECommerce.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();

        Task<Product?> GetByIdAsync(int id);

        Task<Product> AddAsync(Product product);

        Task<Product> UpdateAsync(Product product);

        Task<bool> DeleteAsync(int id);
        Task<bool> UpdateStockAsync(int productId, int quantity);

        Task<IEnumerable<Product>> SearchAsync(string keyword);

        Task<IEnumerable<Product>> FilterAsync(
            decimal? minPrice,
            decimal? maxPrice,
            int? categoryId);
    }
}