using ECommerce.DTOs.Product;
using ECommerce.Models;
using ECommerce.Repository;

namespace ECommerce.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<ProductResponse>> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync();

            return products.Select(MapToResponse);
        }

        public async Task<ProductResponse?> GetByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);

            if (product == null)
            {
                return null;
            }

            return MapToResponse(product);
        }

        // SEARCH
        public async Task<IEnumerable<ProductResponse>> SearchAsync(
            string keyword)
        {
            var products =
                await _productRepository.SearchAsync(keyword);

            return products.Select(MapToResponse);
        }

        // FILTER
        public async Task<IEnumerable<ProductResponse>> FilterAsync(
            decimal? minPrice,
            decimal? maxPrice,
            int? categoryId)
        {
            var products =
                await _productRepository.FilterAsync(
                    minPrice,
                    maxPrice,
                    categoryId);

            return products.Select(MapToResponse);
        }

        public async Task<ProductResponse> AddAsync(
            CreateProductRequest request)
        {
            var product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Stock = request.Stock,
                ImageUrl = request.ImageUrl,
                CategoryId = request.CategoryId,
                IsActive = true
            };

            var createdProduct =
                await _productRepository.AddAsync(product);

            return MapToResponse(createdProduct);
        }

        public async Task<ProductResponse?> UpdateAsync(
            int id,
            UpdateProductRequest request)
        {
            var existingProduct =
                await _productRepository.GetByIdAsync(id);

            if (existingProduct == null)
            {
                return null;
            }

            existingProduct.Name = request.Name;
            existingProduct.Description = request.Description;
            existingProduct.Price = request.Price;
            existingProduct.Stock = request.Stock;
            existingProduct.ImageUrl = request.ImageUrl;
            existingProduct.CategoryId = request.CategoryId;
            existingProduct.IsActive = request.IsActive;

            var updatedProduct =
                await _productRepository.UpdateAsync(
                    existingProduct);

            return MapToResponse(updatedProduct);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _productRepository.DeleteAsync(id);
        }

        private static ProductResponse MapToResponse(
            Product product)
        {
            return new ProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                ImageUrl = product.ImageUrl,
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.Name,
                IsActive = product.IsActive
            };
        }
    }
}