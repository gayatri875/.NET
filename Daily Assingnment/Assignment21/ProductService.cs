using ShopEase.Models;
namespace ShopEase.Services
{
    public class ProductService
    {
        private List<Product> products = new List<Product>();

        //Addproduct
        public void AddProduct(Product product)
        {
            products.Add(product);
            Console.WriteLine("Product Added Successfully");
        }

        //view products
        public void ViewProducts()
        {
            if(products.Count == 0)
            {
                Console.WriteLine("No Products Available");
                return;
            }

            foreach(Product product in products)
            {
                product.DisplayProduct();
            }
        }

        //search product
        public Product SearchProduct(int productId)
        {
            foreach(Product product in products)
            {
                if(product.ProductId == productId)
                {
                    return product;
                }
            }
            return null;
        }


        //update product
        public void UpdateProduct(int productId, double price, int quantity)
        {
            Product product = SearchProduct(productId);
            if(product != null)
            {
                product.Price = price;
                product.Quantity = quantity;
                Console.WriteLine("Product Updated Succeessfully");
            }
            else
            {
                Console.WriteLine("Product Not Found");
            }
        }

        // Delete
        public void DeleteProduct(int productId)
        {
            Product product  = SearchProduct(productId);
            if(product != null)
            {
                products.Remove(product);
                Console.WriteLine("product Del;eted Successfully");

            }
            else
            {
                Console.WriteLine("product not Found");
            }
        }
    }
}