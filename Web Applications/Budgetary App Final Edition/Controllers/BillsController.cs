using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Budgetary_App_Final_Edition.Data;
using Budgetary_App_Final_Edition.Models;
using Microsoft.AspNetCore.Authorization;
using SQLitePCL;

namespace Budgetary_App_Final_Edition.Controllers
{
	public class BillsController : Controller
	{
		private readonly ApplicationDbContext _context;

		public BillsController(ApplicationDbContext context)
		{
			_context = context;
		}

		[Authorize]
		// GET: Bills
		public async Task<IActionResult> Dashboard()
		{
			return View(await _context.Bills.ToListAsync());
		}

		[Authorize]
		// GET: Bills/Details/5
		public async Task<IActionResult> Details(int? id)
		{
			if (id == null)
			{
				return NotFound();
			}

			var bills = await _context.Bills
				.FirstOrDefaultAsync(m => m.id == id);
			if (bills == null)
			{
				return NotFound();
			}

			return View(bills);
		}
		[Authorize]
		// GET: Bills/Create
		public IActionResult Create()
		{
			var lastBill = _context.Bills.OrderByDescending(b => b.id).FirstOrDefault();
			var startingBudget = 0.00;
			var dailyBudget = 0.00;
			var modeOfPayment = 0;

			if (lastBill != null)
			{
				startingBudget = lastBill.startingBudget;
				dailyBudget = lastBill.dailyBudget;
				modeOfPayment = lastBill.modeofPayment;
				
			}

			var bill = new Bills
			{
				startingBudget = startingBudget,
				dailyBudget = dailyBudget,
				modeofPayment = modeOfPayment

			};

			ViewBag.ModeOfPayment = modeOfPayment;

			return View(bill);
		}

		[Authorize]
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create([Bind("id,name,amount,modeofPayment,category,startingBudget,dailyBudget")] Bills bills)
		{
			if (ModelState.IsValid)
			{
				bills.date = DateTime.Today;

				_context.Add(bills);
				await _context.SaveChangesAsync();
				return RedirectToAction(nameof(Dashboard));

			}
			else
			{
				// Log the validation errors
				var errors = ModelState.Values.SelectMany(v => v.Errors);
				foreach (var error in errors)
				{
					Console.WriteLine(error.ErrorMessage);
				}
			}
			return View(bills);

		}

		[Authorize]
		private bool BillsExists(int id)
		{
			return _context.Bills.Any(e => e.id == id);
		}

		[Authorize]
		[HttpPost("Bills/Edit/{id}")]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> BillsEdit(int id, [Bind("id,name,amount,category")] Bills bills)
		{
			if (id != bills.id)
			{
				return NotFound();
			}

			if (ModelState.IsValid)
			{
				try
				{
					// Retrieve the existing bill from the database
					var existingBill = await _context.Bills.FindAsync(id);
					if (existingBill == null)
					{
						return NotFound();
					}

					// Update only the necessary fields
					existingBill.name = bills.name;
					existingBill.amount = bills.amount;
					existingBill.category = bills.category;

					// Save the changes
					await _context.SaveChangesAsync();
				}
				catch (DbUpdateConcurrencyException)
				{
					if (!BillsExists(bills.id))
					{
						return NotFound();
					}
					else
					{
						throw;
					}
				}
				return RedirectToAction(nameof(Dashboard));
			}

			// Log the validation errors
			var errors = ModelState.Values.SelectMany(v => v.Errors);
			foreach (var error in errors)
			{
				Console.WriteLine(error.ErrorMessage);
			}

			return View(bills);
		}

		[Authorize]
		[HttpGet("Bills/Edit/{id}")]
		// GET: Bills/Edit/5
		public async Task<IActionResult> BillsEdit(int? id)
		{
			if (id == null)
			{
				return NotFound();
			}

			var bills = await _context.Bills.FindAsync(id);
			if (bills == null)
			{
				return NotFound();
			}
			return View(bills);
		}

		[Authorize]
		// POST: Bills/Delete/5
		[HttpPost, ActionName("BillsDelete")]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> BillsDelete(int id)
		{
			var bills = await _context.Bills.FindAsync(id);
			if (bills != null)
			{
				_context.Bills.Remove(bills);
			}

			await _context.SaveChangesAsync();
			return RedirectToAction(nameof(Dashboard));
		}

		[Authorize]
		// GET: Bills/Delete/5
		public async Task<IActionResult> BillsDelete(int? id)
		{
			if (id == null)
			{
				return NotFound();
			}

			var bills = await _context.Bills
				.FirstOrDefaultAsync(m => m.id == id);
			if (bills == null)
			{
				return NotFound();
			}

			return View(bills);
		}


		[HttpGet]
		public IActionResult GetMonthlyExpensesLine()
		{
			var expenses = _context.Bills
								   .GroupBy(b => b.date.Month)
								   .Select(g => new
								   {
									   Month = g.Key,
									   TotalExpenses = g.Sum(b => b.amount),

								   })
								   .ToList();

			// Get the oldest date recorded in the current month
			var currentDate = DateTime.Now;
			var currentMonth = DateTime.Now.Month;
			var currentYear = DateTime.Now.Year;
			var oldestDateThisMonth = _context.Bills
											  .Where(b => b.date.Month == currentMonth && b.date.Year == currentYear)
											  .OrderBy(b => b.date)
											  .Select(b => b.date)
											  .FirstOrDefault();

			var lastBill = _context.Bills.OrderByDescending(b => b.id).FirstOrDefault();

			var lastDayOfMonth = new DateTime(currentYear, currentMonth, DateTime.DaysInMonth(currentYear, currentMonth));
			var daysLeft = (lastDayOfMonth - oldestDateThisMonth).Days;


			var monthNames = expenses.Select(e => new DateTime(1, e.Month, 1).ToString("MMMM")).ToList();
			var dailyBudget = lastBill?.dailyBudget ?? 0.0;

			var expensesData = expenses.Select(e => e.TotalExpenses + (dailyBudget * daysLeft)).ToList();

			var startingBudget = lastBill?.startingBudget ?? 0.0;

			var totalExpense = expensesData.Sum();
			var actualDaysLeft = (lastDayOfMonth - currentDate).Days + 1;

			var totalBudgetAfterExpenses = new List<double>();
			foreach (var expense in expenses)
			{
				var monthlyBudget = startingBudget - (dailyBudget * daysLeft) - expense.TotalExpenses;

				totalBudgetAfterExpenses.Add(monthlyBudget);
			}

			var averageExpenses = totalExpense / monthNames.Count;
			var averageSavings = totalBudgetAfterExpenses.Average();

			return Json(new { monthNames, expensesData, totalExpense, startingBudget, dailyBudget, oldestDateThisMonth, actualDaysLeft, totalBudgetAfterExpenses, averageExpenses, averageSavings });
		}

		[HttpGet]
		public IActionResult GetMonthlyExpensesPie()
		{
			var expenses = _context.Bills
								   .GroupBy(b => new { b.date.Month, b.category })
								   .Select(g => new
								   {
									   TotalExpenses = g.Sum(b => b.amount),
									   Category = g.Key.category
								   })
								   .ToList();

			var expenseCategories = expenses.Select(e => e.Category).Distinct().ToList();
			var expensesData = expenses.Select(e => e.TotalExpenses).ToList();

			var categoryMap = new Dictionary<string, string>
			{
				{ "1", "Food" },
				{ "2", "Transportation" },
				{ "3", "Utilities" },
				{ "4", "Others" }
			};

			for (int i = 0; i < expenseCategories.Count; i++)
			{
				if (categoryMap.ContainsKey(expenseCategories[i]))
				{
					expenseCategories[i] = categoryMap[expenseCategories[i]];
				}
			}

			return Json(new { expensesData, expenseCategories });
		}


		[HttpGet]
		public IActionResult GetPastThreeMonthsSavings()
		{
			var currentMonth = DateTime.Now.Month;
			var currentYear = DateTime.Now.Year;
			var startDate = new DateTime(currentYear, currentMonth, 1).AddMonths(-2); // Three months including the current one
			var endDate = new DateTime(currentYear, currentMonth, DateTime.DaysInMonth(currentYear, currentMonth));
			var monthNames = new List<string>();

			// Get expenses for the last three months
			var expenses = _context.Bills
								   .Where(b => b.date >= startDate && b.date <= endDate)
								   .GroupBy(b => new { b.date.Year, b.date.Month })
								   .Select(g => new
								   {
									   Year = g.Key.Year,
									   Month = g.Key.Month,
									   TotalExpenses = g.Sum(b => b.amount)
								   })
								   .OrderBy(g => g.Year).ThenBy(g => g.Month)
								   .ToList();

			var totalBudgetAfterExpenses = new List<double>();
			var lastBill = _context.Bills.OrderByDescending(b => b.id).FirstOrDefault();
			var startingBudget = lastBill?.startingBudget ?? 0.0;
			var dailyBudget = lastBill?.dailyBudget ?? 0.0;

			for (int i = 0; i < 3; i++)
			{
				var monthToCalculate = startDate.AddMonths(i).Month;
				var yearToCalculate = startDate.AddMonths(i).Year;
				var daysInMonth = DateTime.DaysInMonth(yearToCalculate, monthToCalculate);

				var expenseForMonth = expenses.FirstOrDefault(e => e.Year == yearToCalculate && e.Month == monthToCalculate);
				var totalExpensesForMonth = expenseForMonth?.TotalExpenses ?? 0.0;

				var totalDaysLeft = (monthToCalculate == currentMonth && yearToCalculate == currentYear)
									? (endDate - DateTime.Now).Days + 1
									: daysInMonth;

				var monthlyBudget = startingBudget - (dailyBudget * totalDaysLeft) - totalExpensesForMonth;
				totalBudgetAfterExpenses.Add(monthlyBudget);

				var monthName = new DateTime(yearToCalculate, monthToCalculate, 1).ToString("MMMM yyyy");
				monthNames.Add(monthName);
			}

			var averageSavings = totalBudgetAfterExpenses.Average();

			return Json(new
			{
				totalBudgetAfterExpenses,
				monthNames,
				averageSavings
			});
		}
	}
}
