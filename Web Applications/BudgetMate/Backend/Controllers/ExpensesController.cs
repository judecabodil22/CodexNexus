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
    public class ExpensesController : ControllerBase
    {
        private readonly FirestoreService _firestoreService;

        public ExpensesController(FirestoreService firestoreService)
        {
            _firestoreService = firestoreService;
        }

        [HttpGet] //Get all expenses for current user
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            var userId = GetCurrentUserId();
            var expenses = await _firestoreService.GetExpensesByUserIdAsync(userId);
            return Ok(expenses);
        }

        [HttpGet("{id}")] //Get expense by ID
        public async Task<ActionResult<Expense>> GetExpense(string id)
        {
            var userId = GetCurrentUserId();
            var expense = await _firestoreService.GetExpenseByIdAsync(id);

            if (expense == null || expense.UserId != userId)
            {
                return NotFound();
            }
            return expense;
        }

        [HttpPost] //Creates a new expense
        public async Task<ActionResult<Expense>> CreateExpense(Expense expense)
        {
            try
            {
                var userId = GetCurrentUserId();
                expense.UserId = userId;
                
                // Ensure Date is UTC for Firestore
                if (expense.Date.Kind == DateTimeKind.Unspecified || expense.Date.Kind == DateTimeKind.Local)
                {
                    expense.Date = DateTime.SpecifyKind(expense.Date, DateTimeKind.Utc);
                }

                // Firestore generates ID if not provided, or we can let the service handle it.
                // The service AddExpenseAsync adds it and returns the ID.
                string id = await _firestoreService.AddExpenseAsync(expense);
                expense.Id = id;

                return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("batch")] // Creates multiple expenses
        public async Task<ActionResult<IEnumerable<Expense>>> CreateExpenses(IEnumerable<Expense> expenses)
        {
            try
            {
                var userId = GetCurrentUserId();
                var createdExpenses = new List<Expense>();

                foreach (var expense in expenses)
                {
                    expense.UserId = userId;
                    
                    // Ensure Date is UTC for Firestore
                    if (expense.Date.Kind == DateTimeKind.Unspecified || expense.Date.Kind == DateTimeKind.Local)
                    {
                        expense.Date = DateTime.SpecifyKind(expense.Date, DateTimeKind.Utc);
                    }

                    string id = await _firestoreService.AddExpenseAsync(expense);
                    expense.Id = id;
                    createdExpenses.Add(expense);
                }
                return Ok(createdExpenses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")] //Updates an existing expense
        public async Task<IActionResult> UpdateExpense(string id, Expense expense)
        {
            try
            {
                if (id != expense.Id)
                {
                    return BadRequest();
                }

                var userId = GetCurrentUserId();
                var existingExpense = await _firestoreService.GetExpenseByIdAsync(id);

                if (existingExpense == null || existingExpense.UserId != userId)
                {
                    return NotFound();
                }

                expense.UserId = userId; // Ensure UserId doesn't change
                
                // Ensure Date is UTC for Firestore
                if (expense.Date.Kind == DateTimeKind.Unspecified || expense.Date.Kind == DateTimeKind.Local)
                {
                    expense.Date = DateTime.SpecifyKind(expense.Date, DateTimeKind.Utc);
                }

                await _firestoreService.UpdateExpenseAsync(expense);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")] //Deletes an expense
        public async Task<IActionResult> DeleteExpense(string id)
        {
            try
            {
                var userId = GetCurrentUserId();
                var expense = await _firestoreService.GetExpenseByIdAsync(id);
                
                if (expense == null || expense.UserId != userId)
                {
                    return NotFound();
                }

                await _firestoreService.DeleteExpenseAsync(id);
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
