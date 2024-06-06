
using System.Runtime.CompilerServices;

bool isInputValid = false;
modeofIncome();

void modeofIncome()
{
    string modeOfSalary = "";
    int mode = 0;
    Bills bills = new Bills();
    try
    {
        while (!isInputValid)
        {

            Console.WriteLine("First, it's important for us to know how frequent you are being paid. Is it semi-monthly or monthly? \n 1. Monthly (Monthly Payroll) \n 2. Semi-monthly (Bi-weekly Payroll) \n\n Please press 3 on your keyboard if you want to exit the app.");

            modeOfSalary = Console.ReadLine();

            if (int.TryParse(modeOfSalary, out mode))
            {
                if (mode == 3)
                {
                    break;
                }
                else if (mode == 1 || mode == 2)
                {

                    if (mode == 1)
                    {
                        bills.modeOfPayment = 1;
                        Console.WriteLine("Got it! You are being paid monthly!");
                        dailyBudget(bills);
                    }
                    else
                    {
                        bills.modeOfPayment = 2;
                        Console.WriteLine("Got it! You are being paid semi-monthly!");
                        dailyBudget(bills);
                    }

                }

            }
        }


    }
    catch (System.Exception)
    {

        throw;
    }
}

void dailyBudget(Bills bills)
{
    string budget = "";
    double testBudget = 0;
    try
    {
        isInputValid = false;
        Console.WriteLine("\nNow we want to know your minimum expenditures per day or how much you are willing to spend a day / your daily budget.");

        while (!isInputValid)
        {
            Console.WriteLine("\nPlease enter your minimum budget for a day:");
            budget = Console.ReadLine();

            if (double.TryParse(budget, out testBudget))
            {
                Console.WriteLine($"Noted! Your budget is {testBudget} pesos a day.");
                isInputValid = true;
                bills.dailyBudget = testBudget;
            }
            else
            {
                budget = "";
                isInputValid = false;
                Console.WriteLine("Please enter a valid amount.");
            }
        }

        utilityBills(bills);

    }
    catch (System.Exception)
    {

        throw;
    }
}

void utilityBills(Bills bills)
{
    try
    {
        Console.WriteLine("\n\nThis part of the program will let us know if you have any recurring bills that we should consider before we allocate your funds.");
        isInputValid = false;
        int newBill = 0;

        while (!isInputValid)
        {

            bool notCorrect = false;
            bool notExpense = false;

            Console.WriteLine("Do you want to add a new bill?\n1. Yes\n2. No");

            if (int.TryParse(Console.ReadLine(), out newBill))
            {

                if (newBill == 1)
                {
                    Console.WriteLine("What is the name of this bill?");
                    bills.name.Add(Console.ReadLine());
                    Console.WriteLine($"Got it! The name of this bill is {bills.name[bills.name.Count - 1]}.");



                    while (!notExpense)
                    {
                        Console.WriteLine("How much are you paying for this bill every month?");
                        if (double.TryParse(Console.ReadLine(), out double billExpense))
                        {
                            bills.amount.Add(billExpense);
                            Console.WriteLine($"Got it! You are paying this {bills.name[bills.name.Count - 1]} bill for {bills.amount[bills.amount.Count - 1]} pesos every month.");
                            notExpense = true;
                        }
                        else
                        {
                            notExpense = false;

                        }

                    }

                    while (!notCorrect)
                    {
                        Console.WriteLine("Is this correct or do you want to change it? \n1. Correct\n2. Change it.");
                        if (int.TryParse(Console.ReadLine(), out int choice))
                        {
                            if (choice == 1)
                            {
                                Console.WriteLine($"Got it! You are paying this {bills.name[bills.name.Count - 1]} bill for {bills.amount[bills.amount.Count - 1]} pesos every month.");

                                break;
                            }
                            else if (choice == 2)
                            {
                                changeBillName(bills, bills.name.Count - 1);
                                changeBillAmount(bills, bills.name.Count - 1);
                            }
                        }

                    }



                }
                else if (newBill == 2)
                {
                    break;
                }

            }

        }

        printBills(bills);
        startingBudget(bills);
    }
    catch (System.Exception)
    {

        throw;
    }
}

void changeBillName(Bills bills, int billCount)
{
    Console.WriteLine("Please enter a proper name for this bill.");
    bills.name[billCount] = Console.ReadLine();
    Console.WriteLine($"Alright. The new name is {bills.name[billCount]}.");
}

void changeBillAmount(Bills bills, int billCount)
{
    Console.WriteLine("Change the amount of this bill to: ");

    bool setAmount = false;
    while (!setAmount)
    {
        if (double.TryParse(Console.ReadLine(), out double result))
        {
            bills.amount[billCount] = result;
            break;
        }
        else
        {
            Console.WriteLine("Please enter a valid number.");
        }

    }


    Console.WriteLine($"Alright. The new amount is {bills.amount[billCount]}.");
}

void printBills(Bills bills)
{
    Console.WriteLine("Listed below are your corresponding bills:");
    for (int i = 0; i < bills.name.Count; i++)
    {
        Console.WriteLine($"Name: {bills.name[i]}, Amount:{bills.amount[i]}");
    }
}

void startingBudget(Bills bills)
{
    try
    {
        bool isInputValid = false;

        Console.WriteLine("\nThis part of the program allows you to input your starting budget for the current cutoff.\nWe recommend entering your budget after taxes have been deducted.\nWe will then divide this budget based on whether you chose to be paid monthly or semi-monthly.");

        while (!isInputValid)
        {
            Console.WriteLine("Please input starting budget:");

            if (double.TryParse(Console.ReadLine(), out double startingBudget))
            {

                bills.startingBudget = startingBudget;

                Console.WriteLine($"Got it! Your budget is {startingBudget}.");
                Console.WriteLine(bills.modeOfPayment);
                Console.WriteLine(bills.modeOfPayment == 1 ? "We will now be dividing your budget for 30 days and automatically deducting your bills." : "We will now be dividing your budget for two weeks. Automatically deducting your bills at the second cutoff ");

                monthlyPaymentCalculation(bills);
                isInputValid = true;
            }
            else
            {
                Console.WriteLine("Input a valid number.");
            }

        }
    }
    catch (System.Exception)
    {

        throw;
    }

}

void monthlyPaymentCalculation(Bills bills)
{
    var mop = bills.modeOfPayment == 1 ? "Monthly" : "Semi-Annual";

    // Initializing report to a text file
    string fileName = "budget_report.txt";
    string filePath = Path.Combine(Environment.CurrentDirectory, fileName);
    int daysRemaining = 0;
    double totalAmount = 0;
    double budgetDeduction = 0;
    daysRemaining = DateTime.DaysInMonth(int.Parse(DateTime.Now.ToString("yyyy")), int.Parse(DateTime.Now.ToString("MM"))) - int.Parse(DateTime.Now.ToString("dd"));

    foreach (double item in bills.amount)
    {
        totalAmount += item;
    }


    budgetDeduction = bills.startingBudget - totalAmount;

    if (!File.Exists(filePath))
    {
        string report = "---------------------------------\n";
        report += "         Budget Report           \n";
        report += "---------------------------------\n";
        report += $"Date: {DateTime.Today.ToString("MM-dd-yyyy").PadRight(25)}\n";
        report += $"Mode of Payment: {mop.PadRight(25)}\n";
        report += $"Starting Budget: {bills.startingBudget.ToString("N").PadRight(25)}\n";
        report += "---------------------------------\n";
        report += bills.modeOfPayment == 1 ? $"Days remaining until next cutoff: {daysRemaining.ToString("N").PadRight(25)}\n" : $"Days remaining until next cutoff: {(daysRemaining / 2).ToString("N").PadRight(25)}\n"; ;
        report += $"Total Bills: {totalAmount.ToString("N").PadRight(25)}\n";
        report += bills.modeOfPayment == 1 ? $"Starting Budget after bills deduction: {budgetDeduction.ToString("N").PadRight(25)}\n" : daysRemaining < 16 ? "No deductions for this cutoff. Deductions will be included in the next cutoff of 30th." : $"Starting Budget after bills deduction: {budgetDeduction.ToString("N").PadRight(25)}\n";
        report += $"Actual Daily Budget: {bills.dailyBudget.ToString("N").PadRight(25)}\n";
        report += $"Maximum Daily Budget: {(budgetDeduction / daysRemaining).ToString("N").PadRight(25)}\n";
        report += $"Expected end of cycle savings: {(budgetDeduction - (daysRemaining * bills.dailyBudget)).ToString("N").PadRight(25)}\n";
        report += "---------------------------------\n";

        File.WriteAllText(filePath, report);
        Console.WriteLine($"Budget report has been written to {fileName}.");
    }
    else if (File.Exists(filePath))
    {
        string report = $"Date: {DateTime.Today.ToString("MM-dd-yyyy").PadRight(25)}\n";
        report += $"Mode of Payment: {mop.PadRight(25)}\n";
        report += $"Starting Budget: {bills.startingBudget.ToString("N").PadRight(25)}\n";
        report += "---------------------------------\n";
        report += $"Days remaining until next cutoff: {daysRemaining.ToString("N").PadRight(25)}\n";
        report += $"Total Bills: {totalAmount.ToString("N").PadRight(25)}\n";
        report += $"Starting Budget after bills deduction: {budgetDeduction.ToString("N").PadRight(25)}\n";
        report += $"Actual Daily Budget: {bills.dailyBudget.ToString("N").PadRight(25)}\n";
        report += $"Maximum Daily Budget: {(budgetDeduction / daysRemaining).ToString("N").PadRight(25)}\n";
        report += $"Expected end of cycle savings: {(budgetDeduction - (daysRemaining * bills.dailyBudget)).ToString("N").PadRight(25)}\n";
        report += "---------------------------------\n";

        File.AppendAllText(filePath, report);
        Console.WriteLine($"Budget report has been written to {fileName}.");
    }
}

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
