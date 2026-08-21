using ECommerce.DTOs.Category;
using ECommerce.Models;
using ECommerce.Repository;

namespace ECommerce.Services
{
    public class CategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<CategoryResponse>> GetAllAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();

            return categories.Select(MapToResponse);
        }

        public async Task<CategoryResponse?> GetByIdAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return null;
            }

            return MapToResponse(category);
        }

        public async Task<CategoryResponse> AddAsync(
            CreateCategoryRequest request)
        {
            var category = new Category
            {
                Name = request.Name,
                Description = request.Description
            };

            var createdCategory =
                await _categoryRepository.AddAsync(category);

            return MapToResponse(createdCategory);
        }

        public async Task<CategoryResponse?> UpdateAsync(
            int id,
            CreateCategoryRequest request)
        {
            var existingCategory =
                await _categoryRepository.GetByIdAsync(id);

            if (existingCategory == null)
            {
                return null;
            }

            existingCategory.Name = request.Name;
            existingCategory.Description = request.Description;

            var updatedCategory =
                await _categoryRepository.UpdateAsync(existingCategory);

            return MapToResponse(updatedCategory);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _categoryRepository.DeleteAsync(id);
        }

        private static CategoryResponse MapToResponse(Category category)
        {
            return new CategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description
            };
        }
    }
}