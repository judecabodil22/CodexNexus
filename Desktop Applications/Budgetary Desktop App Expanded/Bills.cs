using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budgetary_Desktop_App_Expanded
{
    class Bills
    {
        public List<string> name { get; set; }
        public List<double> amount { get; set; }

        public int modeOfPayment { get; set; }

        public double startingBudget { get; set; }

        public double dailyBudget { get; set; }

        public Bills()
        {
            name = new List<string>();
            amount = new List<double>();
            modeOfPayment = 0;
            startingBudget = 0;
            dailyBudget = 0;
        }
    }
}