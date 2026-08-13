using _12Aug.Models;
using Microsoft.EntityFrameworkCore;

namespace _12Aug.Data
{
    public class ApplicationDbcontext :DbContext
    {
        public ApplicationDbcontext (DbContextOptions <ApplicationDbcontext> options) : base(options) { }

        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        public DbSet<BookingRoom> BookingRooms { get; set; }
    }
}
