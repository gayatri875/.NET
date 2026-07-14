using System;
using System.Collections.Generic;
using System.Linq;

public class StationeryManager
{
    private List<StationeryItem> items = new List<StationeryItem>();


    public void AddItem(StationeryItem item)
    {
        if (items.Any(i => i.ItemId == item.ItemId))
        {
            throw new DuplicateItemException();
        }

        items.Add(item);
        Console.WriteLine("Item Added Successfuylly");
    }


    public void DisplayItems()
    {
        if (items.Count == 0)
        {
            Console.WriteLine("No Items Available");
            return;
        }

        foreach (var item in items)
        {
            item.DisplayDetails();

            Console.WriteLine("--------------------------------");
        }
    }

    public StationeryItem SearchItem(int itemId)
    {
        var item = items.FirstOrDefault(i => i.ItemId == itemId);
        if (item == null)
        {
            throw new ItemNotFoundException();
        }

        return item;
    }

    public void UpdateItem(int itemId)
    {
        StationeryItem item = SearchItem(itemId);

        Console.Write("Enter New Price : ");
        item.Price = Convert.ToDouble(Console.ReadLine());

        Console.Write("Enter New Quantity : ");
        item.Quantity = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter New Brand : ");
        item.Brand = Console.ReadLine();

        Console.WriteLine("Item Updated Successfully.");
    }
    public void DeleteItem(int itemId)
    {
        StationeryItem item = SearchItem(itemId);

        Console.Write("Delete Item? (Y/N) : ");
        char choice = Convert.ToChar(Console.ReadLine());

        if (choice == 'Y' || choice == 'y')
        {
            items.Remove(item);
            Console.WriteLine("Item Deleted Successfully.");
        }
        else
        {
            Console.WriteLine("Delete Cancelled.");
        }
    }

    public void ViewLowStock()
    {
        foreach(var item in items)
        {
            if(item.Quantity < 5)
            {
                item.DisplayDetails();
                Console.WriteLine("------------------------------------");
            }
        }
    }

    public List<StationeryItem> GetItems()
    {
        return items;
    }
}