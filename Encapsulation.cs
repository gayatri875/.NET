using System;

public class Encapsulation
{
	public int Id { get; set; }
	public string Name { get; set; } = "";

	public void Display()
	{
		Console.WriteLine($"ID : {Id}");
		Console.WriteLine($"Name : {Name}");
	}
}