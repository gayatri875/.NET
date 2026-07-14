using System;

public class InvalidPriceException :Exception 
{
    public InvalidPriceException() : base ("Price must be greater than 0.")
    {
        
    }
}