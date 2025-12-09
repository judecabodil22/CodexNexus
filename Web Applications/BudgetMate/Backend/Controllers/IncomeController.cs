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
    public class IncomeController : ControllerBase
    {
        private readonly FirestoreService _firestoreService;

        public IncomeController(FirestoreService firestoreService)
        {
            _firestoreService = firestoreService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Income>>> GetIncomes()
        {
            var userId = GetCurrentUserId();
            var incomes = await _firestoreService.GetIncomesByUserIdAsync(userId);
            return Ok(incomes);
        }

        [HttpPost]
        public async Task<ActionResult<Income>> AddIncome(Income income)
        {
            try
            {
                var userId = GetCurrentUserId();
                income.UserId = userId;
                
                if (income.Date.Kind == DateTimeKind.Unspecified || income.Date.Kind == DateTimeKind.Local)
                {
                    income.Date = DateTime.SpecifyKind(income.Date, DateTimeKind.Utc);
                }

                string id = await _firestoreService.AddIncomeAsync(income);
                income.Id = id;

                return CreatedAtAction(nameof(GetIncomes), new { id = income.Id }, income);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(string id)
        {
            try
            {
                await _firestoreService.DeleteIncomeAsync(id);
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
