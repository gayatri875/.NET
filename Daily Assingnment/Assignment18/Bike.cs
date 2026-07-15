using System;

public class Bike : Vehicle
{
    public Bike (int vehicleId, string vehicleName, string brand, double price, int manufact) : base(vehicleId, vehicleName ,"Bike", brand , price, manufact)
    {
        
    }

    public override void DisplayDetails()
    {
        base.DisplayDetails();
        Console.WriteLine("Bike is Fuel Efficient");
        Console.WriteLine("Suitable for City Rides");
    }
}