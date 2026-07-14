using System;

public class PurchaseManager : IBill
{
    public void GenerateBill(StationeryItem item, int quantity)
    {
        double amount = item.Price * quantity;
        double discount = item.CalculateDiscount(amount);

        double gst = (amount - discount) * 0.18;

        double total = amount - discount + gst;

        item.Quantity -= quantity;

        Console.WriteLine("--------------------------------");
        Console.WriteLine("Bill");
        Console.WriteLine("--------------------------------");
        Console.WriteLine($"Item      : {item.ItemName}");
        Console.WriteLine($"Price     : {item.Price}");
        Console.WriteLine($"Quantity  : {quantity}");
        Console.WriteLine($"Discount  : {discount}");
        Console.WriteLine($"GST       : {gst}");
        Console.WriteLine($"Total     : {total}");
        Console.WriteLine("--------------------------------");
    }
}