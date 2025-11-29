using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace BudgetMate.Models
{
    [FirestoreData]
    public class User
    {
        [FirestoreDocumentId]
        public string Id { get; set; }

        [Required]
        [MaxLength(50)]
        [FirestoreProperty]
        public string Username { get; set; } = string.Empty;

        [Required]
        [FirestoreProperty]
        public string PasswordHash { get; set; } = string.Empty;

        [FirestoreProperty]
        public decimal Salary { get; set; }

        [FirestoreProperty]
        public string PayCycle { get; set; } = "Monthly";

        [FirestoreProperty]
        public string SavingsRule { get; set; } = "50/30/20";
    }
}
