using BudgetMate.Models;
using Google.Cloud.Firestore;

namespace BudgetMate.Services
{
    public class FirestoreService
    {
        private readonly FirestoreDb _firestoreDb;
        private const string UsersCollection = "Users";
        private const string ExpensesCollection = "Expenses";

        public FirestoreService(IConfiguration configuration)
        {
            string projectId = configuration["Firestore:ProjectId"];
            if (string.IsNullOrEmpty(projectId))
            {
                throw new ArgumentNullException("Firestore:ProjectId", "Firestore Project ID is not configured.");
            }
            _firestoreDb = FirestoreDb.Create(projectId);
        }

        // User Operations
        public async Task AddUserAsync(User user)
        {
            CollectionReference usersRef = _firestoreDb.Collection(UsersCollection);
            await usersRef.AddAsync(user);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            CollectionReference usersRef = _firestoreDb.Collection(UsersCollection);
            Query query = usersRef.WhereEqualTo("Username", username).Limit(1);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();

            if (snapshot.Documents.Count == 0)
            {
                return null;
            }

            return snapshot.Documents[0].ConvertTo<User>();
        }

        public async Task UpdateUserAsync(User user)
        {
            if (string.IsNullOrEmpty(user.Id))
            {
                throw new ArgumentException("User ID cannot be null or empty for update.");
            }
            DocumentReference docRef = _firestoreDb.Collection(UsersCollection).Document(user.Id);
            await docRef.SetAsync(user, SetOptions.MergeAll);
        }

        // Expense Operations
        public async Task<string> AddExpenseAsync(Expense expense)
        {
            CollectionReference expensesRef = _firestoreDb.Collection(ExpensesCollection);
            DocumentReference docRef = await expensesRef.AddAsync(expense);
            return docRef.Id;
        }

        public async Task<List<Expense>> GetExpensesByUserIdAsync(string userId)
        {
            CollectionReference expensesRef = _firestoreDb.Collection(ExpensesCollection);
            Query query = expensesRef.WhereEqualTo("UserId", userId);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();

            return snapshot.Documents.Select(doc => doc.ConvertTo<Expense>()).ToList();
        }

        public async Task<Expense?> GetExpenseByIdAsync(string id)
        {
            DocumentReference docRef = _firestoreDb.Collection(ExpensesCollection).Document(id);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                return null;
            }

            return snapshot.ConvertTo<Expense>();
        }

        public async Task UpdateExpenseAsync(Expense expense)
        {
            DocumentReference docRef = _firestoreDb.Collection(ExpensesCollection).Document(expense.Id);
            await docRef.SetAsync(expense, SetOptions.Overwrite);
        }

        public async Task DeleteExpenseAsync(string id)
        {
            DocumentReference docRef = _firestoreDb.Collection(ExpensesCollection).Document(id);
            await docRef.DeleteAsync();
        }
    }
}
