using System.Text.RegularExpressions;

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
            else if(string.IsNullOrEmpty(txtDailyBudget.Text))
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
        }

        public void listViewUpdate(string expenseName, string category, string amount)
        {
            ListViewItem item = new ListViewItem(expenseName);
            item.SubItems.Add(amount);
            item.SubItems.Add(category);
            lvExpenses.Items.Add(item);
        }
    }
}
