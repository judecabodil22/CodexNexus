using BudgetMate.Data;
using Microsoft.AspNetCore.Mvc;
using BudgetMate.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BudgetMate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ExpensesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpensesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet] //Get all expenses for current user
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            var userId = GetCurrentUserId();
            return await _context.Expenses.Where(e => e.UserId == userId).ToListAsync();
        }

        [HttpGet("{id}")] //Get expense by ID
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var userId = GetCurrentUserId();
            var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

            if (expense == null)
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
            
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
        }

        [HttpPut("{id}")] //Updates an existing expense
        public async Task<IActionResult> UpdateExpense(int id, Expense expense)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }

            var userId = GetCurrentUserId();
            var existingExpense = await _context.Expenses.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);

            if (existingExpense == null)
            {
                return NotFound();
            }

            expense.UserId = userId; // Ensure UserId doesn't change
            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Expenses.Any(e => e.Id == id && e.UserId == userId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")] //Deletes an expense
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var userId = GetCurrentUserId();
            var expense = await _context.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
            
            if (expense == null)
            {
                return NotFound();
            }
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private int GetCurrentUserId()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (idClaim != null && int.TryParse(idClaim.Value, out int userId))
            {
                return userId;
            }
            throw new UnauthorizedAccessException("User ID not found in token");
        }
    }
}
