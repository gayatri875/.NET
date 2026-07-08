using System;
class Program
{
    static void Main(String[] args)
    {


        List<int> num = new List<int>();
        num.Add(12);
        num.Add(14);
        num.Add(662);
        num.Add(92);
        num.Add(55);
        num.Add(67);

        foreach(int n in num)
        {
            Console.WriteLine(n);
        }
    }
}