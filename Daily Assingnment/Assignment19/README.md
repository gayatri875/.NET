# Employee Management System

## Description
Employee Management System is a simple ASP.NET Core MVC application that demonstrates the Model-View-Controller (MVC) architecture. The application displays Employee and Department information in HTML tables using Razor Views.

## Features
- Display Employee details
- Display Department details
- MVC Architecture (Model, View, Controller)
- HTML tables with CSS styling
- Razor View integration

## Technologies Used
- ASP.NET Core MVC
- C#
- HTML
- CSS
- Razor Views

## Models

### Employee
- Employee ID
- Name
- Department
- Salary
- Email

### Department
- Department Name
- Department Head
- Head Contact
- Head Email

## Project Structure

```text
EmployeeManagementSystem
│
├── Controllers
│   └── HomeController.cs
│
├── Models
│   ├── Employee.cs
│   └── Department.cs
│
├── Views
│   └── Home
│       ├── Employee.cshtml
│       └── Department.cshtml
│
├── wwwroot
├── Program.cs
└── EmployeeManagementSystem.csproj
```

## Output
- Employee information is displayed in a table.
- Department information is displayed in a table.
- Tables are styled using CSS for a clean and user-friendly interface.

## Conclusion
This project demonstrates the fundamentals of ASP.NET Core MVC by creating models, passing data through controllers, and displaying it in Razor Views using HTML and CSS.
