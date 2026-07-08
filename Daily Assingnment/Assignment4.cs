using System;


class Assignment4
{
  

    public static void Show()
    {


        // List to store available books
        List<string> books = new List<string>()
        {
            "C Programming",
            "Java Programming",
            "Python Programming",
            "Data Structures",
            "Operating System"
        };


        // Display all books
        Console.WriteLine("Available Books:");



        foreach (string book in books)
        {
            Console.WriteLine(book);
        }



        // Add a new book
        books.Add("Computer Networks");



        // Remove an old book
        books.Remove("Java Programming");



        // Display updated list
        Console.WriteLine("\nUpdated Book List:");
        foreach (string book in books)
        {
            Console.WriteLine(book);
        }



        // Display total number of books
        Console.WriteLine("\nTotal Books = " + books.Count);
    }
}