using System;

public class Vehicle
{
    public int VehicleId{get;set;}
    public string VehicleName{get;set;}
    public string VehicleType{get;set;}
    public string Brand{get;set;}
    public double Price{get;set;}
    public int ManufacturingYear{get;set;}


    public Vehicle(int vehicleId, string vehicleName, string vehicleType, string brand, double price, int manufact)
    {
        VehicleId = vehicleId;
        VehicleName = vehicleName;
        VehicleType = vehicleType;
        Brand = brand;
        Price = price;
        ManufacturingYear = manufact;
    }


    public virtual void DisplayDetails()
    {
        Console.WriteLine("----------------------------");
        Console.WriteLine($"Vehicle ID : {VehicleId}");
        Console.WriteLine($"Vehicle Name : {VehicleName}");
        Console.WriteLine($"Vehicle Type : {VehicleType}");
        Console.WriteLine($"Brand : {Brand}");
        Console.WriteLine($"Price : {Price}");
        Console.WriteLine($"Manufacturing Year : {ManufacturingYear}");
    }
}
