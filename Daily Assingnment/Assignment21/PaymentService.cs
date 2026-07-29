using ShopEase.Models;
namespace ShopEase.Services
{
    public class PaymentService
    {
        //Make Payment
        public void MakePayment(Payment payment)
        {
            payment.PaymentStatus = "Success";
            Console.WriteLine("payment Successful");
        }

        //view Payment Details
        public void ViewPayment(Payment payment)
        {
            payment.DisplayPayment();
        }

        //Change Payment Status
        public void UpdatepaymentStatus(Payment payment, string status)
        {
            payment.PaymentStatus = status;
            Console.WriteLine("Payment Status Updated");
        }
    }
}