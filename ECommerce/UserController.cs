using ECommerce.DTOs.User;
using ECommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // ==========================================
        // GET ALL USERS
        // ADMIN ONLY
        // GET: api/User
        // ==========================================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();

            return Ok(users);
        }


        // ==========================================
        // GET USER BY ID
        // ADMIN ONLY
        // GET: api/User/1
        // ==========================================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found."
                });
            }

            return Ok(user);
        }


        // ==========================================
        // CREATE USER
        // ADMIN ONLY
        // POST: api/User
        // ==========================================
        [HttpPost]
        public async Task<IActionResult> Create(
            CreateUserAccountRequest request)
        {
            try
            {
                var user =
                    await _userService.AddAsync(request);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = user.Id },
                    user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }


        // ==========================================
        // UPDATE USER
        // ADMIN ONLY
        // PUT: api/User/1
        // ==========================================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            UpdateUserRequest request)
        {
            var user =
                await _userService.UpdateAsync(
                    id,
                    request);

            if (user == null)
            {
                return NotFound(new
                {
                    message = "User not found."
                });
            }

            return Ok(user);
        }


        // ==========================================
        // DELETE USER
        // ADMIN ONLY
        // DELETE: api/User/1
        // ==========================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted =
                await _userService.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "User not found."
                });
            }

            return Ok(new
            {
                message = "User deleted successfully."
            });
        }
    }
}