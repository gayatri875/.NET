using System;

public class StationeryItem : Product{
    private int itemId;
    private string itemName;
    private string category;
    private string brand;
    private double price;
    private int quantity;


    public int ItemId
    {
        get{return itemId;}
        set{itemId = value;}
    }

    public string ItemName
    {
        get{return itemName;}
        set{itemName = value;}
    }

    public string Category
    {
        get{return category;}
        set{category = value;}
    }

    public string Brand
    {
        get{return brand;}
        set{brand = value;}
    }

    public double Price
    {
        get{return price;}
        set{
            if(value<=0)
            throw new InvalidPriceException();
            price = value;
        }
    }


    public int Quantity
    {
        get{return quantity;}
        set
        {
            if(value<=0)
            throw new InvalidQuantityException();
            quantity = value;
        }
    }


    //Display 
    public virtual void DisplayDetails()
    {
        Console.WriteLine($"ID : {itemId}");
        Console.WriteLine($"Name : {itemName}");
        Console.WriteLine($"Category : {category}");
        Console.WriteLine($"Brand : {brand}");
        Console.WriteLine($"Price : {price}");
        Console.WriteLine($"Quantity: {quantity}");
    }


    public void UpdateQuantity(int qty)
    {
        Quantity = qty;
    }


    //Override method
    public override double CalculateDiscount(double amount)
    {
        return 0;
    }
    
}