using System;
Func<int, int> square = x => x * x;
Console.WriteLine(square(5));

Func<int, int, int> add = (a, b) => a + b;
Console.EriteLine(add(4 + 5));