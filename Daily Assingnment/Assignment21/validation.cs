namespace ShopEase.Helpers
{
    public class Validation
    {
        public static bool ValidateEmail(string email)
        {
            return email.Contains("@") && email.Contains(".");
        }

        public static bool ValidateMobile(string mobile)
        {
            return mobile.Length == 10;
        }

        public static bool ValidatePassword(string password)
        {
            return password.Length >= 6;
        }
    }
}