using System;

public class Animal
{
    public void Eat()
    {
        Console.WriteLine("Animal is Eating.");
    }
}

public class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Dog is Barking.");
    }
}