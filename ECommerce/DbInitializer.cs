using ECommerce.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.Migrate();

            // Categories add only if database is empty
            if (!context.Categories.Any())
            {
                context.Categories.AddRange(
                    new Category
                    {
                        Id = 1,
                        Name = "Electronics",
                        Description = "Electronic Products"
                    },
                    new Category
                    {
                        Id = 2,
                        Name = "Fashion",
                        Description = "Fashionable Clothes"
                    },
                    new Category
                    {
                        Id = 3,
                        Name = "Home & Furniture",
                        Description = "Home Useful Applications"
                    },
                    new Category
                    {
                        Id = 4,
                        Name = "Books",
                        Description = "Reading Books"
                    }
                );

                context.SaveChanges();
            }

            // Products add only if database has no products
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                    new Product
                    {
                        Id = 4,
                        Name = "Wireless Headphones",
                        Description = "Bluetooth wireless headphones with clear sound and comfortable ear cushions.",
                        Price = 1999,
                        Stock = 25,
                        ImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                        CategoryId = 1,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 5,
                        Name = "Smart LED TV",
                        Description = "43-inch Full HD Smart LED TV with built-in streaming apps.",
                        Price = 32999,
                        Stock = 10,
                        ImageUrl = "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
                        CategoryId = 1,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 6,
                        Name = "Laptop",
                        Description = "Lightweight laptop suitable for study, office work and everyday use.",
                        Price = 54999,
                        Stock = 15,
                        ImageUrl = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
                        CategoryId = 1,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 7,
                        Name = "Bluetooth Speaker",
                        Description = "Portable Bluetooth speaker with clear audio and powerful sound.",
                        Price = 2499,
                        Stock = 30,
                        ImageUrl = "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
                        CategoryId = 1,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 8,
                        Name = "Smart Watch",
                        Description = "Smart watch with fitness tracking, notifications and multiple useful features.",
                        Price = 3999,
                        Stock = 20,
                        ImageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                        CategoryId = 1,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 9,
                        Name = "Cotton T-Shirt",
                        Description = "Comfortable cotton t-shirt suitable for everyday wear.",
                        Price = 799,
                        Stock = 40,
                        ImageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
                        CategoryId = 2,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 10,
                        Name = "Casual Sneakers",
                        Description = "Comfortable sneakers for casual everyday use.",
                        Price = 2499,
                        Stock = 25,
                        ImageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                        CategoryId = 2,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 11,
                        Name = "Denim Jacket",
                        Description = "Classic denim jacket with a stylish casual design.",
                        Price = 2999,
                        Stock = 15,
                        ImageUrl = "https://images.unsplash.com/photo-1551028719-00167b16eac5",
                        CategoryId = 2,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 12,
                        Name = "Casual Backpack",
                        Description = "Lightweight backpack suitable for college, travel and everyday use.",
                        Price = 1499,
                        Stock = 30,
                        ImageUrl = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
                        CategoryId = 2,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 13,
                        Name = "Classic Sunglasses",
                        Description = "Stylish sunglasses suitable for everyday outdoor use.",
                        Price = 999,
                        Stock = 35,
                        ImageUrl = "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
                        CategoryId = 2,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 14,
                        Name = "Ergonomic Office Chair",
                        Description = "Comfortable ergonomic chair suitable for office and study.",
                        Price = 5999,
                        Stock = 15,
                        ImageUrl = "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
                        CategoryId = 3,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 15,
                        Name = "Comfortable Sofa",
                        Description = "Modern comfortable sofa designed for living rooms.",
                        Price = 24999,
                        Stock = 8,
                        ImageUrl = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
                        CategoryId = 3,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 16,
                        Name = "Wooden Study Table",
                        Description = "Simple wooden study table with a spacious tabletop.",
                        Price = 4499,
                        Stock = 12,
                        ImageUrl = "https://images.unsplash.com/photo-1518455027359-f3f8164ba6b5",
                        CategoryId = 3,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 17,
                        Name = "Bedside Table",
                        Description = "Compact bedside table suitable for bedrooms.",
                        Price = 2299,
                        Stock = 18,
                        ImageUrl = "https://images.unsplash.com/photo-1532372320572-cda25653a26d",
                        CategoryId = 3,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 18,
                        Name = "Learn Programming Basics",
                        Description = "Beginner-friendly book covering programming fundamentals.",
                        Price = 599,
                        Stock = 30,
                        ImageUrl = "https://images.unsplash.com/photo-1532012197267-da84d127e765",
                        CategoryId = 4,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 19,
                        Name = "Data Structures and Algorithms",
                        Description = "Book covering important data structures and algorithm concepts.",
                        Price = 899,
                        Stock = 20,
                        ImageUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
                        CategoryId = 4,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 20,
                        Name = "The Adventure Story",
                        Description = "An engaging adventure novel for readers who enjoy exciting stories.",
                        Price = 449,
                        Stock = 35,
                        ImageUrl = "https://images.unsplash.com/photo-1512820790803-83ca734da794",
                        CategoryId = 4,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 21,
                        Name = "Student Study Guide",
                        Description = "Useful study guide for students with easy-to-understand explanations.",
                        Price = 699,
                        Stock = 25,
                        ImageUrl = "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
                        CategoryId = 4,
                        IsActive = true
                    },

                    new Product
                    {
                        Id = 22,
                        Name = "Computer Science Fundamentals",
                        Description = "Introduction to core computer science concepts for beginners.",
                        Price = 799,
                        Stock = 18,
                        ImageUrl = "https://images.unsplash.com/photo-1536240478700-b869070f9279",
                        CategoryId = 4,
                        IsActive = true
                    }
                );

                context.SaveChanges();
            }
        }
    }
}