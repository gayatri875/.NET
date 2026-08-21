using ECommerce.Data;
using ECommerce.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> AddAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product> UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return product;
        }

        // Search Product
        public async Task<IEnumerable<Product>> SearchAsync(string keyword)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Where(p => p.Name.Contains(keyword))
                .ToListAsync();
        }

        // Filter Product
        public async Task<IEnumerable<Product>> FilterAsync(
            decimal? minPrice,
            decimal? maxPrice,
            int? categoryId)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .AsQueryable();

            if (minPrice.HasValue)
            {
                query = query.Where(
                    p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(
                    p => p.Price <= maxPrice.Value);
            }

            if (categoryId.HasValue)
            {
                query = query.Where(
                    p => p.CategoryId == categoryId.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateStockAsync(
        int productId,
                            int quantity)
          {
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == productId);

            if (product == null)
            {
                return false;
            }

            product.Stock = quantity;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}