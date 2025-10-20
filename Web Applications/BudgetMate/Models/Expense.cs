﻿namespace BudgetMate.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Amount { get; set; }
        public DateTime Date { get; set; }

    }
}
