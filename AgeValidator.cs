using System;

public class AgeValidator
{
	public void CheckAge(int age)
	{
		if (age < 18)
		{
			throw new InvalidAgeException("Age must be 18 or older");
		}

		Console.WriteLine("Eligible to vote");

	}

}