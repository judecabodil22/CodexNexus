using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace BudgetMate.Models
{
    [FirestoreData]
    public class Savings
    {
        [FirestoreDocumentId]
        public string? Id { get; set; }

        [Required]
        [FirestoreProperty]
        public double Amount { get; set; }

        [FirestoreProperty]
        public string? Description { get; set; } // e.g., "Monthly Deposit", "Emergency Fund"

        [Required]
        [FirestoreProperty]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [FirestoreProperty]
        public string? UserId { get; set; }
    }
}
