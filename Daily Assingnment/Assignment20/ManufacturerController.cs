using AutomobileManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace AutomobileManagement.Controllers
{
    public class ManufacturerController : Controller
    {
        public IActionResult Details()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Details(Manufacturer manufacturer)
        {
            if (ModelState.IsValid)
            {
                return View(manufacturer);
            }
            return View(manufacturer);
        }
    }
}
