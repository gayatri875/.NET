using ShopEase.Models;
namespace ShopEase.Services
{
    public class CategoryService
    {
        private List<Category> categories = new List<Category>();

        //Add category
        public void AddCategory(Category category)
        {
            categories.Add(category);
            Console.WriteLine("Category Added Successfully");
        }

        // view all category
        public void ViewCategories()
        {
            if(categories.Count == 0)
            {
                Console.WriteLine("No Categories Available");
                return;
            }

            foreach(Category category in categories)
            {
                category.DisplayCategory();
            }
        }

        // search category
        public Category SearchCategory(int categoryId)
        {
            foreach(Category category in categories)
            {
                if(category.CategoryId == categoryId)
                {
                    return category;
                }
            }
            return null;
        }

        // update category
        public void UpdateCategory(int categoryId, string categoryName)
        {
        
            Category category = SearchCategory(categoryId);
            if(categories != null)
            {
                category.CategoryName= categoryName;
                Console.WriteLine("Category Updated Successfully");
            }
            else
            {
                Console.WriteLine("Catgory Not Found");
            }
        }

        //Delete
        public void DeleteCAtegory(int categoryId)
        {
            Category category = SearchCategory(categoryId);
            if(category!= null)
            {
                categories.Remove(category);
                Console.WriteLine("Category Deleted Sucessfully");
            }
            else
            {
                Console.WriteLine("category Not found");
            }
        }
    }
}