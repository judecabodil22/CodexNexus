using System.Text.RegularExpressions;
using System;
using System.IO;
using System.Windows.Forms;
using iText.Kernel.Pdf;
using iText.Layout.Element;
using iText.Layout;
using PdfiumViewer;
using iText.Layout.Properties;

namespace Budgetary_Desktop_App_Expanded
{
    public partial class MainForm : Form
    {

        public List<Expense> expenseList = new List<Expense>();

        public class Expense
        {
            public string Name { get; set; }
            public string Category { get; set; }
            public decimal Amount { get; set; }
            public bool IsRecurring { get; set; }

            public Expense(string name, decimal amount, string category, bool isRecurring)
            {
                Name = name;
                Category = category;
                Amount = amount;
                IsRecurring = isRecurring;
            }
        }

        public class Budget
        {
            public decimal StartingBudget { get; set; }
            public decimal DailyBudget { get; set; }
        }

        public MainForm()
        {
            InitializeComponent();
        }

        private void lvExpenses_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void toolStripStatusLabel_Click(object sender, EventArgs e)
        {

        }

        private void btnAddExpense_Click(object sender, EventArgs e)
        {
            AddExpensesForm form = new AddExpensesForm(this);
            form.ShowDialog();
        }

        private void txtStartingBudget_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) &&
        (e.KeyChar != '.'))
            {
                e.Handled = true;
            }

            // only allow one decimal point
            if ((e.KeyChar == '.') && ((sender as TextBox).Text.IndexOf('.') > -1))
            {
                e.Handled = true;
            }
        }

        private void txtDailyBudget_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) &&
        (e.KeyChar != '.'))
            {
                e.Handled = true;
            }

            // only allow one decimal point
            if ((e.KeyChar == '.') && ((sender as TextBox).Text.IndexOf('.') > -1))
            {
                e.Handled = true;
            }
        }

        public void mainFormTextMessage(string errorMessage, string errorTitle, TextBox component)
        {
            MessageBox.Show(errorMessage, errorTitle, MessageBoxButtons.OK, MessageBoxIcon.Error);
            if (component.Text.Length > 0)
            {
                component.Text = component.Text.Remove(component.Text.Length - 1);
            }
            else
            {
                component.Text = component.Text.Remove(component.Text.Length);
            }
            component.SelectionStart = component.Text.Length;
        }

        public void mainFormTextMessage(string errorMessage, string errorTitle, ComboBox component)
        {
            MessageBox.Show(errorMessage, errorTitle, MessageBoxButtons.OK, MessageBoxIcon.Error);
            if (component.Text.Length > 0)
            {
                component.Text = component.Text.Remove(component.Text.Length - 1);
            }
            else
            {
                component.Text = component.Text.Remove(component.Text.Length);
            }
            component.SelectionStart = component.Text.Length;
        }

        public void listViewUpdate(string expenseName, decimal amount, string category, bool isRecurring)
        {
            ListViewItem item = new ListViewItem(expenseName);
            item.SubItems.Add(amount.ToString());
            item.SubItems.Add(category);
            lvExpenses.Items.Add(item);

            Expense newExpense = new Expense(expenseName, amount, category, isRecurring);
            expenseList.Add(newExpense);

        }

        private void btnGenerateReport_Click(object sender, EventArgs e)
        {
            // Regex to allow only numbers
            Regex regex = new Regex("^[0-9]*$");
            if (!regex.IsMatch(txtStartingBudget.Text) && !regex.IsMatch(txtDailyBudget.Text))
            {
                string errorMessage = "Please input only numbers on both fields (Starting Budget and Daily Budget).";
                string errorTitle = "Error on Starting Budget and Daily Budget";
                mainFormTextMessage(errorMessage, errorTitle, txtStartingBudget);
            }
            else if (!regex.IsMatch(txtStartingBudget.Text))
            {
                string errorMessage = "Please input only numbers on Starting Budget.";
                string errorTitle = "Error on Starting Budget";
                mainFormTextMessage(errorMessage, errorTitle, txtStartingBudget);
            }
            else if (!regex.IsMatch(txtDailyBudget.Text))
            {
                string errorMessage = "Please input only numbers on Daily Budget.";
                string errorTitle = "Error on Daily Budget";
                mainFormTextMessage(errorMessage, errorTitle, txtDailyBudget);
            }
            else if (string.IsNullOrEmpty(txtStartingBudget.Text))
            {
                string errorMessage = "Starting Budget must not be empty.";
                string errorTitle = "Error on Starting Budget";
                mainFormTextMessage(errorMessage, errorTitle, txtStartingBudget);
            }
            else if (string.IsNullOrEmpty(txtDailyBudget.Text))
            {
                string errorMessage = "Daily Budget must not be empty.";
                string errorTitle = "Error on Daily Budget";
                mainFormTextMessage(errorMessage, errorTitle, txtDailyBudget);
            }
            else if (string.IsNullOrEmpty(cboModeOfPayment.Text))
            {
                string errorMessage = "Please select a mode of payment.";
                string errorTitle = "Error on Mode of Payment";
                mainFormTextMessage(errorMessage, errorTitle, cboModeOfPayment);
            }
            else
            {
                //GeneratePdfReport("Reports/" + $"{DateTime.Today.ToString("D")}" + " report.pdf");
                GeneratePdfReport("temp/report.pdf");
                btnPreviewReport();

            }


        }

        private void GeneratePdfReport(string fileName)
        {
            decimal startingBudget = decimal.Parse(txtStartingBudget.Text);
            decimal dailyBudget = decimal.Parse(txtDailyBudget.Text);


            using (iText.Kernel.Pdf.PdfWriter writer = new iText.Kernel.Pdf.PdfWriter(fileName)) // Fully qualify PdfWriter
            {
                using (iText.Kernel.Pdf.PdfDocument pdf = new iText.Kernel.Pdf.PdfDocument(writer)) // Fully qualify PdfDocument
                {
                    iText.Layout.Document document = new iText.Layout.Document(pdf); // Fully qualify Document
                    decimal oneoffExpenses = 0;
                    decimal recurringExpenses = 0;

                    // Add title to the document
                    Paragraph title = new Paragraph("Budgetary App Report " + DateTime.Today.ToString("D")).SetBold();
                    document.Add(title);


                    // Extract Income and Budget details
                    Paragraph incomeBudgetTitle = new Paragraph("Starting and Daily Budget").SetBold();
                    Paragraph incomeBudget = new Paragraph();
                    incomeBudget.Add("Mode of Income: " + cboModeOfPayment.Text);
                    incomeBudget.Add("\nStarting Budget: ₱" + startingBudget.ToString("0.00").PadLeft(85, ' '));
                    incomeBudget.Add("\nDaily Budget: ₱" + dailyBudget.ToString("0.00").PadLeft(91, ' '));

                    Table expenseTable = new Table(UnitValue.CreatePercentArray(3)).UseAllAvailableWidth();
                    expenseTable.AddHeaderCell("Expense Name");
                    expenseTable.AddHeaderCell("Category");
                    expenseTable.AddHeaderCell("Amount");

                    Table expenseTableRecurring = new Table(UnitValue.CreatePercentArray(3)).UseAllAvailableWidth();
                    expenseTableRecurring.AddHeaderCell("Expense Name");
                    expenseTableRecurring.AddHeaderCell("Category");
                    expenseTableRecurring.AddHeaderCell("Amount");

                    foreach (var item in expenseList)
                    {
                        string expenseName = item.Name;
                        string category = item.Category;
                        string amount = "₱" + item.Amount;

                        if (item.IsRecurring)
                        {
                            expenseTableRecurring.AddCell(expenseName);
                            expenseTableRecurring.AddCell(category);
                            expenseTableRecurring.AddCell(amount);

                            recurringExpenses += item.Amount;

                        }
                        else
                        {
                            expenseTable.AddCell(expenseName);
                            expenseTable.AddCell(category);
                            expenseTable.AddCell(amount);

                            oneoffExpenses += item.Amount;


                        }

                    }

                    int daysRemaining = DateTime.DaysInMonth(int.Parse(DateTime.Now.ToString("yyyy")), int.Parse(DateTime.Now.ToString("MM"))) - int.Parse(DateTime.Now.ToString("dd"));
                    decimal totalExpense = oneoffExpenses + recurringExpenses;
                    decimal actualBudget = startingBudget - (oneoffExpenses + recurringExpenses);
                    Paragraph expensesTitle = new Paragraph("\nExpenses Details").SetBold();
                    Paragraph expensesParagraph = new Paragraph();
                    expensesParagraph.Add("Total One-time Expenses: ₱" + oneoffExpenses.ToString("0.00").PadLeft(70, ' ')).SetFontSize(12);
                    expensesParagraph.Add("\nTotal Recurring Expenses: ₱" + recurringExpenses.ToString("0.00").PadLeft(69, ' '));
                    expensesParagraph.Add($"\nTotal Expenses: ₱" + totalExpense.ToString("0.00").PadLeft(86, ' '));
                    expensesParagraph.Add($"\n\nActual Budget expenses: " + actualBudget.ToString("0.00").PadLeft(49, ' '));

                    string nxtCutoff = cboModeOfPayment.SelectedIndex == 0 ? $"Days remaining until next cutoff: {daysRemaining.ToString().PadRight(25)}\n".PadLeft(70, ' ') : $"Days remaining until next cutoff: {(daysRemaining / 4).ToString().PadRight(25)}\n".PadLeft(70, ' ');
                    Paragraph nextCutOff = new Paragraph(nxtCutoff);
                    document.Add(nextCutOff);

                    // Add the income and budget details
                    document.Add(incomeBudgetTitle);
                    document.Add(incomeBudget);

                    // Add the expense table
                    document.Add(new Paragraph("One-time Expenses:").SetBold());
                    document.Add(expenseTable);

                    document.Add(new Paragraph("Recurring Expenses:").SetBold());
                    document.Add(expenseTableRecurring);
                    document.Add(expensesTitle);
                    document.Add(expensesParagraph);
                    var remainingDaysBudget = int.Parse(actualBudget.ToString()) / int.Parse(dailyBudget.ToString());
                    int.Parse(remainingDaysBudget.ToString());
                    Paragraph remainingDays = new Paragraph();
                    remainingDays.Add($"\nComputing Daily Budget against the remaining balance:{remainingDaysBudget.ToString().PadLeft(25, ' ')}");
                    remainingDays.Add($"\n\nIf you stick to your daily budget, you may have {remainingDaysBudget} days against the next cut off (if this value is negative, then you are spending more than your actual budget and we suggest that you lower your daily budget to encourage savings.)");
                    document.Add(remainingDays);
                    document.Add(new Paragraph("----------------------------------------------------------------------------------------------------------------------------------"));

                    Paragraph savings = new Paragraph("\nEstimated Savings").SetBold();
                    document.Add(savings);
                    var cutoff = cboModeOfPayment.SelectedIndex == 0 ? daysRemaining : (daysRemaining / 4);
                    decimal actualSavings = (remainingDaysBudget - cutoff) * dailyBudget;
                    document.Add(new Paragraph($"End of cycle savings: {actualSavings.ToString("0.00").PadLeft(75, ' ')}"));
                    document.Add(new Paragraph($"You will save {actualSavings.ToString("0.00")} by the end of the cycle if you manage to keep your daily expenses below your daily budget."));

                }
            }
        }

        private void toolStripButtonAbout_Click(object sender, EventArgs e)
        {
            AboutForm form = new AboutForm();
            form.ShowDialog();
        }

        public void btnPreviewReport()
        {
            // Generate the PDF report and save it to a temporary file
            //string pdfFilePath = "Reports/" + $"{DateTime.Today.ToString("D")}" + " report.pdf"; ; // Replace this with your actual method to generate PDF 
            string pdfFilePath = "temp/report.pdf";
            PdfPreviewForm form = new PdfPreviewForm();
            // Load the PDF report into the PdfViewer
            form.LoadPdfReport(pdfFilePath);

            form.ShowDialog(this);
        }

        private void MainForm_Load_1(object sender, EventArgs e)
        {

        }
    }
}