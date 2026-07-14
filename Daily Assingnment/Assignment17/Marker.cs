using System;

public class Marker : StationeryItem
{
    public bool Permanent{get;set;}
   

    public override void DisplayDetails()
    {
        base.DisplayDetails();
        Console.WriteLine($"Permanent : {Permanent}");
       
    }


    public override double CalculateDiscount(double amount)
    {
        return amount * 0.8;
    }
}