using System;

public class DiscountCalculator
{
    public void CalculateDiscount(Vehicle vehicle)
    {
        double discount = 0;

        switch (vehicle.VehicleType)
        {
            case "Car":
            discount = vehicle.Price * 0.10;
            break;

            case "Bike":
            discount = vehicle.Price * 0.05;
            break;

            case "Truck":
            discount = vehicle.Price * 0.12;
            break;

            default:
            Console.WriteLine("Invalid Vehicle Type:");
            return;

            
        }

        Console.WriteLine($"Vehicle Price: {vehicle.Price}");
        Console.WriteLine($"Discount :{discount}");
        Console.Write($"Final Price : {vehicle.Price - discount}");

    }
}