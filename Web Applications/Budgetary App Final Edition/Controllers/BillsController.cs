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
            return View();
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id,name,amount,modeofPayment,category,startingBudget,dailyBudget")] Bills bills)
        {
            if (ModelState.IsValid)
            {
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


    }
}
