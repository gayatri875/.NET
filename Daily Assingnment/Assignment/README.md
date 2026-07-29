#  ShopEase - Online Shopping Management System

## Project Overview

ShopEase is a C# Console Application developed using Object-Oriented Programming (OOP) concepts. It simulates an online shopping system where an administrator manages products and categories, while customers can register, log in, browse products, add items to a cart, place orders, make payments, and generate invoices.


## Features

### Admin
- Admin Login
- Category Management
- Product Management

### Customer
- Customer Registration
- Customer Login
- View Products
- Add Products to Cart
- Update/Remove Cart Items
- Checkout
- Payment
- Generate Invoice
- View Order History

---

## Technologies Used

- C#
- .NET Console Application
- Object-Oriented Programming (OOP)

---

## Project Structure

```
ShopEase
│
├── Program.cs
│
├── Models
│   ├── Category.cs
│   ├── Product.cs
│   ├── Customer.cs
│   ├── Admin.cs
│   ├── CartItem.cs
│   ├── Cart.cs
│   ├── OrderItem.cs
│   ├── Order.cs
│   ├── Payment.cs
│   └── Invoice.cs
│
├── Services
│   ├── AuthenticationService.cs
│   ├── CategoryService.cs
│   ├── ProductService.cs
│   ├── CustomerService.cs
│   ├── CartService.cs
│   ├── OrderService.cs
│   ├── PaymentService.cs
│   └── ReportService.cs
│
├── Exceptions
│   ├── InvalidLoginException.cs
│   ├── DuplicateProductException.cs
│   ├── ProductNotFoundException.cs
│   └── InsufficientStockException.cs
│
└── Helpers
    ├── Validation.cs
    └── Menu.cs
```

---

## OOP Concepts Used

- Classes and Objects
- Encapsulation
- Constructors
- Method Overloading
- Collections (List<T>)
- Exception Handling
- Object Composition

---

## Future Enhancements

- Database Integration
- File Handling
- User Authentication
- Password Encryption
- GUI/Web Version
