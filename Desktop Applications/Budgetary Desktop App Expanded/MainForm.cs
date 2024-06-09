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

        private void MainForm_Load(object sender, EventArgs e)
        {
            groupBoxBudget.Text = $"Budget Information ({DateTime.Today.ToString("D")})";

            var item1 = new ListViewItem(new[] { "Coffee", "Food", "3.50" });
            var item2 = new ListViewItem(new[] { "Bus Ticket", "Transport", "2.50" });
            lvExpenses.Items.Add(item1);
            lvExpenses.Items.Add(item2);
        }

        public void listViewUpdate(string expenseName, string category, string amount)
        {
            ListViewItem item = new ListViewItem(expenseName);
            item.SubItems.Add(amount);
            item.SubItems.Add(category);
            lvExpenses.Items.Add(item);
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
            float startingBudget = float.Parse(txtStartingBudget.Text);
            float dailyBudget = float.Parse(txtDailyBudget.Text);

            using (iText.Kernel.Pdf.PdfWriter writer = new iText.Kernel.Pdf.PdfWriter(fileName)) // Fully qualify PdfWriter
            {
                using (iText.Kernel.Pdf.PdfDocument pdf = new iText.Kernel.Pdf.PdfDocument(writer)) // Fully qualify PdfDocument
                {
                    iText.Layout.Document document = new iText.Layout.Document(pdf); // Fully qualify Document
                    double totalExpensesval = 0;

                    // Add title to the document
                    Paragraph title = new Paragraph("Budgetary App Report " + DateTime.Today.ToString("D"));
                    document.Add(title);

                    // Extract Income and Budget details
                    Paragraph incomeBudget = new Paragraph("Starting and Daily Budget");
                    incomeBudget.Add("\nMode of Income: " + cboModeOfPayment.Text);
                    incomeBudget.Add("\nStarting Budget: ₱" + startingBudget.ToString("0.00"));
                    incomeBudget.Add("\nDaily Budget: ₱" + dailyBudget.ToString("0.00"));

                    // Add expenses to the document
                    Table expenseTable = new Table(UnitValue.CreatePercentArray(3)).UseAllAvailableWidth();
                    expenseTable.AddHeaderCell("Expense Name");
                    expenseTable.AddHeaderCell("Category");
                    expenseTable.AddHeaderCell("Amount");

                    foreach (ListViewItem item in lvExpenses.Items)
                    {
                        // Extract expense details
                        string expenseName = item.SubItems[0].Text;
                        string category = item.SubItems[1].Text;
                        string amount = "₱" + float.Parse(item.SubItems[2].Text).ToString("0.00");

                        // Add row to the table
                        expenseTable.AddCell(expenseName);
                        expenseTable.AddCell(category);
                        expenseTable.AddCell(amount);

                        totalExpensesval += float.Parse(item.SubItems[2].Text);
                    }

                    int daysRemaining = DateTime.DaysInMonth(int.Parse(DateTime.Now.ToString("yyyy")), int.Parse(DateTime.Now.ToString("MM"))) - int.Parse(DateTime.Now.ToString("dd"));
                   
                    Paragraph totalExpenses = new Paragraph("\nTotal Expenses: ₱" + totalExpensesval.ToString("0.00"));
                    string nxtCutoff = cboModeOfPayment.SelectedIndex == 0 ? $"Days remaining until next cutoff: {daysRemaining.ToString("N").PadRight(25)}\n" : $"Days remaining until next cutoff: {(daysRemaining / 2).ToString("N").PadRight(25)}\n";
                    Paragraph nextCutOff = new Paragraph(nxtCutoff);
                    // Add the income and budget details
                    document.Add(incomeBudget);

                    // Add the expense table
                    document.Add(expenseTable);

                    document.Add(totalExpenses);
                    document.Add(nextCutOff);
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

    }
}