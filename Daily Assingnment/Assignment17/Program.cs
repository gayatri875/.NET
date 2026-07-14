using System;

class Program
{
    static void Main(string[] args)
    {
        LoginManager loginManager = new LoginManager();
        StationeryManager stationeryManager = new StationeryManager();
        PurchaseManager purchaseManager = new PurchaseManager();
        SortManager sortManager = new SortManager();

        try
        {
            loginManager.Login();

            while (true)
            {
                Console.WriteLine("\n------------------------------------");
                Console.WriteLine("Stationery Store Management System");
                Console.WriteLine("------------------------------------");
                Console.WriteLine("1. Add Stationery Item");
                Console.WriteLine("2. Display All Items");
                Console.WriteLine("3. Search Item");
                Console.WriteLine("4. Update Item");
                Console.WriteLine("5. Delete Item");
                Console.WriteLine("6. Purchase Item");
                Console.WriteLine("7. View Low Stock Items");
                Console.WriteLine("8. Sort Items");
                Console.WriteLine("9. Exit");

                Console.Write("\nEnter Choice : ");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:

                        Notebook notebook = new Notebook();

                        Console.Write("Enter Item Id : ");
                        notebook.ItemId = Convert.ToInt32(Console.ReadLine());

                        Console.Write("Enter Item Name : ");
                        notebook.ItemName = Console.ReadLine();

                        Console.Write("Enter Category : ");
                        notebook.Category = Console.ReadLine();

                        Console.Write("Enter Brand : ");
                        notebook.Brand = Console.ReadLine();

                        Console.Write("Enter Price : ");
                        notebook.Price = Convert.ToDouble(Console.ReadLine());

                        Console.Write("Enter Quantity : ");
                        notebook.Quantity = Convert.ToInt32(Console.ReadLine());

                        Console.Write("Enter Pages : ");
                        notebook.Pages = Convert.ToInt32(Console.ReadLine());

                        Console.Write("Enter Paper Type : ");
                        notebook.PaperType = Console.ReadLine();

                        stationeryManager.AddItem(notebook);

                        break;

                    case 3:

                        Console.Write("Enter Item Id : ");
                        int searchId = Convert.ToInt32(Console.ReadLine());

                        StationeryItem item = stationeryManager.SearchItem(searchId);

                        item.DisplayDetails();

                        break;
                    case 4:

                        Console.Write("Enter Item Id : ");
                        int updateId = Convert.ToInt32(Console.ReadLine());

                        stationeryManager.UpdateItem(updateId);

                        break;
                    case 5:

                        Console.Write("Enter Item Id : ");
                        int deleteId = Convert.ToInt32(Console.ReadLine());

                        stationeryManager.DeleteItem(deleteId);

                        break;

                    case 6:

                        Console.Write("Enter Item Id : ");
                        int purchaseId = Convert.ToInt32(Console.ReadLine());

                        StationeryItem purchaseItem = stationeryManager.SearchItem(purchaseId);

                        Console.Write("Enter Quantity : ");
                        int quantity = Convert.ToInt32(Console.ReadLine());

                        if (quantity > purchaseItem.Quantity)
                        {
                            throw new InsufficeintStockException();
                        }

                        purchaseManager.GenerateBill(purchaseItem, quantity);

                        break;
                    case 7:

                        stationeryManager.ViewLowStock();

                        break;
                    case 8:

                        Console.WriteLine("1. Price");
                        Console.WriteLine("2. Name");
                        Console.WriteLine("3. Quantity");

                        Console.Write("Enter Choice : ");
                        int sortChoice = Convert.ToInt32(Console.ReadLine());

                        switch (sortChoice)
                        {
                            case 1:
                                sortManager.SortByPrice(stationeryManager.GetItems());
                                break;

                            case 2:
                                sortManager.SortByName(stationeryManager.GetItems());
                                break;

                            case 3:
                                sortManager.SortByQuantity(stationeryManager.GetItems());
                                break;

                            default:
                                Console.WriteLine("Invalid Choice");
                                break;
                        }

                        break;
                    case 9:

                        Console.WriteLine("Thank You");
                        Console.WriteLine("Visit Again");

                        return;
                    default:

                        Console.WriteLine("Invalid Choice");

                        break;
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}
