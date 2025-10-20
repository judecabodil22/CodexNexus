﻿using BudgetMate.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetMate.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Expense> Expenses { get; set; }
    }
}
