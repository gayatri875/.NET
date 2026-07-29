using _29July_Assignment.Models;

namespace _29July_Assignment.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly List<Vehicle> vehicles = new List<Vehicle>()
        {
            new Vehicle
            {
                Id = 1,
                VehicleName = "Swift",
                Brand = "Maruti",
                Price = 700000,
                FuelType = "Petrol"
            },
            new Vehicle
            {
                Id = 2,
                VehicleName = "Nexon",
                Brand = "Tata",
                Price = 1200000,
                FuelType = "Diesel"
            }
        };

        public List<Vehicle> GetAllVehicles()
        {
            return vehicles;
        }

        public Vehicle? GetVehicleById(int id)
        {
            return vehicles.FirstOrDefault(v => v.Id == id);
        }

        public void AddVehicle(Vehicle vehicle)
        {
            vehicles.Add(vehicle);
        }

        public bool UpdateVehicle(int id, Vehicle vehicle)
        {
            var existingVehicle = vehicles.FirstOrDefault(v => v.Id == id);

            if (existingVehicle == null)
                return false;

            existingVehicle.VehicleName = vehicle.VehicleName;
            existingVehicle.Brand = vehicle.Brand;
            existingVehicle.Price = vehicle.Price;
            existingVehicle.FuelType = vehicle.FuelType;

            return true;
        }

        public bool DeleteVehicle(int id)
        {
            var vehicle = vehicles.FirstOrDefault(v => v.Id == id);

            if (vehicle == null)
                return false;

            vehicles.Remove(vehicle);
            return true;
        }
    }
}
