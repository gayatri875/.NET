using ECommerce.DTOs.Category;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // ==========================================
        // GET ALL CATEGORIES
        // CUSTOMER + ADMIN
        // GET: api/Category
        // ==========================================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories =
                await _categoryService.GetAllAsync();

            return Ok(categories);
        }


        // ==========================================
        // GET CATEGORY BY ID
        // CUSTOMER + ADMIN
        // GET: api/Category/1
        // ==========================================
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category =
                await _categoryService.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound(new
                {
                    message = "Category not found."
                });
            }

            return Ok(category);
        }


        // ==========================================
        // CREATE CATEGORY
        // ADMIN ONLY
        // POST: api/Category
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateCategoryRequest request)
        {
            var category =
                await _categoryService.AddAsync(request);

            return CreatedAtAction(
                nameof(GetById),
                new { id = category.Id },
                category);
        }


        // ==========================================
        // UPDATE CATEGORY
        // ADMIN ONLY
        // PUT: api/Category/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            int id,
            CreateCategoryRequest request)
        {
            var category =
                await _categoryService.UpdateAsync(
                    id,
                    request);

            if (category == null)
            {
                return NotFound(new
                {
                    message = "Category not found."
                });
            }

            return Ok(category);
        }


        // ==========================================
        // DELETE CATEGORY
        // ADMIN ONLY
        // DELETE: api/Category/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted =
                await _categoryService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Category not found."
                });
            }

            return Ok(new
            {
                message = "Category deleted successfully."
            });
        }
    }
}