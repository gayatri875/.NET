# Automobile Management System

## Project Overview
The Automobile Management System is an ASP.NET Core MVC application developed to manage automobile and manufacturer information. It demonstrates the use of Model Binding, Data Validation, Razor Views, and Tag Helpers.

## Features

### Automobile Module
- Register Automobile
- Model Binding
- Data Validation
- Success Message
- Display Vehicle Name and Brand

### Manufacturer Module
- Add Manufacturer Details
- Data Validation
- Display Manufacturer Information in Table
- Accessible after Automobile Registration

## Technologies Used
- ASP.NET Core MVC
- C#
- Razor Views
- HTML
- CSS
- Bootstrap
- Data Annotations

## Project Structure

AutomobileManagement
│
├── Controllers
│   ├── AutomobileController.cs
│   └── ManufacturerController.cs
│
├── Models
│   ├── Automobile.cs
│   └── Manufacturer.cs
│
├── Views
│   ├── Automobile
│   │   ├── Register.cshtml
│   │   └── Success.cshtml
│   │
│   └── Manufacturer
│       └── Details.cshtml
│
├── wwwroot
│
├── Program.cs
│
└── AutomobileManagement.csproj


## Concepts Used
- MVC Architecture
- Model Binding
- Data Annotations
- ModelState Validation
- Razor Syntax
- Tag Helpers
- TempData
- Bootstrap UI
