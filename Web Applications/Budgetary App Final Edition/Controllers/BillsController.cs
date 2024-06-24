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

				/*if(modeOfPayment==1)
                {
                    modeOfPayment.ToString("Biweekly");
                }*/

			}

			var bill = new Bills
			{
				startingBudget = startingBudget,
				dailyBudget = dailyBudget,
				modeofPayment = modeOfPayment

			};

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

		// This action returns data for the chart and dropdown

		[HttpGet("Bills/GetBillsData")]
		public List<object> GetBillsData()
		{
			List<object> data = new List<object>();
			List<DateTime> dates = _context.Bills.Select(b => b.date).ToList();


			List<string> months = dates.Select(date => date.ToString("MMMM")).ToList();
			data.Add(months);

			List<string> names = _context.Bills.Select(n => n.name).ToList();
			data.Add(names);

			List<double> amount = _context.Bills.Select(a => a.amount).ToList();
			data.Add(amount);

			List<double> dailyBudget = _context.Bills.Select(db => db.dailyBudget).ToList();
			data.Add(dailyBudget);

			List<double> startingBudget = _context.Bills.Select(sb => sb.startingBudget).ToList();
			data.Add(startingBudget);

			List<string> categories = _context.Bills.Select(c => c.category).ToList();
			data.Add(categories);

			return data;
		}

		[HttpGet]
		public IActionResult GetMonthlyExpensesLine()
		{
			var expenses = _context.Bills
								   .GroupBy(b => b.date.Month)
								   .Select(g => new
								   {
									   Month = g.Key,
									   TotalExpenses = g.Sum(b => b.amount)
								   })
								   .ToList();

			var monthNames = expenses.Select(e => new DateTime(1, e.Month, 1).ToString("MMMM")).ToList();
			var expensesData = expenses.Select(e => e.TotalExpenses).ToList();



			return Json(new { monthNames, expensesData });
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
	}
}
