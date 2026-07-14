using System;

public class Product
{
    public int ProductId{get;set;}
    public string ProductName{get;set;}
    public double Price{get;set;}
    public int Stock{get;set;}

    public Product(int productId, string productname, double price, int stock)
    {
        ProductId = productId;
        ProductName = productname;
        Price = price;
        Stock = stock;
        
    }

    public void DisplayProduct()
    {
        Console.WriteLine($"Product ID : {ProductId}");
        Console.WriteLine($"Product Name : {ProductName}");
        Console.WriteLine($"Price : {Price}");
        Console.WriteLine($"Stock : {Stock}");
    }
}