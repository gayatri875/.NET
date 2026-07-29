using _22JULY.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace _22JULY.Controllers
{
    public class HomeController : Controller
    {
        //Get
        public IActionResult Login()
        {
            return View();
        }


        //Post
        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            if(username == "admin" && password == "12345")
            {
                Session["User"] = username;
                return RedirectToAction("Index", "Product");
            }

            ViewBag.Message = "Invalis Username or Password";
            return View();
        }
        
    }
}
