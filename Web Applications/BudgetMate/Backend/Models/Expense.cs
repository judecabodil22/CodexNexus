using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace BudgetMate.Models
{
    [FirestoreData]
    public class Expense
    {
        [FirestoreDocumentId]
        public string Id { get; set; }

        [Required]
        [MaxLength(100)]
        [FirestoreProperty]
        public string Category { get; set; }

        [MaxLength(255)]
        [FirestoreProperty]
        public string Description { get; set; }

        [Required]
        [FirestoreProperty]
        public decimal Amount { get; set; }

        [Required]
        [FirestoreProperty]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [FirestoreProperty]
        public string UserId { get; set; }

    }
}
