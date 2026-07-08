using System;
class Program
{
    static void Main(String[] args)
    {
        int totalPackages = 0;
        int qualityCheck = 0;
        int priorityShipment = 0;
        int normalProcesssing = 0;

        for(int packageID = 1001; packageID <= 1020; packageID++)
        {
            totalPackages++;
            if(packageID % 4 == 0)
            {
                Console.WriteLine("PackageID: " + packageID +    "==Quality Check required");
                qualityCheck++;
            }
            else if(packageID % 5 == 0)
            {
                Console.WriteLine("PackageID: " + packageID +    "==Priority Shipment");
                priorityShipment++;
            }
            else
            {
                Console.WriteLine("PackageID: " + packageID +   "==Normal Processing");
                normalProcesssing++;
            }
        }

        Console.WriteLine("\n++++++++++Summary+++++++++");
        Console.WriteLine("Total Packages: " + totalPackages);
        Console.WriteLine("Quality Check: " + qualityCheck);
        Console.WriteLine("Priority Shipments: " + priorityShipment);
        Console.WriteLine("Normal Packages: " + normalProcesssing);

    }
}

