using System;
using System.Linq;

class Linq
{
    static void Main(String[] args)
    {
        int[] numbers = { 3, 4, 5, 6, 7, 3, 2, 8, 93, 9 };

        var even = numbers.where(x => x % 2 == 0);

        foreach (int n in numbers)
        {
            Console.WriteLine(n);
        }
    }
}