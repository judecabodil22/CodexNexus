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
		public async Task<IActionResult> Index()
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
			return View();
		}
		[Authorize]
		// POST: Bills/Create
		// To protect from overposting attacks, enable the specific properties you want to bind to.
		// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Create([Bind("id,name,amount,modeofPayment,startingBudget,dailyBudget")] Bills bills)
		{
			if (ModelState.IsValid)
			{
				_context.Add(bills);
				await _context.SaveChangesAsync();
				return RedirectToAction(nameof(Index));
			}
			return View(bills);
		}
		[Authorize]
		// GET: Bills/Edit/5

		public async Task<IActionResult> Edit(int? id)
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
		// POST: Bills/Edit/5
		// To protect from overposting attacks, enable the specific properties you want to bind to.
		// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Edit(int id, [Bind("id,name,amount,modeofPayment,startingBudget,dailyBudget")] Bills bills)
		{
			if (id != bills.id)
			{
				return NotFound();
			}

			if (ModelState.IsValid)
			{
				try
				{
					_context.Update(bills);
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
				return RedirectToAction(nameof(Index));
			}
			return View(bills);
		}
		[Authorize]
		// GET: Bills/Delete/5
		public async Task<IActionResult> Delete(int? id)
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
		// POST: Bills/Delete/5
		[HttpPost, ActionName("Delete")]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> DeleteConfirmed(int id)
		{
			var bills = await _context.Bills.FindAsync(id);
			if (bills != null)
			{
				_context.Bills.Remove(bills);
			}

			await _context.SaveChangesAsync();
			return RedirectToAction(nameof(Index));
		}
		[Authorize]
		private bool BillsExists(int id)
		{
			return _context.Bills.Any(e => e.id == id);
		}
		[Authorize]
		public IActionResult BillsCreate()
		{
			return View();
		}
		[Authorize]
		public IActionResult BillsEdit()
		{
			return View();
		}
		[Authorize]
		public IActionResult BillsDelete()
		{	
			return View();
		}
	}
}
