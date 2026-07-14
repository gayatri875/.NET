using System;
using System.Collections.Generic;
using System.Linq;

public class SortManager
{
    public void SortByPrice(List<StationeryItem> items)
    {
        var sortedItems = items.OrderBy(i => i.Price);

        foreach (var item in sortedItems)
        {
            item.DisplayDetails();
            Console.WriteLine("----------------------");
        }
    }

    public void SortByName(List<StationeryItem> items)
    {
        var sortedItems = items.OrderBy(i => i.ItemName);

        foreach (var item in sortedItems)
        {
            item.DisplayDetails();
            Console.WriteLine("----------------------");
        }
    }

    public void SortByQuantity(List<StationeryItem> items)
    {
        var sortedItems = items.OrderByDescending(i => i.Quantity);

        foreach (var item in sortedItems)
        {
            item.DisplayDetails();
            Console.WriteLine("----------------------");
        }
    }
}