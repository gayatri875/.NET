using ECommerce.Data;
using ECommerce.DTOs.Auth;
using ECommerce.Models;
using ECommerceAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerce.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(
            AppDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        // ==========================================
        // USER REGISTER
        // ==========================================
        // Every newly registered user is Customer
        // ==========================================
        public async Task<AuthResponse> RegisterAsync(
            CreateUserRequest request)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u =>
                    u.Email == request.Email);

            if (existingUser != null)
            {
                throw new Exception(
                    "User with this email already exists.");
            }

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,

                // NEW
          
                PasswordHash =
                    BCrypt.Net.BCrypt.HashPassword(
                        request.Password),

                // IMPORTANT:
                // Public registration can NEVER create Admin
                Role = "Customer",

                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            await _context.Users.AddAsync(user);

            await _context.SaveChangesAsync();

            return GenerateToken(user);
        }


        // ==========================================
        // LOGIN
        // ==========================================
        // Role comes from database
        // ==========================================
        public async Task<AuthResponse> LoginAsync(
            LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u =>
                    u.Email == request.Email);

            if (user == null)
            {
                throw new Exception(
                    "Invalid email or password.");
            }

            if (!user.IsActive)
            {
                throw new Exception(
                    "User account is inactive.");
            }

            var passwordValid =
                BCrypt.Net.BCrypt.Verify(
                    request.Password,
                    user.PasswordHash);

            if (!passwordValid)
            {
                throw new Exception(
                    "Invalid email or password.");
            }

            // Role comes from database
            return GenerateToken(user);
        }


        // ==========================================
        // GENERATE JWT TOKEN
        // ==========================================
        private AuthResponse GenerateToken(User user)
        {
            var key = _configuration["Jwt:Key"];

            if (string.IsNullOrWhiteSpace(key))
            {
                throw new Exception(
                    "JWT key is not configured.");
            }

            var issuer =
                _configuration["Jwt:Issuer"];

            var audience =
                _configuration["Jwt:Audience"];

            var expiryMinutes =
                int.Parse(
                    _configuration["Jwt:ExpiryMinutes"]
                    ?? "60");

            var expiresAt =
                DateTime.UtcNow.AddMinutes(
                    expiryMinutes);


            // ==========================================
            // JWT CLAIMS
            // ==========================================
            var claims = new List<Claim>
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.Id.ToString()),

                new Claim(
                    ClaimTypes.Name,
                    user.Name),

                new Claim(
                    ClaimTypes.Email,
                    user.Email),

                new Claim(
                    ClaimTypes.Role,
                    user.Role)
            };


            var securityKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(key));


            var credentials =
                new SigningCredentials(
                    securityKey,
                    SecurityAlgorithms.HmacSha256);


            var token =
                new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    claims: claims,
                    expires: expiresAt,
                    signingCredentials: credentials);


            var tokenString =
                new JwtSecurityTokenHandler()
                    .WriteToken(token);


            // ==========================================
            // RESPONSE
            // ==========================================
            return new AuthResponse
            {
                UserId = user.Id,

                Name = user.Name,

                Email = user.Email,

                Role = user.Role,

                Token = tokenString,

                ExpiresAt = expiresAt
            };
        }
    }
}