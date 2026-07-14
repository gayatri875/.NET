using System;

public class CartItem
{
    public Product Product { get; set; }
    public int Quantity { get; set; }

    public CartItem(Product product, int quantity)
    {
        Product = product;
        Quantity = quantity;
    }

    public double GetTotal()
    {
        return Product.Price * Quantity;
    }

    public void DisplayCart()
    {
        Console.WriteLine($"{Product.ProductName} x {Quantity}");
    }
}