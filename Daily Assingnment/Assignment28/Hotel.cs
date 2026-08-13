namespace _12Aug.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public ICollection<Room> Rooms { get; set; }
    }
}
