using Budgetary_Desktop_App_Expanded;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Budgetary_Desktop_App_Expanded
{
    public partial class AddExpensesForm : Form
    {


        private MainForm mainForm;

        public AddExpensesForm(MainForm mainForm)
        {
            this.mainForm = mainForm;
            InitializeComponent();

        }

        private void AddExpensesForm_Load(object sender, EventArgs e)
        {

        }

        private void txtAmount_KeyPress(object sender, KeyPressEventArgs e)
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


        private void btnAddExpense_Click(object sender, EventArgs e, MainForm mainForm)
        {

        }

        private void btnAddExpense_Click(object sender, EventArgs e)
        {
            MainForm form = new MainForm();
            string errorMessage = "";
            string errorTitle = "";
            Regex regex = new Regex("^[0-9]*(\\.[0-9]{1,2})?$");


            if (string.IsNullOrEmpty(txtExpenseName.Text))
            {
                errorMessage = "Please input an expense name.";
                errorTitle = "Error on Expense Name";
                wrongExpense();
            }
            else if (string.IsNullOrEmpty(cmbCategory.Text))
            {
                errorMessage = "Please choose a category.";
                errorTitle = "Error on Category";
                wrongExpense();
            }
            else if (!regex.IsMatch(txtAmount.Text))
            {
                errorMessage = "Please only input numbers.";
                errorTitle = "Error on Amount";
                wrongExpense();
            }
            else if (string.IsNullOrEmpty(cmbCategory.Text))
            {
                errorMessage = "Please only input numbers.";
                errorTitle = "Error on Amount";
                wrongExpense();
            }
            else
            {
                mainForm.listViewUpdate(txtExpenseName.Text, decimal.Parse(txtAmount.Text), cmbCategory.Text, chkRecurring.Checked);
            }


            void wrongExpense()
            {
                form.mainFormTextMessage(errorMessage, errorTitle, txtAmount);
            }
        }

        private void toolStripButtonAbout_Click(object sender, EventArgs e)
        {
            MessageBox.Show("This part of the app will allow you to input your expenses whether if it's recurring or not.\n\nKindly fill up the form and click the button to add the expense. You will then see it on the main form added on the list.");
        }

        private void AddExpensesForm_Load_1(object sender, EventArgs e)
        {

        }
    }
}
