using System;

public class Truck : Vehicle
{
    public Truck (int vehicleId, string vehicleName, string brand, double price, int manufact) : base(vehicleId, vehicleName ,"Truck", brand , price, manufact)
    {
        
    }

    public override void DisplayDetails()
    {
        base.DisplayDetails();
        Console.WriteLine("Truck is ued for Transportation");
        Console.WriteLine("Heavy load Vehicle.");
    }
}