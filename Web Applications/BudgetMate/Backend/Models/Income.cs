using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace BudgetMate.Models
{
    [FirestoreData]
    public class Income
    {
        [FirestoreDocumentId]
        public string? Id { get; set; }

        [Required]
        [FirestoreProperty]
        public string Source { get; set; } // e.g., Salary, Investment, Freelance

        [Required]
        [FirestoreProperty]
        public double Amount { get; set; }

        [Required]
        [FirestoreProperty]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [FirestoreProperty]
        public string? UserId { get; set; }
    }
}
