using BudgetMate.Models;
using BudgetMate.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BudgetMate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SavingsController : ControllerBase
    {
        private readonly FirestoreService _firestoreService;

        public SavingsController(FirestoreService firestoreService)
        {
            _firestoreService = firestoreService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Savings>>> GetSavings()
        {
            var userId = GetCurrentUserId();
            var savings = await _firestoreService.GetSavingsByUserIdAsync(userId);
            return Ok(savings);
        }

        [HttpPost]
        public async Task<ActionResult<Savings>> AddSavings(Savings savings)
        {
            try
            {
                var userId = GetCurrentUserId();
                savings.UserId = userId;

                if (savings.Date.Kind == DateTimeKind.Unspecified || savings.Date.Kind == DateTimeKind.Local)
                {
                    savings.Date = DateTime.SpecifyKind(savings.Date, DateTimeKind.Utc);
                }

                string id = await _firestoreService.AddSavingsAsync(savings);
                savings.Id = id;

                return CreatedAtAction(nameof(GetSavings), new { id = savings.Id }, savings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSavings(string id)
        {
            try
            {
                await _firestoreService.DeleteSavingsAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private string GetCurrentUserId()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (idClaim != null)
            {
                return idClaim.Value;
            }
            throw new UnauthorizedAccessException("User ID not found in token");
        }
    }
}
