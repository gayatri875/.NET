using System;


class Program
{
    public int Id;
    public string Name;
    public double Salary;

    public Employee(int id, string name, double salary)
    {
        Id = id;
        Name = name;
        Salary = salary;
    }

    public void display()
    {
        Console.WriteLine("ID : " + Id);
        Console.WriteLine("Name : " + Name);
        Console.WriteLine("Salary : " + Salary);
    }
}
