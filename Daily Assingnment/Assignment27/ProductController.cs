using _6July.Models;
using _6July.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _6July.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService service;

        public ProductController(IProductService service)
        {
            this.service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(service.GetProducts());
        }

        [HttpGet("{id}")]

        public IActionResult GetProduct(int id)
        {
            var product = service.GetProductById(id);
            if (product == null)
                return NotFound("Product is not available");
            return Ok(product);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            service.AddProduct(product);
            return Ok(product);
        }

        [HttpPut]
        public IActionResult UpdateProduct(Product product)
        {
            service.UpdateProduct(product);
            return Ok("product Update Successfully");
        }

        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            service.DeleteProduct(id);
            return Ok("Product Deleted Succcesfully");
        }
    }
}
