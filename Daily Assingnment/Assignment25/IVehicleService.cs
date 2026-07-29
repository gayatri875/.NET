using _29July_Assignment.Models;

namespace _29July_Assignment.Services
{
    public interface IVehicleService
    {
        List<Vehicle> GetAllVehicles();

        Vehicle? GetVehicleById(int id);

        void AddVehicle(Vehicle vehicle);

        bool UpdateVehicle(int id, Vehicle vehicle);

        bool DeleteVehicle(int id);
    }
}
