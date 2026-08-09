using _6July.Data;
using _6July.Models;
using _6July.Repository;

namespace _6July.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext context;

        public ProductService(AppDbContext context)
        {
            this.context = context;
        }
        public void AddProduct(Product product)
        {
            context.products.Add(product);
            context.SaveChanges();
        }

        public void DeleteProduct(int id)
        {
            var product = context.products.Find(id);
            if(product != null){
                context.products.Remove(product);
                context.SaveChanges();
            }
        }

        public Product? GetProductById(int id)
        {
            return context.products.Find(id);
        }

        public List<Product> GetProducts()
        {
            return context.products.ToList();
        }


        public void UpdateProduct(Product product)
        {
            context.products.Update(product);
            context.SaveChanges();
        }
    }
}
