using System;

namespace AutomobileVehicleManagementSystem
{
    class Program
    {
        static void Main(string[] args)
        {
            VehicleManager manager = new VehicleManager();
            DiscountCalculator discountCalculator = new DiscountCalculator();

            Console.Write("Enter Employee Name: ");
            string employeeName = Console.ReadLine();

            Console.Write("Enter Employee ID: ");
            int employeeId = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine($"\nWelcome {employeeName}");

            while (true)
            {
                Console.WriteLine("\n==============================");
                Console.WriteLine("ABC MOTORS");
                Console.WriteLine("Vehicle Management System");
                Console.WriteLine("==============================");
                Console.WriteLine("1. Add Vehicle");
                Console.WriteLine("2. View All Vehicles");
                Console.WriteLine("3. Search Vehicle");
                Console.WriteLine("4. Update Vehicle Price");
                Console.WriteLine("5. Delete Vehicle");
                Console.WriteLine("6. Calculate Discount");
                Console.WriteLine("7. Show Vehicle Details");
                Console.WriteLine("8. Exit");
                Console.Write("Enter your choice: ");

                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:

                        Console.Write("Enter Vehicle ID: ");
                        int id = Convert.ToInt32(Console.ReadLine());

                        Console.Write("Enter Vehicle Name: ");
                        string name = Console.ReadLine();

                        Console.Write("Enter Vehicle Type (Car/Bike/Truck): ");
                        string type = Console.ReadLine();

                        Console.Write("Enter Brand: ");
                        string brand = Console.ReadLine();

                        Console.Write("Enter Price: ");
                        double price = Convert.ToDouble(Console.ReadLine());

                        Console.Write("Enter Manufacturing Year: ");
                        int year = Convert.ToInt32(Console.ReadLine());

                        Vehicle vehicle = null;

                        switch (type.ToLower())
                        {
                            case "car":
                                vehicle = new Car(id, name, brand, price, year);
                                break;

                            case "bike":
                                vehicle = new Bike(id, name, brand, price, year);
                                break;

                            case "truck":
                                vehicle = new Truck(id, name, brand, price, year);
                                break;

                            default:
                                Console.WriteLine("Invalid Vehicle Type");
                                break;
                        }

                        if (vehicle != null)
                        {
                            manager.AddVehicle(vehicle);
                        }

                        break;

                    case 2:

                        manager.ViewAllVehicles();
                        break;

                    case 3:

                        Console.Write("Enter Vehicle ID: ");
                        int searchId = Convert.ToInt32(Console.ReadLine());

                        Vehicle searchVehicle = manager.SearchVehicle(searchId);

                        if (searchVehicle != null)
                            searchVehicle.DisplayDetails();
                        else
                            Console.WriteLine("Vehicle not found.");

                        break;

                    case 4:

                        Console.Write("Enter Vehicle ID: ");
                        int updateId = Convert.ToInt32(Console.ReadLine());

                        Console.Write("Enter New Price: ");
                        double newPrice = Convert.ToDouble(Console.ReadLine());

                        manager.UpdatePrice(updateId, newPrice);

                        break;

                    case 5:

                        Console.Write("Enter Vehicle ID: ");
                        int deleteId = Convert.ToInt32(Console.ReadLine());

                        manager.DeleteVehicle(deleteId);

                        break;

                    case 6:

                        Console.Write("Enter Vehicle ID: ");
                        int discountId = Convert.ToInt32(Console.ReadLine());

                        Vehicle discountVehicle = manager.SearchVehicle(discountId);

                        if (discountVehicle != null)
                            discountCalculator.CalculateDiscount(discountVehicle);
                        else
                            Console.WriteLine("Vehicle not found.");

                        break;

                    case 7:

                        Console.Write("Enter Vehicle ID: ");
                        int detailId = Convert.ToInt32(Console.ReadLine());

                        Vehicle detailVehicle = manager.SearchVehicle(detailId);

                        if (detailVehicle != null)
                            detailVehicle.DisplayDetails();
                        else
                            Console.WriteLine("Vehicle not found.");

                        break;

                    case 8:

                        Console.WriteLine("Thank you for using ABC Motors System.");
                        return;

                    default:

                        Console.WriteLine("Invalid Choice");
                        break;
                }
            }
        }
    }
}