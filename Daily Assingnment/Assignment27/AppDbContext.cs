using _6July.Models;
using Microsoft.EntityFrameworkCore;

namespace _6July.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Product> products { get; set; }
    }
}
