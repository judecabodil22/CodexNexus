using System.ComponentModel.DataAnnotations;

namespace BudgetMate.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Category { get; set; }
        [MaxLength(255)]
        public string Description { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; } = DateTime.Now;

        public int UserId { get; set; }

    }
}
