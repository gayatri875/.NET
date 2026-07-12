using System;

public class Vehicle
{
    public virtual void Start()
    {
        Console.WriteLine("Vehicle Started");
    }
}

public class Car : Vehicle
{
    public override void Start()
    {
        Console.WriteLine("Car Started");
    }
}