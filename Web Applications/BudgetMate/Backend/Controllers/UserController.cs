using BudgetMate.Dtos;
using BudgetMate.Models;
using BudgetMate.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BudgetMate.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly FirestoreService _firestoreService;

        public UserController(FirestoreService firestoreService)
        {
            _firestoreService = firestoreService;
        }

        [HttpGet("profile")]
        public async Task<ActionResult<UserProfileDto>> GetProfile()
        {
            string username = User.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(username)) return Unauthorized();

            var user = await _firestoreService.GetUserByUsernameAsync(username);
            if (user == null) return NotFound();

            return new UserProfileDto
            {
                Username = user.Username,
                Salary = user.Salary,
                PayCycle = user.PayCycle,
                SavingsRule = user.SavingsRule
            };
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(UserProfileDto request)
        {
            string username = User.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(username)) return Unauthorized();

            var user = await _firestoreService.GetUserByUsernameAsync(username);
            if (user == null) return NotFound();

            user.Salary = request.Salary;
            user.PayCycle = request.PayCycle;
            user.SavingsRule = request.SavingsRule;

            await _firestoreService.UpdateUserAsync(user);

            return Ok(new UserProfileDto
            {
                Username = user.Username,
                Salary = user.Salary,
                PayCycle = user.PayCycle,
                SavingsRule = user.SavingsRule
            });
        }
    }
}
