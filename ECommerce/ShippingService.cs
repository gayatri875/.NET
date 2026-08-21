using ECommerce.Models;
using ECommerce.Repository;

namespace ECommerce.Services
{
    public class ShippingService
    {
        private readonly IShippingRepository _shippingRepository;

        public ShippingService(IShippingRepository shippingRepository)
        {
            _shippingRepository = shippingRepository;
        }

        // Get all shipping records
        public async Task<IEnumerable<Shipping>> GetAllAsync()
        {
            return await _shippingRepository.GetAllAsync();
        }

        // Get shipping by Id
        public async Task<Shipping?> GetByIdAsync(int id)
        {
            return await _shippingRepository.GetByIdAsync(id);
        }

        // Get shipping by OrderId
        public async Task<Shipping?> GetByOrderIdAsync(int orderId)
        {
            return await _shippingRepository
                .GetByOrderIdAsync(orderId);
        }

        // Create shipping
        public async Task<Shipping> CreateAsync(Shipping shipping)
        {
            shipping.Status = "Pending";

            return await _shippingRepository.AddAsync(shipping);
        }

        // Update shipping
        public async Task<Shipping?> UpdateAsync(
            int id,
            Shipping shipping)
        {
            var existingShipping =
                await _shippingRepository.GetByIdAsync(id);

            if (existingShipping == null)
            {
                return null;
            }

            existingShipping.CourierName = shipping.CourierName;
            existingShipping.TrackingNumber = shipping.TrackingNumber;
            existingShipping.Status = shipping.Status;
            existingShipping.ShippedDate = shipping.ShippedDate;
            existingShipping.DeliveredDate = shipping.DeliveredDate;

            return await _shippingRepository
                .UpdateAsync(existingShipping);
        }

        // Delete shipping
        public async Task<bool> DeleteAsync(int id)
        {
            return await _shippingRepository.DeleteAsync(id);
        }
    }
}