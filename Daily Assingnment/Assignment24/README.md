# Course Registration Web API

## Project Overview
The Course Registration Web API is an ASP.NET Core Web API developed using REST principles and Dependency Injection (DI). It allows students to view, register, update, and delete course information. Swagger is used for API documentation and testing.
---
## Project Hierarchy
```
CourseRegistrationAPI
│
├── Controllers
│   └── CourseController.cs
│
├── Interfaces
│   └── ICourseService.cs
│
├── Models
│   └── Course.cs
│
├── Services
│   └── CourseService.cs
│
├── Properties
│   └── launchSettings.json
│
├── appsettings.json
├── appsettings.Development.json
├── Program.cs
└── CourseRegistrationAPI.csproj
```
---
## Features
- View All Courses
- View Course by ID
- Register New Course
- Update Course Details
- Delete Course
- Model Validation
- Dependency Injection
- Swagger Integration

## Technologies Used
- ASP.NET Core Web API
- C#
- REST API
- Dependency Injection
- Swagger (OpenAPI)
