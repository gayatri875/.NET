# Hotel Booking Web API

## Overview

Hotel Booking Web API is an ASP.NET Core Web API project developed to manage hotels, rooms, customers, and bookings.

## Features

* View available hotels
* View rooms inside a hotel
* Book one or more rooms
* View customer bookings

## Technologies Used

* C#
* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* Swagger / OpenAPI

## Project Hierarchy

```text
12Aug
│
├── Controllers
│   ├── HotelController.cs
│   ├── RoomController.cs
│   ├── CustomerController.cs
│   └── BookingController.cs
│
├── Models
│   ├── Hotel.cs
│   ├── Room.cs
│   ├── Customer.cs
│   ├── Booking.cs
│   └── BookingRoom.cs
│
├── Data
│   └── ApplicationDbContext.cs
│
├── Properties
│   └── launchSettings.json
│
├── appsettings.json
├── Program.cs
└── README.md
```

## Entity Relationship

```text
Customer
    │
    │ 1 : M
    ▼
Booking
    │
    │ 1 : N
    ▼
BookingRoom
    │
    │ M : 1
    ▼
Room
    │
    │ M : 1
    ▼
Hotel
```

## Entities

### Hotel

* Id
* Name
* City
* Rooms

### Room

* Id
* HotelId
* RoomNumber
* RoomType
* Price
* Hotel
* BookingRooms

### Customer

* Id
* Name
* Email
* Bookings

### Booking

* Id
* CustomerId
* CheckIn
* CheckOut
* TotalAmount
* Status
* Customer
* BookingRooms

### BookingRoom

* BookingId
* RoomId
* Price
* Booking
* Room

## API Operations

| Method | Operation                 |
| ------ | ------------------------- |
| GET    | View available hotels     |
| GET    | View rooms inside a hotel |
| POST   | Book room(s)              |
| GET    | View customer bookings    |

## Database

Entity Framework Core is used for database operations with SQL Server.

Database tables are created using Entity Framework Core migrations.

## API Testing

Swagger / OpenAPI is used to test and explore the API endpoints.

## How to Run

1. Open the project in Visual Studio.
2. Configure the SQL Server connection string in `appsettings.json`.
3. Build the project.
4. Run the application.
5. Open Swagger.
6. Test the available API endpoints.
