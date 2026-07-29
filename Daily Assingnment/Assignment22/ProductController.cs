using _22JULY.Models;
using Microsoft.AspNetCore.Mvc;

namespace _22JULY.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            if (Session.["User"] == null)
            {
                return RedirectToAction("Login", "Home");
            }

            List<Product> products = new List<Product>()
            {
                new Product{ID=1, Name="Laptop", Price=20000},
                 new Product{ID=2, Name="Bag", Price=20000},
                  new Product{ID=3, Name="Earphone", Price=20000},
                   new Product{ID=4, Name="Laptop", Price=20000},
            };
            return View(products);
            
        }
    }
}
