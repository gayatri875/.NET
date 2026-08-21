using ECommerce.DTOs.User;
using ECommerce.Models;
using ECommerce.Repository;
using ECommerceAPI.Models;

namespace ECommerce.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // ==========================================
        // GET ALL USERS
        // ==========================================
        // Authorization is handled in UserController
        // Only Admin can call this API
        // ==========================================

        public async Task<IEnumerable<UserResponse>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();

            return users.Select(MapToResponse);
        }


        // ==========================================
        // GET USER BY ID
        // ==========================================

        public async Task<UserResponse?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                return null;
            }

            return MapToResponse(user);
        }


        // ==========================================
        // GET USER BY EMAIL
        // ==========================================

        public async Task<UserResponse?> GetByEmailAsync(string email)
        {
            var user =
                await _userRepository.GetByEmailAsync(email);

            if (user == null)
            {
                return null;
            }

            return MapToResponse(user);
        }


        // ==========================================
        // CREATE USER
        // ==========================================
        // Any newly created user is CUSTOMER.
        // Admin cannot be created through this method.
        // ==========================================

        public async Task<UserResponse> AddAsync(
            CreateUserAccountRequest request)
        {
            var existingUser =
                await _userRepository.GetByEmailAsync(
                    request.Email);

            if (existingUser != null)
            {
                throw new ArgumentException(
                    "User with this email already exists.");
            }

            var user = new User
            {
                Name = request.Name,

                Email = request.Email,

                PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword(
                        request.Password),

                // IMPORTANT
                // New users are always Customer
                Role = "Customer",

                CreatedAt = DateTime.UtcNow,

                IsActive = true
            };

            var createdUser =
                await _userRepository.AddAsync(user);

            return MapToResponse(createdUser);
        }


        // ==========================================
        // UPDATE USER
        // ==========================================
        // Admin can update user information.
        // Role is NOT changed here.
        // ==========================================

        public async Task<UserResponse?> UpdateAsync(
            int id,
            UpdateUserRequest request)
        {
            var existingUser =
                await _userRepository.GetByIdAsync(id);

            if (existingUser == null)
            {
                return null;
            }

            existingUser.Name = request.Name;

            existingUser.Email = request.Email;

            existingUser.IsActive = request.IsActive;

            // IMPORTANT
            // Do NOT change existingUser.Role here.
            // This prevents creating another Admin
            // accidentally.

            var updatedUser =
                await _userRepository.UpdateAsync(
                    existingUser);

            return MapToResponse(updatedUser);
        }


        // ==========================================
        // DELETE USER
        // ==========================================

        public async Task<bool> DeleteAsync(int id)
        {
            return await _userRepository.DeleteAsync(id);
        }


        // ==========================================
        // MAP USER → RESPONSE
        // ==========================================

        private static UserResponse MapToResponse(User user)
        {
            return new UserResponse
            {
                Id = user.Id,

                Name = user.Name,

                Email = user.Email,

                Role = user.Role,

                CreatedAt = user.CreatedAt,

                IsActive = user.IsActive
            };
        }
    }
}