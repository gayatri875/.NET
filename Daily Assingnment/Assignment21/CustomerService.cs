using ShopEase.Models;
namespace ShopEase.Services
{
    public class CustomerService
    {
        // View Customer Profile
        public void ViewProfile(Customer customer)
        {
            customer.DisplayCustomer();

        }


        //Update Profile
        public void UpdateProfile(Customer customer, string name , string address, string mobileNumber)
        {
            customer.Name = name;
            customer.Address = address;
            customer.MobileNumber = mobileNumber;
            Console.WriteLine("profile updated Successfully");

        }

        // Change Password
        public void ChangePassword(Customer customer , string oldPassword, string newPassword)
        {
            if(customer.Password == oldPassword)
            {
                customer.Password = newPassword;
                Console.WriteLine("Password Change Successfully");
            }
            else
            {
                Console.WriteLine("Incorrect Old Password");
            }
        }
    }
}