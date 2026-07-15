using System;

public class Car : Vehicle
{
    public Car(int vehicleId, string vehicleName, string brand, double price, int manufact) : base(vehicleId, vehicleName ,"Car", brand , price, manufact)
    {
        
    }

    public override void DisplayDetails()
    {
        base.DisplayDetails();
        Console.WriteLine("Car is a Four Wheeler");
        Console.WriteLine("Suitable for family");
    }
}