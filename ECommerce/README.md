# E-Commerce Order Management System

A full-stack *E-Commerce Order Management System* developed using React.js, Vite, ASP.NET Core Web API, Entity Framework Core, and SQL Server.

## 📌 Project Overview

The E-Commerce Order Management System is designed to manage online shopping operations efficiently. It allows customers to browse and search products, manage their shopping cart, place orders, view order details, and request returns.

Administrators can manage products, categories, customers, orders, shipping status, and returns.

## 🚀 Features

### Customer
- User registration and login
- JWT-based authentication
- Browse products
- Search products
- Filter products by category
- View product details
- Add products to cart
- Update cart quantity
- Remove products from cart
- Place orders
- View orders and order details
- Request product returns

### Admin
- Admin authentication
- Add, update, and delete products
- Manage product categories
- Manage product stock and price
- View customer orders
- Update order status
- Manage shipping status
- Manage return requests

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML
- CSS

### Backend
- ASP.NET Core Web API
- C#
- Entity Framework Core
- JWT Authentication
- Repository Pattern
- Service Layer

### Database
- Microsoft SQL Server

### Tools
- Visual Studio / Visual Studio Code
- Swagger
- Git
- GitHub
- npm

## 🏗️ Project Architecture

```text
ECommerceProject
│
├── ECommerceFrontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
│
└── ECommerce
    ├── Controllers
    ├── Services
    ├── Repository
    ├── RepositoryImplementation
    ├── Models
    ├── Data
    ├── Middleware
    └── Program.cs
