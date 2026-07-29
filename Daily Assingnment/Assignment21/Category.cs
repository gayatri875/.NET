namespace ShopEase.Models
{
    public class Category
    {
        public int CategoryId{get; set;}
        public string CategoryName{get; set;}


    public Category()
        {
            
        }

        public Category(int categoryId, string categoryName)
        {
            CategoryId = categoryId;
            CategoryName = categoryName;
        }


        public void DisplayCategory()
        {
            Console.WriteLine($"Category ID : {CategoryId}");
            Console.WriteLine($"Category Name : {CategoryName}");
        }
    }
}