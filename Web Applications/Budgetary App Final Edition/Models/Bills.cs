namespace Budgetary_App_Final_Edition.Models
{
    public class Bills
    {

        public int id { get; set; }

        public string name { get; set; }
        public double amount { get; set; }
        public int modeofPayment { get; set; }
        
        public string category { get; set; }
        public double startingBudget { get; set; }
        public double dailyBudget { get; set; }

        public DateTime date { get; set; }
        public Bills()
        {
        }
    }
}
