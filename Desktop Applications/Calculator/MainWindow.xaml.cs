using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Calculator
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        decimal firstOperation = 0;
        decimal secondOperation = 0;
        bool inOperation = false;
        int operation = 0;
        public MainWindow()
        {
            InitializeComponent();
            TextBoxAnswer_Btn.Text = "0";
        }

        private void testIfTextBoxIsZero(string number)
        {
            if (TextBoxAnswer_Btn.Text == "0")
            {
                TextBoxAnswer_Btn.Text = number;
            }
            else
            {
                TextBoxAnswer_Btn.Text += number;
            }

        }

        private string Operations(decimal firstOperation, decimal secondOperation, int operation)
        {
            decimal answer = 0;
            if (TextBoxAnswer_Btn.Text != "0")
            {
                if (operation == 1)
                {
                    answer = firstOperation + secondOperation;
                    Operation_Text.Text = firstOperation.ToString() + " + " + secondOperation.ToString() + " = " + answer;
                }
                else if (operation == 2)
                {
                    answer = firstOperation - secondOperation;
                    Operation_Text.Text = firstOperation.ToString() + " - " + secondOperation.ToString() + " = " + answer;
                }
                else if (operation == 3)
                {
                    answer = firstOperation * secondOperation;
                    Operation_Text.Text = firstOperation.ToString() + " * " + secondOperation.ToString() + " = " + answer;
                }
                else if (operation == 4)
                {
                    answer = firstOperation / secondOperation;
                    Operation_Text.Text = firstOperation.ToString() + " / " + secondOperation.ToString() + " = " + answer;
                }
            }

            return answer.ToString();
        }

        private void One_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("1");
        }

        private void Two_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("2");
        }

        private void Three_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("3");
        }

        private void Four_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("4");
        }

        private void Five_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("5");
        }

        private void Six_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("6");
        }

        private void Seven_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("7");
        }

        private void Eight_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("8");
        }

        private void Nine_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("9");
        }

        private void Zero_Btn_Click(object sender, RoutedEventArgs e)
        {
            testIfTextBoxIsZero("0");
        }

        private void Decimal_Btn_Click(object sender, RoutedEventArgs e)
        {
            if (!TextBoxAnswer_Btn.Text.Contains("."))
            {
                TextBoxAnswer_Btn.Text += ".";
            }
        }

        private void ClearAll_Btn_Click(object sender, RoutedEventArgs e)
        {
            if (TextBoxAnswer_Btn.Text != "0")
            {
                TextBoxAnswer_Btn.Text = "0";
            }
        }

        private void ClearEntry_Btn_Click(object sender, RoutedEventArgs e)
        {
            TextBoxAnswer_Btn.Text = "0";
        }

        private void Modulo_Btn_Click(object sender, RoutedEventArgs e)
        {

        }

        //Operations
        private void Add_Btn_Click(object sender, RoutedEventArgs e)
        {
            
                
                operation = 1;
                firstOperation = Decimal.Parse(TextBoxAnswer_Btn.Text);
                TextBoxAnswer_Btn.Text = "0";
                Operation_Text.Text = firstOperation.ToString() + " + ";
            
        }

        private void Equal_Btn_Click(object sender, RoutedEventArgs e)
        {
            if (TextBoxAnswer_Btn.Text != "0" && inOperation == true)
            {
                secondOperation = Decimal.Parse(TextBoxAnswer_Btn.Text);
                TextBoxAnswer_Btn.Text = Operations(firstOperation, secondOperation, operation);
                inOperation = false;
            }
        }

        private void Subtract_Btn_Click(object sender, RoutedEventArgs e)
        {
            if(TextBoxAnswer_Btn.Text != "0")
            {
                inOperation = true;
                operation = 2;
                firstOperation = Decimal.Parse(TextBoxAnswer_Btn.Text);
                TextBoxAnswer_Btn.Text = "0";
                Operation_Text.Text = firstOperation.ToString() + " - ";
            }
        }

        private void Multiply_Btn_Click(object sender, RoutedEventArgs e)
        {
            if(TextBoxAnswer_Btn.Text != "0")
            {
                inOperation = true;
                operation = 3;
                firstOperation = Decimal.Parse(TextBoxAnswer_Btn.Text);
                TextBoxAnswer_Btn.Text = "0";
                Operation_Text.Text = firstOperation.ToString() + " * ";
            }
        }

        private void Divide_Btn_Click(object sender, RoutedEventArgs e)
        {
            if(TextBoxAnswer_Btn.Text != "0")
            {
                inOperation = true;
                operation = 4;
                firstOperation = Decimal.Parse(TextBoxAnswer_Btn.Text);
                TextBoxAnswer_Btn.Text = "0";
                Operation_Text.Text = firstOperation.ToString() + " / ";
            }
        }
    }
}