namespace Budgetary_Desktop_App_Expanded
{
    partial class AboutForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            lblTitle = new Label();
            lblVersion = new Label();
            lblDescription = new Label();
            btnClose = new Button();
            SuspendLayout();
            // 
            // lblTitle
            // 
            lblTitle.AutoSize = true;
            lblTitle.Font = new Font("Segoe UI", 16F, FontStyle.Bold);
            lblTitle.Location = new Point(30, 20);
            lblTitle.Name = "lblTitle";
            lblTitle.Size = new Size(172, 30);
            lblTitle.TabIndex = 0;
            lblTitle.Text = "Budgetary App";
            // 
            // lblVersion
            // 
            lblVersion.AutoSize = true;
            lblVersion.Location = new Point(30, 60);
            lblVersion.Name = "lblVersion";
            lblVersion.Size = new Size(72, 15);
            lblVersion.TabIndex = 1;
            lblVersion.Text = "Version 1.0.0";
            // 
            // lblDescription
            // 
            lblDescription.AutoSize = true;
            lblDescription.Location = new Point(30, 90);
            lblDescription.Name = "lblDescription";
            lblDescription.Size = new Size(387, 60);
            lblDescription.TabIndex = 2;
            lblDescription.Text = "Budgetary App is a desktop application for managing expenses.\r\nIt allows users to track their spending, set budgets, and generate reports.\r\n\r\nDeveloped by Justin Jude Cabodil.";
            lblDescription.Click += lblDescription_Click;
            // 
            // btnClose
            // 
            btnClose.Location = new Point(180, 160);
            btnClose.Name = "btnClose";
            btnClose.Size = new Size(100, 30);
            btnClose.TabIndex = 3;
            btnClose.Text = "Close";
            btnClose.UseVisualStyleBackColor = true;
            btnClose.Click += btnClose_Click;
            // 
            // AboutForm
            // 
            ClientSize = new Size(450, 210);
            Controls.Add(btnClose);
            Controls.Add(lblDescription);
            Controls.Add(lblVersion);
            Controls.Add(lblTitle);
            FormBorderStyle = FormBorderStyle.FixedDialog;
            MaximizeBox = false;
            MinimizeBox = false;
            Name = "AboutForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "About Budgetary App";
            ResumeLayout(false);
            PerformLayout();
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            // Close the About form when the Close button is clicked
            this.Close();
        }

        private Label lblTitle;
        private Label lblVersion;
        private Label lblDescription;
        private Button btnClose;
    }

    #endregion
}
