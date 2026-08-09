Student Management Web API

Project Overview

Student Management Web API is a RESTful Web API developed using ASP.NET Core 8 and Entity Framework Core (Code First).

The API manages:

- Students
- Teachers
- Courses
- Batches

It provides CRUD operations and uses Swagger for API testing.

Technologies Used

- ASP.NET Core 8
- C#
- Entity Framework Core
- SQL Server
- Swagger / OpenAPI
- Code First Approach

Entities

Student

Properties:

- StudentId
- FirstName
- LastName
- Email
- Phone
- DateOfBirth
- BatchId

Teacher

Properties:

- TeacherId
- Name
- Email
- Experience

Course

Properties:

- CourseId
- CourseName
- Duration
- TeacherId

Batch

Properties:

- BatchId
- BatchName
- StartDate

Relationships

Batch   → Many Students
Teacher → Many Courses
Student <-> Many Courses

API Endpoints

Students

GET     /api/students
GET     /api/students/{id}
POST    /api/students
PUT     /api/students/{id}
DELETE  /api/students/{id}

Teachers

GET     /api/teachers
GET     /api/teachers/{id}
POST    /api/teachers
PUT     /api/teachers/{id}
DELETE  /api/teachers/{id}

Courses

GET     /api/courses
GET     /api/courses/{id}
POST    /api/courses
PUT     /api/courses/{id}
DELETE  /api/courses/{id}

Batches

GET     /api/batches
GET     /api/batches/{id}
POST    /api/batches
PUT     /api/batches/{id}
DELETE  /api/batches/{id}

Validation

The API uses Data Annotations for model validation.

Examples:

- Required fields
- Email validation
- Phone validation
- String length validation
- Experience range: 1–40
- Course duration: 1–24 months

Database

Entity Framework Core Code First is used to create and manage the database.

Migration commands:

Add-Migration InitialCreate
Update-Database

Swagger

Swagger is used to test all API endpoints.

Run the project and open the Swagger page to test:

- GET
- POST
- PUT
- DELETE

Project Structure
---
```
StudentManagementAPI
│
├── Controllers
│   ├── StudentsController.cs
│   ├── TeachersController.cs
│   ├── CoursesController.cs
│   └── BatchesController.cs
│
├── Data
│   └── AppDbContext.cs
│
├── Models
│   ├── Student.cs
│   ├── Teacher.cs
│   ├── Course.cs
│   └── Batch.cs
│
├── Migrations
│
├── Program.cs
├── appsettings.json
└── README.md
```
-----
How to Run

1. Open the project in Visual Studio.
2. Configure the SQL Server connection string.
3. Run the migration commands.
4. Press F5 or Ctrl + F5.
5. Open Swagger.
6. Test the API endpoints.
