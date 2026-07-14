using System;
using System.Collections.Generic;

public class Program
{
    static void Main(string[] args)
    {
        //List to store the products
        List<Product> products = new List<Product>();

        Console.WriteLine("How many Products do you want to add?");
        int count = Convert.ToInt32(Console.ReadLine());

        for (int i = 0; i < count; i++)
        {
            Console.WriteLine($"\n Enter details of Product{i + 1}");

            Console.WriteLine("Enter Product ID :");
            int id = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Product Name: ");
            string name = Console.ReadLine();

            Console.WriteLine("Enter Price : ");
            double price = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Enter Stock : ");
            int stock = Convert.ToInt32(Console.ReadLine());

            Product product = new Product(id, name, price, stock);
            products.Add(product);
        }

        Console.WriteLine("====Product List=====");
        foreach (Product product in products)
        {
            product.DisplayProduct();
            Console.WriteLine();
        }

         List<CartItem> cart = new List<CartItem>();

        int choice;

        do
        {
            Console.Write("\nEnter Product ID : ");
            int productId = Convert.ToInt32(Console.ReadLine());

            Product selectedProduct = null;

            foreach (Product product in products)
            {
                if (product.ProductId == productId)
                {
                    selectedProduct = product;
                    break;
                }
            }

            if (selectedProduct == null)
            {
                Console.WriteLine("Product Not Found");
            }
            else
            {
                Console.Write("Enter Quantity : ");
                int quantity = Convert.ToInt32(Console.ReadLine());

                if (quantity <= selectedProduct.Stock)
                {
                    cart.Add(new CartItem(selectedProduct, quantity));

                    selectedProduct.Stock -= quantity;

                    Console.WriteLine("Product Added To Cart");
                }
                else
                {
                    Console.WriteLine("Stock Not Available");
                }
            }

            Console.WriteLine("\nDo you want to add another product?");
            Console.WriteLine("1. Yes");
            Console.WriteLine("2. No");
            choice = Convert.ToInt32(Console.ReadLine());

        } while (choice == 1);
         double totalAmount = 0;

        foreach (CartItem item in cart)
        {
            totalAmount += item.GetTotal();
        }

        double discount = 0;

        if (totalAmount < 1000)
        {
            discount = 0;
        }
        else if (totalAmount >= 1000 && totalAmount <= 4999)
        {
            discount = totalAmount * 0.10;
        }
        else if (totalAmount >= 5000 && totalAmount <= 9999)
        {
            discount = totalAmount * 0.20;
        }
        else
        {
            discount = totalAmount * 0.30;
        }

        double finalAmount = totalAmount - discount;

        Console.WriteLine("\n===== Bill =====");
        Console.WriteLine($"Total Amount : {totalAmount}");
        Console.WriteLine($"Discount     : {discount}");
        Console.WriteLine($"Final Amount : {finalAmount}");
    }
}
