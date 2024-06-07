namespace Budgetary_Desktop_App_Expanded
{
    partial class MainForm
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            groupBoxBudget = new GroupBox();
            label1 = new Label();
            txtStartingBudget = new TextBox();
            label2 = new Label();
            txtDailyBudget = new TextBox();
            label3 = new Label();
            cboModeOfPayment = new ComboBox();
            groupBoxExpenses = new GroupBox();
            lvExpenses = new ListView();
            columnName = new ColumnHeader();
            columnAmount = new ColumnHeader();
            columnCategory = new ColumnHeader();
            btnAddExpense = new Button();
            btnGenerateReport = new Button();
            groupBoxBudget.SuspendLayout();
            groupBoxExpenses.SuspendLayout();
            SuspendLayout();
            // 
            // groupBoxBudget
            // 
            groupBoxBudget.Controls.Add(label1);
            groupBoxBudget.Controls.Add(txtStartingBudget);
            groupBoxBudget.Controls.Add(label2);
            groupBoxBudget.Controls.Add(txtDailyBudget);
            groupBoxBudget.Controls.Add(label3);
            groupBoxBudget.Controls.Add(cboModeOfPayment);
            groupBoxBudget.Location = new Point(12, 12);
            groupBoxBudget.Name = "groupBoxBudget";
            groupBoxBudget.Size = new Size(300, 150);
            groupBoxBudget.TabIndex = 0;
            groupBoxBudget.TabStop = false;
            groupBoxBudget.Text = "Budget Information";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(6, 30);
            label1.Name = "label1";
            label1.Size = new Size(92, 15);
            label1.TabIndex = 0;
            label1.Text = "Starting Budget:";
            // 
            // txtStartingBudget
            // 
            txtStartingBudget.Location = new Point(120, 27);
            txtStartingBudget.Name = "txtStartingBudget";
            txtStartingBudget.PlaceholderText = "Numbers only";
            txtStartingBudget.Size = new Size(160, 23);
            txtStartingBudget.TabIndex = 1;
            txtStartingBudget.KeyPress += txtStartingBudget_KeyPress;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(6, 60);
            label2.Name = "label2";
            label2.Size = new Size(77, 15);
            label2.TabIndex = 2;
            label2.Text = "Daily Budget:";
            // 
            // txtDailyBudget
            // 
            txtDailyBudget.Location = new Point(120, 57);
            txtDailyBudget.Name = "txtDailyBudget";
            txtDailyBudget.PlaceholderText = "Numbers only";
            txtDailyBudget.Size = new Size(160, 23);
            txtDailyBudget.TabIndex = 3;
            txtDailyBudget.KeyPress += txtDailyBudget_KeyPress;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(6, 90);
            label3.Name = "label3";
            label3.Size = new Size(105, 15);
            label3.TabIndex = 4;
            label3.Text = "Mode of Payment:";
            // 
            // cboModeOfPayment
            // 
            cboModeOfPayment.DropDownStyle = ComboBoxStyle.DropDownList;
            cboModeOfPayment.FormattingEnabled = true;
            cboModeOfPayment.Items.AddRange(new object[] { "Monthly", "Semi-Monthly" });
            cboModeOfPayment.Location = new Point(120, 87);
            cboModeOfPayment.Name = "cboModeOfPayment";
            cboModeOfPayment.Size = new Size(160, 23);
            cboModeOfPayment.TabIndex = 5;
            // 
            // groupBoxExpenses
            // 
            groupBoxExpenses.Controls.Add(lvExpenses);
            groupBoxExpenses.Controls.Add(btnAddExpense);
            groupBoxExpenses.Controls.Add(btnGenerateReport);
            groupBoxExpenses.Location = new Point(12, 180);
            groupBoxExpenses.Name = "groupBoxExpenses";
            groupBoxExpenses.Size = new Size(300, 250);
            groupBoxExpenses.TabIndex = 6;
            groupBoxExpenses.TabStop = false;
            groupBoxExpenses.Text = "Expenses";
            // 
            // lvExpenses
            // 
            lvExpenses.Columns.AddRange(new ColumnHeader[] { columnName, columnAmount, columnCategory });
            lvExpenses.FullRowSelect = true;
            lvExpenses.GridLines = true;
            lvExpenses.Location = new Point(6, 20);
            lvExpenses.Name = "lvExpenses";
            lvExpenses.Size = new Size(280, 180);
            lvExpenses.TabIndex = 7;
            lvExpenses.UseCompatibleStateImageBehavior = false;
            lvExpenses.View = View.Details;
            lvExpenses.SelectedIndexChanged += lvExpenses_SelectedIndexChanged;
            // 
            // columnName
            // 
            columnName.Text = "Name";
            columnName.Width = 100;
            // 
            // columnAmount
            // 
            columnAmount.Text = "Amount";
            columnAmount.Width = 100;
            // 
            // columnCategory
            // 
            columnCategory.Text = "Category";
            columnCategory.Width = 80;
            // 
            // btnAddExpense
            // 
            btnAddExpense.Location = new Point(6, 210);
            btnAddExpense.Name = "btnAddExpense";
            btnAddExpense.Size = new Size(130, 30);
            btnAddExpense.TabIndex = 8;
            btnAddExpense.Text = "Add Expense";
            btnAddExpense.UseVisualStyleBackColor = true;
            btnAddExpense.Click += btnAddExpense_Click;
            // 
            // btnGenerateReport
            // 
            btnGenerateReport.Location = new Point(156, 210);
            btnGenerateReport.Name = "btnGenerateReport";
            btnGenerateReport.Size = new Size(130, 30);
            btnGenerateReport.TabIndex = 9;
            btnGenerateReport.Text = "Generate Report";
            btnGenerateReport.UseVisualStyleBackColor = true;
            btnGenerateReport.Click += btnGenerateReport_Click;
            // 
            // MainForm
            // 
            ClientSize = new Size(327, 480);
            Controls.Add(groupBoxBudget);
            Controls.Add(groupBoxExpenses);
            FormBorderStyle = FormBorderStyle.FixedDialog;
            Name = "MainForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Budgetary App";
            Load += MainForm_Load;
            groupBoxBudget.ResumeLayout(false);
            groupBoxBudget.PerformLayout();
            groupBoxExpenses.ResumeLayout(false);
            ResumeLayout(false);
        }

        private System.Windows.Forms.GroupBox groupBoxBudget;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtStartingBudget;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtDailyBudget;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox cboModeOfPayment;
        private System.Windows.Forms.GroupBox groupBoxExpenses;
        private System.Windows.Forms.ListView lvExpenses;
        private System.Windows.Forms.ColumnHeader columnName;
        private System.Windows.Forms.ColumnHeader columnAmount;
        private System.Windows.Forms.ColumnHeader columnCategory;
        private System.Windows.Forms.Button btnAddExpense;
        private System.Windows.Forms.Button btnGenerateReport;
    }

        #endregion
    }

