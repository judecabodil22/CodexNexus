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

        private void btnAddExpense_Click(object sender, EventArgs e)
        {
            Regex regex = new Regex("^[0-9]*$");
            if (!regex.IsMatch(txtAmount.Text) && !regex.IsMatch(txtAmount.Text))
            {
                string errorMessage = "Please input only numbers on amount.";
                string errorTitle = "Error on Starting Budget and Daily Budget";
                mainForm.mainFormTextMessage(errorMessage, errorTitle,txtAmount);
            }
        }
    }
}
