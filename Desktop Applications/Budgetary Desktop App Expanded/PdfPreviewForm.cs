using PdfiumViewer;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Budgetary_Desktop_App_Expanded
{
    public partial class PdfPreviewForm : Form
    {
        private PdfViewer pdfViewer;
        private string PdffilePath = "";
        public PdfPreviewForm()
        {
            InitializeComponent();
            InitializePdfViewer();
        }

        private void PdfPreviewForm_Load(object sender, EventArgs e)
        {
        }

        private void InitializePdfViewer()
        {
            pdfViewer = new PdfViewer
            {
                Dock = DockStyle.Fill,
                ShowToolbar = true, // Optionally, show the toolbar
               
            };

            Controls.Add(pdfViewer);
        }

        // Method to load a PDF file into the PdfViewer
        public void LoadPdfReport(string filePath)
        {
            pdfViewer.Document?.Dispose(); // Dispose the current document
            pdfViewer.Document = PdfiumViewer.PdfDocument.Load(filePath);
            PdffilePath = filePath;
        }

        protected override void OnFormClosed(FormClosedEventArgs e)
        {
            base.OnFormClosed(e);
            pdfViewer.Document?.Dispose();
            // Delete the PDF file after the form is closed
            if (File.Exists(PdffilePath))
            {
                File.Delete(PdffilePath);
            }
        }
    }
}
