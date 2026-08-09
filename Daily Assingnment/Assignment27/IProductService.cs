using _6July.Models;

namespace _6July.Repository
{
    public interface IProductService
    {
        List<Product> GetProducts();// fetch all product from product table

        Product? GetProductById(int id); // fetch product detail from product table based on pid

        void AddProduct(Product product); // add new product record in product table

        void UpdateProduct(Product product); // modify product details from product table based on pid


        void DeleteProduct(int id); // remove product from product table bbased on pid
    }
}
