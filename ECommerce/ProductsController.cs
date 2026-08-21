using ECommerce.DTOs.Product;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        // ==========================================
        // GET ALL PRODUCTS
        // CUSTOMER + ADMIN
        // GET: api/Product
        // ==========================================
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products =
                await _productService.GetAllAsync();

            return Ok(products);
        }


        // ==========================================
        // GET PRODUCT BY ID
        // CUSTOMER + ADMIN
        // GET: api/Product/1
        // ==========================================
        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product =
                await _productService.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound(new
                {
                    message = "Product not found."
                });
            }

            return Ok(product);
        }


        // ==========================================
        // SEARCH PRODUCT
        // CUSTOMER + ADMIN
        // GET: api/Product/search?keyword=mobile
        // ==========================================
        [Authorize]
        [HttpGet("search")]
        public async Task<IActionResult> Search(
            string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                return BadRequest(new
                {
                    message = "Keyword is required."
                });
            }

            var products =
                await _productService.SearchAsync(keyword);

            return Ok(products);
        }


        // ==========================================
        // FILTER PRODUCT
        // CUSTOMER + ADMIN
        // GET: api/Product/filter
        // ==========================================
        [Authorize]
        [HttpGet("filter")]
        public async Task<IActionResult> Filter(
            decimal? minPrice,
            decimal? maxPrice,
            int? categoryId)
        {
            if (minPrice.HasValue &&
                maxPrice.HasValue &&
                minPrice > maxPrice)
            {
                return BadRequest(new
                {
                    message =
                        "Minimum price cannot be greater than maximum price."
                });
            }

            var products =
                await _productService.FilterAsync(
                    minPrice,
                    maxPrice,
                    categoryId);

            return Ok(products);
        }


        // ==========================================
        // CREATE PRODUCT
        // ADMIN ONLY
        // POST: api/Product
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateProductRequest request)
        {
            var product =
                await _productService.AddAsync(request);

            return CreatedAtAction(
                nameof(GetById),
                new { id = product.Id },
                product);
        }


        // ==========================================
        // UPDATE PRODUCT
        // ADMIN ONLY
        // PUT: api/Product/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateProductRequest request)
        {
            var product =
                await _productService.UpdateAsync(
                    id,
                    request);

            if (product == null)
            {
                return NotFound(new
                {
                    message = "Product not found."
                });
            }

            return Ok(product);
        }


        // ==========================================
        // DELETE PRODUCT
        // ADMIN ONLY
        // DELETE: api/Product/1
        // ==========================================
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted =
                await _productService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Product not found."
                });
            }

            return Ok(new
            {
                message = "Product deleted successfully."
            });
        }
    }
}