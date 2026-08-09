*Product Management Web API*

Project Overview

Product Management Web API is a RESTful Web API developed using ASP.NET Core 8 and Entity Framework Core.

The API is used to manage product information and provides CRUD operations for products.

Technologies Used

- ASP.NET Core 8
- C#
- Entity Framework Core
- SQL Server
- Swagger / OpenAPI
- Code First Approach

Product

The Product API manages product details such as:

- Product ID
- Product Name
- Price
- Quantity
- Category

API Endpoints
---
```
GET     /api/products
GET     /api/products/{id}
POST    /api/products
PUT     /api/products/{id}
DELETE  /api/products/{id}
```
---

CRUD Operations
--
````
- GET – Gets all products
- GET by ID – Gets a product by ID
- POST – Adds a new product
- PUT – Updates an existing product
- DELETE – Deletes a product
````
---

Validation

The API uses Data Annotations for model validation.

Examples:

- Required fields
- String length validation
- Range validation
- Price validation

Database

Entity Framework Core is used with the Code First approach.

Migration commands:
---
```
Add-Migration InitialCreate
Update-Database
```
---

Swagger

Swagger / OpenAPI is used to test all Product API endpoints.

The following operations can be tested using Swagger:

- GET
- POST
- PUT
- DELETE

Project Structure
---
````
ProductManagementAPI
│
├── Controllers
│   └── ProductsController.cs
│
├── Data
│   └── AppDbContext.cs
│
├── Models
│   └── Product.cs
│
├── Migrations
│
├── Program.cs
├── appsettings.json
└── README.md
````
--

How to Run

1. Open the project in Visual Studio.
2. Configure the SQL Server connection string.
3. Run the migration commands.
4. Run the project.
5. Open Swagger.
6. Test the Product API endpoints.
