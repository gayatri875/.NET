using ECommerce.Models;
using ECommerce.Repository;

namespace ECommerce.Services
{
    public class ReturnService
    {
        private readonly IReturnRepository _returnRepository;

        public ReturnService(IReturnRepository returnRepository)
        {
            _returnRepository = returnRepository;
        }

        // Get all returns
        public async Task<IEnumerable<Return>> GetAllAsync()
        {
            return await _returnRepository.GetAllAsync();
        }

        // Get return by Id
        public async Task<Return?> GetByIdAsync(int id)
        {
            return await _returnRepository.GetByIdAsync(id);
        }

        // Get returns by OrderId
        public async Task<IEnumerable<Return>> GetByOrderIdAsync(int orderId)
        {
            return await _returnRepository
                .GetByOrderIdAsync(orderId);
        }

        // Create return request
        public async Task<Return> CreateAsync(Return returnRequest)
        {
            returnRequest.Status = "Requested";
            returnRequest.RequestedDate = DateTime.UtcNow;

            return await _returnRepository.AddAsync(returnRequest);
        }

        // Update return status
        public async Task<Return?> UpdateAsync(
            int id,
            Return returnRequest)
        {
            var existingReturn =
                await _returnRepository.GetByIdAsync(id);

            if (existingReturn == null)
            {
                return null;
            }

            existingReturn.Status = returnRequest.Status;

            // When return is approved
            if (returnRequest.Status.Equals(
                "Approved",
                StringComparison.OrdinalIgnoreCase))
            {
                existingReturn.ApprovedDate = DateTime.UtcNow;
            }

            // When return is completed
            if (returnRequest.Status.Equals(
                "Completed",
                StringComparison.OrdinalIgnoreCase))
            {
                existingReturn.CompletedDate = DateTime.UtcNow;
            }

            existingReturn.Reason = returnRequest.Reason;

            return await _returnRepository
                .UpdateAsync(existingReturn);
        }

        // Delete return
        public async Task<bool> DeleteAsync(int id)
        {
            return await _returnRepository.DeleteAsync(id);
        }
    }
}