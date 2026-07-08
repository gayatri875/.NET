using System;

class Program2
{
    static void Main(string[]args)
    {
        int power;
        int totalPower = 0;
        int energy = 0;
        int normal = 0;
        int maintenance = 0;

        for (int light = 1; light <= 30; light++)
        {
            power = 80 + (light * 5);

            Console.Write("Light " + light + " : " + power + " W - ");

            if (power > 180)
            {
                Console.WriteLine("Maintenance Required");
                maintenance++;
            }
            else if (power >= 140 && power <= 180)
            {
                Console.WriteLine("Normal Operation");
                normal++;
            }
            else
            {
                Console.WriteLine("Energy Efficient");
                energy++;
            }

            totalPower += power;
        }

        double average = (double)totalPower / 30;

        Console.WriteLine("\n------Summary------");
        Console.WriteLine("Total Power = " + totalPower + " W");
        Console.WriteLine("Average Power = " + average + " W");
        Console.WriteLine("Maintenance Required = " + maintenance);
        Console.WriteLine("Normal Operation = " + normal);
        Console.WriteLine("Energy Efficient = " + energy);
    }
}