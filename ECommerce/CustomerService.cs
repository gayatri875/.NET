using ECommerce.DTOs.Customer;
using ECommerce.Repository;
using ECommerceAPI.Models;

namespace ECommerce.Services
{
    public class CustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(
            ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        // =========================================
        // GET ALL CUSTOMERS - ADMIN
        // =========================================
        public async Task<IEnumerable<CustomerResponse>> GetAllAsync()
        {
            var customers =
                await _customerRepository.GetAllAsync();

            return customers.Select(MapToResponse);
        }

        // =========================================
        // GET BY CUSTOMER ID
        // =========================================
        public async Task<CustomerResponse?> GetByIdAsync(int id)
        {
            var customer =
                await _customerRepository.GetByIdAsync(id);

            if (customer == null)
            {
                return null;
            }

            return MapToResponse(customer);
        }

        // =========================================
        // GET BY USER ID
        // Used by /api/Customer/me
        // =========================================
        public async Task<CustomerResponse?> GetByUserIdAsync(
            int userId)
        {
            var customer =
                await _customerRepository
                    .GetByUserIdAsync(userId);

            if (customer == null)
            {
                return null;
            }

            return MapToResponse(customer);
        }

        // =========================================
        // CREATE CUSTOMER - ADMIN
        // =========================================
        public async Task<CustomerResponse> AddAsync(
            CreateCustomerRequest request)
        {
            var customer = new Customer
            {
                FullName = request.FullName,
                Phone = request.Phone,
                Address = request.Address,
                UserId = request.UserId
            };

            var createdCustomer =
                await _customerRepository
                    .AddAsync(customer);

            return MapToResponse(createdCustomer);
        }

        // =========================================
        // CREATE MY PROFILE - CUSTOMER
        // =========================================
        public async Task<CustomerResponse> CreateMyProfileAsync(
            int userId,
            CreateMyCustomerProfileRequest request)
        {
            var customer = new Customer
            {
                UserId = userId,
                FullName = request.FullName,
                Phone = request.Phone,
                Address = request.Address
            };

            var createdCustomer =
                await _customerRepository
                    .AddAsync(customer);

            return MapToResponse(createdCustomer);
        }

        // =========================================
        // UPDATE CUSTOMER - ADMIN
        // =========================================
        public async Task<CustomerResponse?> UpdateAsync(
            int id,
            UpdateCustomerRequest request)
        {
            var existingCustomer =
                await _customerRepository
                    .GetByIdAsync(id);

            if (existingCustomer == null)
            {
                return null;
            }

            existingCustomer.FullName =
                request.FullName;

            existingCustomer.Phone =
                request.Phone;

            existingCustomer.Address =
                request.Address;

            existingCustomer.UserId =
                request.UserId;

            var updatedCustomer =
                await _customerRepository
                    .UpdateAsync(existingCustomer);

            return MapToResponse(updatedCustomer);
        }

        // =========================================
        // UPDATE MY PROFILE - CUSTOMER
        // =========================================
        public async Task<CustomerResponse?> UpdateMyProfileAsync(
            int userId,
            UpdateMyCustomerProfileRequest request)
        {
            var customer =
                await _customerRepository
                    .GetByUserIdAsync(userId);

            if (customer == null)
            {
                return null;
            }

            customer.FullName =
                request.FullName;

            customer.Phone =
                request.Phone;

            customer.Address =
                request.Address;

            var updatedCustomer =
                await _customerRepository
                    .UpdateAsync(customer);

            return MapToResponse(updatedCustomer);
        }

        // =========================================
        // DELETE CUSTOMER - ADMIN
        // =========================================
        public async Task<bool> DeleteAsync(int id)
        {
            return await _customerRepository
                .DeleteAsync(id);
        }

        // =========================================
        // MAP ENTITY → DTO
        // =========================================
        private static CustomerResponse MapToResponse(
            Customer customer)
        {
            return new CustomerResponse
            {
                Id = customer.Id,
                FullName = customer.FullName,
                Phone = customer.Phone,
                Address = customer.Address,
                UserId = customer.UserId
            };
        }
    }
}