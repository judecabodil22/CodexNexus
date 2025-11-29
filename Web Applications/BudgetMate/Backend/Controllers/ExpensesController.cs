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
            var userId = GetCurrentUserId();
            expense.UserId = userId;
            
            // Firestore generates ID if not provided, or we can let the service handle it.
            // The service AddExpenseAsync adds it and returns the ID.
            string id = await _firestoreService.AddExpenseAsync(expense);
            expense.Id = id;

            return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
        }

        [HttpPost("batch")] // Creates multiple expenses
        public async Task<ActionResult<IEnumerable<Expense>>> CreateExpenses(IEnumerable<Expense> expenses)
        {
            var userId = GetCurrentUserId();
            var createdExpenses = new List<Expense>();

            foreach (var expense in expenses)
            {
                expense.UserId = userId;
                string id = await _firestoreService.AddExpenseAsync(expense);
                expense.Id = id;
                createdExpenses.Add(expense);
            }
            return Ok(createdExpenses);
        }

        [HttpPut("{id}")] //Updates an existing expense
        public async Task<IActionResult> UpdateExpense(string id, Expense expense)
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
            await _firestoreService.UpdateExpenseAsync(expense);

            return NoContent();
        }

        [HttpDelete("{id}")] //Deletes an expense
        public async Task<IActionResult> DeleteExpense(string id)
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
