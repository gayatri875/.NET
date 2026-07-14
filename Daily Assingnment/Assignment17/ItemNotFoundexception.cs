using System;

public class ItemNotFoundException :Exception 
{
    public ItemNotFoundException() : base ("Item not Found.")
    {
        
    }
}