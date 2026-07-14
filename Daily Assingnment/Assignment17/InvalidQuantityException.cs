using System;

public class InvalidQuantityException :Exception 
{
    public InvalidQuantityException() : base ("Quantity must be greater than 0.")
    {
        
    }
}