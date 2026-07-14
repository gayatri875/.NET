using System;

public class InsufficeintStockException :Exception 
{
    public InsufficeintStockException() : base ("Insufficient Stock Available.")
    {
        
    }
}