using System;

public class Notebook : StationeryItem
{
    public int Pages{get;set;}
    public string PaperType{get;set;}

    public override void DisplayDetails()
    {
        base.DisplayDetails();
        Console.WriteLine($"Pages : {Pages}");
        Console.WriteLine($"Paper Type : {PaperType}");
    }


    public override double CalculateDiscount(double amount)
    {
        return amount * 0.10;
    }
}