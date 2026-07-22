using AutomobileManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace AutomobileManagement.Controllers
{
    public class AutomobileController : Controller
    {
        // GET
        public IActionResult Register()
        {
            return View();
        }

        // POST
        [HttpPost]
        public IActionResult Register(Automobile automobile)
        {
            if (ModelState.IsValid)
            {
                TempData["Message"] = "Automobile Registered Successfully";
                TempData["VehicleName"] = automobile.VehicleName;
                TempData["Brand"] = automobile.Brand;

                return RedirectToAction("Success");
            }

            return View(automobile);
        }

        public IActionResult Success()
        {
            return View();
        }
    }
}