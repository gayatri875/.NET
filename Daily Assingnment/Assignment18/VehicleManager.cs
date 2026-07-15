using System;
using System.Collections.Generic;
using System.Linq;

public class VehicleManager
{
    private List<Vehicle> vehicles = new List<Vehicle>();
    

    //Add Vehicle
    public void AddVehicle(Vehicle vehicle)
    {
        vehicles.Add(vehicle);
        Console.WriteLine("Vehicle Added Successfully");
    }

    //View All vehicles
    public void ViewAllVehicles()
    {
        if(vehicles.Count == 0)
        {
            Console.WriteLine("No vehicles available");
            return;
        }

        foreach(var vehicle in vehicles)
        {
            vehicle.DisplayDetails();
        }
    }

    //Search vehicle
    public Vehicle SearchVehicle(int vehicleId)
    {
        return vehicles.FirstOrDefault(v=>v.VehicleId == vehicleId);
    }

    //Update vehicle
    public void UpdatePrice(int vehicleId, double newPrice)
    {
        Vehicle vehicle = SearchVehicle(vehicleId);
        if(vehicle != null)
        {
            vehicle.Price = newPrice;
            Console.WriteLine("Vehicle Price Updated Successfully");
        }
        else
        {
            Console.WriteLine("Vehicle ID does not exists.");
        }
    }


    // Delete Vehicle
    public void DeleteVehicle(int vehicleId)
    {
        Vehicle vehicle = SearchVehicle(vehicleId);
        if(vehicle != null)
        {
            vehicles.Remove(vehicle);
            Console.WriteLine("Vehicle deleted Successfully.");
        }
        else
        {
            Console.WriteLine("Vehicle Not Available");
        }
    }




    }