namespace _12Aug.Models
{
    public class Room
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public string RoomNumber { get; set; }
        public string RoomType { get; set; }
        public decimal Price { get; set; }
        public Hotel hotel { get; set; }
        public ICollection<BookingRoom> BookingRooms { get; set; }
    }
}
