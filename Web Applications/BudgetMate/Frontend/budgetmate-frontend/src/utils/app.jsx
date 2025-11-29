/* --- script.js --- */

const API_BASE_URL_EXPENSES = '/api/expenses';
const API_BASE_URL_INCOME = '/api/income'; // Assuming you'll have an income API
const API_BASE_URL_GOALS = '/api/goals'; // Assuming you'll have a goals API

// --- Chart.js Initialization ---
const categorySpendingCtx = document.getElementById('categorySpendingChart').getContext('2d');
const spendingTrendCtx = document.getElementById('spendingTrendChart').getContext('2d');

let categorySpendingChart;
let spendingTrendChart;

function initializeCharts() {
    // Category Spending Chart (Pie/Donut)
    categorySpendingChart = new Chart(categorySpendingCtx, {
        type: 'doughnut',
        data: {
            labels: ['Food', 'Housing', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'],
            datasets: [{
                label: 'Spending by Category',
                data: [350, 1200, 150, 80, 100, 200, 50, 70], // Sample data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', // Food
                    'rgba(54, 162, 235, 0.8)', // Housing
                    'rgba(255, 206, 86, 0.8)', // Transport
                    'rgba(75, 192, 192, 0.8)', // Utilities
                    'rgba(153, 102, 255, 0.8)', // Entertainment
                    'rgba(255, 159, 64, 0.8)', // Shopping
                    'rgba(199, 199, 199, 0.8)', // Health
                    'rgba(83, 102, 255, 0.8)'  // Other
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: false,
                    text: 'Spending by Category'
                }
            }
        }
    });

    // Spending Trend Chart (Line)
    spendingTrendChart = new Chart(spendingTrendCtx, {
        type: 'line',
        data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], // Sample months
            datasets: [{
                label: 'Total Expenses',
                data: [1500, 1800, 1600, 2000, 1750, 1900], // Sample data
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.3
            },
            {
                label: 'Total Income',
                data: [3000, 3200, 3100, 3500, 3000, 3200], // Sample data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Spending Trend Over Time'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// --- Event Listeners and Functions ---

// Show/hide recurring expense frequency
document.getElementById('isRecurringExpense').addEventListener('change', function () {
    document.getElementById('recurringExpenseFrequencyDiv').style.display = this.checked ? 'block' : 'none';
});

// Show/hide recurring income frequency
document.getElementById('isRecurringIncome').addEventListener('change', function () {
    document.getElementById('recurringIncomeFrequencyDiv').style.display = this.checked ? 'block' : 'none';
});

// Placeholder for applying date filter
function applyFilter() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    alert(`Applying filter from ${startDate || 'beginning'} to ${endDate || 'now'}. (Requires API call to fetch filtered data)`);
    // Here you would typically make an API call to load filtered expenses/income
    // e.g., loadExpenses(`?startDate=${startDate}&endDate=${endDate}`);
    // And then update the summary cards and charts.
    updateSummaryCards(); // For demo, update with sample data
    updateChartsWithSampleData(); // For demo, update charts
}

// Dummy data for summary cards
function updateSummaryCards() {
    document.getElementById('total-balance').innerText = `₱${(Math.random() * 5000 + 1000).toFixed(2)}`;
    document.getElementById('total-income').innerText = `₱${(Math.random() * 3000 + 1500).toFixed(2)}`;
    document.getElementById('total-expenses').innerText = `₱${(Math.random() * 1500 + 500).toFixed(2)}`;
    document.getElementById('budget-left').innerText = `₱${(Math.random() * 1000 + 200).toFixed(2)}`;
    document.getElementById('top-category').innerText = ['Food', 'Housing', 'Transport', 'Utilities'][Math.floor(Math.random() * 4)];
    document.getElementById('budget-rollover').innerText = `₱${(Math.random() * 200).toFixed(2)} monthly`;
    const projectedOverspend = (Math.random() * 300 - 150); // Can be positive or negative
    document.getElementById('predictive-alert').innerText = projectedOverspend > 0 ? `-₱${projectedOverspend.toFixed(2)}` : `+₱${Math.abs(projectedOverspend).toFixed(2)}`;
    document.getElementById('predictive-alert').closest('.card').classList.toggle('alert-danger', projectedOverspend > 0);
    document.getElementById('predictive-alert').closest('.card').classList.toggle('bg-success', projectedOverspend <= 0);
    document.getElementById('predictive-alert').closest('.card').classList.toggle('text-white', true); // Ensure text color for success
}

// Function to update chart data (for demonstration purposes)
function updateChartsWithSampleData() {
    categorySpendingChart.data.datasets[0].data = [
        Math.random() * 400, Math.random() * 1500, Math.random() * 200, Math.random() * 100,
        Math.random() * 150, Math.random() * 250, Math.random() * 70, Math.random() * 90
    ];
    categorySpendingChart.update();

    const newExpenseData = Array.from({ length: 6 }, () => Math.random() * 1000 + 1000);
    const newIncomeData = Array.from({ length: 6 }, () => Math.random() * 1500 + 2500);
    spendingTrendChart.data.datasets[0].data = newExpenseData;
    spendingTrendChart.data.datasets[1].data = newIncomeData;
    spendingTrendChart.update();
}

// API interaction placeholders
async function handleAddExpense(event) {
    event.preventDefault();
    const newExpense = {
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        isRecurring: document.getElementById('isRecurringExpense').checked,
        frequency: document.getElementById('isRecurringExpense').checked ? document.getElementById('recurringExpenseFrequency').value : null,
    };
    console.log('Adding Expense:', newExpense);
    alert('Expense added! (Check console and implement actual API POST to ' + API_BASE_URL_EXPENSES + ')');
    // try { /* await fetch(...) */ } catch (error) { ... }
    document.getElementById('addExpenseForm').reset();
    updateSummaryCards(); // Update summaries for demo
    updateChartsWithSampleData(); // Update charts for demo
}

async function handleAddIncome(event) {
    event.preventDefault();
    const newIncome = {
        description: document.getElementById('incomeDescription').value,
        amount: parseFloat(document.getElementById('incomeAmount').value),
        source: document.getElementById('incomeSource').value,
        date: document.getElementById('incomeDate').value,
        isRecurring: document.getElementById('isRecurringIncome').checked,
        frequency: document.getElementById('isRecurringIncome').checked ? document.getElementById('recurringIncomeFrequency').value : null,
    };
    console.log('Adding Income:', newIncome);
    alert('Income added! (Check console and implement actual API POST to ' + API_BASE_URL_INCOME + ')');
    // try { /* await fetch(...) */ } catch (error) { ... }
    document.getElementById('addIncomeForm').reset();
    updateSummaryCards(); // Update summaries for demo
    updateChartsWithSampleData(); // Update charts for demo
}

async function handleAddGoal(event) {
    event.preventDefault();
    const newGoal = {
        name: document.getElementById('goalName').value,
        targetAmount: parseFloat(document.getElementById('goalTargetAmount').value),
        targetDate: document.getElementById('goalTargetDate').value,
        currentAmount: 0 // Starting progress
    };
    console.log('Setting Goal:', newGoal);
    alert('Goal set! (Check console and implement actual API POST to ' + API_BASE_URL_GOALS + ')');
    // try { /* await fetch(...) */ } catch (error) { ... }
    document.getElementById('addGoalForm').reset();
}

// Initial setup on page load
window.onload = function () {
    initializeCharts();
    updateSummaryCards(); // Load initial dummy data

    // Attach form submission handlers
    document.getElementById('addExpenseForm').addEventListener('submit', handleAddExpense);
    document.getElementById('addIncomeForm').addEventListener('submit', handleAddIncome);
    document.getElementById('addGoalForm').addEventListener('submit', handleAddGoal);
}