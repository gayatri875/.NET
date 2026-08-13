namespace _12Aug.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime Checkout { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public Customer Customer { get; set; }
        public ICollection<BookingRoom> BookingRooms { get; set; }
    }
}
