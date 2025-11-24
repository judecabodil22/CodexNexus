// ...existing code...
import React, { useState } from 'react';

export default function CRUD() {
  const [isRecurringExpense, setIsRecurringExpense] = useState(false);
  const [isRecurringIncome, setIsRecurringIncome] = useState(false);

  const applyFilter = () => {
    console.log('applyFilter');
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    console.log('add expense');
  };

  const handleAddIncome = (e) => {
    e.preventDefault();
    console.log('add income');
  };

  const handleSetGoal = (e) => {
    e.preventDefault();
    console.log('set goal');
  };

  const editTransaction = (id, type) => {
    console.log('editTransaction', id, type);
  };

  const deleteTransaction = (id, type) => {
    console.log('deleteTransaction', id, type);
  };

  return (
    <div className="container-fluid">
      {/* Filter Section */}
      <div className="card mb-4 shadow-sm" id="filterSection">
        <div className="card-header">Filter Data</div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input type="date" className="form-control" id="startDate" />
            </div>
            <div className="col-md-4">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input type="date" className="form-control" id="endDate" />
            </div>
            <div className="col-md-4">
              <button type="button" className="btn btn-info w-100" onClick={applyFilter}>Apply Filter</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense */}
      <div className="card mb-4 shadow-sm" id="addExpenseSection">
        <div className="card-header">Add New Expense</div>
        <div className="card-body">
          <form id="addExpenseForm" onSubmit={handleAddExpense}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="description" className="form-label visually-hidden">Description</label>
                <input type="text" className="form-control" id="description" placeholder="Description (e.g., Dinner at Cafe)" required />
              </div>
              <div className="col-md-2">
                <label htmlFor="amount" className="form-label visually-hidden">Amount</label>
                <input type="number" className="form-control" id="amount" placeholder="Amount" step="0.01" required />
              </div>
              <div className="col-md-3">
                <label htmlFor="category" className="form-label visually-hidden">Category</label>
                <select className="form-select" id="category" defaultValue="">
                  <option value="" disabled>Category...</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Housing">Housing</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="date" className="form-label visually-hidden">Date</label>
                <input type="date" className="form-control" id="date" required />
              </div>
              <div className="col-md-1 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100">Add</button>
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isRecurringExpense"
                    checked={isRecurringExpense}
                    onChange={(e) => setIsRecurringExpense(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="isRecurringExpense">
                    Recurring Expense?
                  </label>
                </div>
              </div>

              <div
                className="col-md-3"
                id="recurringExpenseFrequencyDiv"
                style={{ display: isRecurringExpense ? 'block' : 'none' }}
              >
                <select className="form-select" id="recurringExpenseFrequency" defaultValue="monthly">
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Add Income */}
      <div className="card mb-4 shadow-sm" id="incomeSection">
        <div className="card-header">Record New Income</div>
        <div className="card-body">
          <form id="addIncomeForm" onSubmit={handleAddIncome}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="incomeDescription" className="form-label visually-hidden">Description</label>
                <input type="text" className="form-control" id="incomeDescription" placeholder="Description (e.g., Salary, Freelance)" required />
              </div>
              <div className="col-md-2">
                <label htmlFor="incomeAmount" className="form-label visually-hidden">Amount</label>
                <input type="number" className="form-control" id="incomeAmount" placeholder="Amount" step="0.01" required />
              </div>
              <div className="col-md-3">
                <label htmlFor="incomeSource" className="form-label visually-hidden">Source</label>
                <select className="form-select" id="incomeSource" defaultValue="">
                  <option value="" disabled>Source...</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investment">Investment</option>
                  <option value="Gift">Gift</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="incomeDate" className="form-label visually-hidden">Date</label>
                <input type="date" className="form-control" id="incomeDate" required />
              </div>
              <div className="col-md-1 d-flex align-items-end">
                <button type="submit" className="btn btn-success w-100">Add</button>
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isRecurringIncome"
                    checked={isRecurringIncome}
                    onChange={(e) => setIsRecurringIncome(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="isRecurringIncome">
                    Recurring Income?
                  </label>
                </div>
              </div>

              <div
                className="col-md-3"
                id="recurringIncomeFrequencyDiv"
                style={{ display: isRecurringIncome ? 'block' : 'none' }}
              >
                <select className="form-select" id="recurringIncomeFrequency" defaultValue="monthly">
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Goals */}
      <div className="card mb-4 shadow-sm" id="goalsSection">
        <div className="card-header">Savings Goals</div>
        <div className="card-body">
          <form id="addGoalForm" className="mb-4" onSubmit={handleSetGoal}>
            <div className="row g-3">
              <div className="col-md-4">
                <input type="text" className="form-control" id="goalName" placeholder="Goal Name (e.g., New Car)" required />
              </div>
              <div className="col-md-3">
                <input type="number" className="form-control" id="goalTargetAmount" placeholder="Target Amount" step="0.01" required />
              </div>
              <div className="col-md-3">
                <input type="date" className="form-control" id="goalTargetDate" required />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-secondary w-100">Set Goal</button>
              </div>
            </div>
          </form>

          <h5>Active Goals:</h5>
          <div id="activeGoalsList">
            <div className="card mb-2">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <strong>New Laptop</strong> - Target: $1500.00 by 2025-01-01
                  <br />
                  Current Progress: <span className="text-success">$500.00</span> / <span className="text-muted">33%</span>
                </div>
                <button className="btn btn-sm btn-outline-danger">Remove</button>
              </div>
              <div className="progress" style={{ height: 5 + 'px' }}>
                <div className="progress-bar" role="progressbar" style={{ width: '33%' }} aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports / Transaction History */}
      <div className="card shadow-sm" id="reportsSection">
        <div className="card-header">Transaction History</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Category/Source</th>
                  <th>Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody id="transactionTableBody">
                <tr>
                  <td><span className="badge bg-danger">Expense</span></td>
                  <td>Coffee at Starbucks</td>
                  <td className="text-danger">-$5.50</td>
                  <td>Food</td>
                  <td>2024-10-20</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-warning btn-action" onClick={() => editTransaction(1, 'expense')}>Edit</button>
                    <button className="btn btn-sm btn-danger btn-action" onClick={() => deleteTransaction(1, 'expense')}>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td><span className="badge bg-primary">Income</span></td>
                  <td>Freelance Work</td>
                  <td className="text-success">+$300.00</td>
                  <td>Freelance</td>
                  <td>2024-10-18</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-warning btn-action" onClick={() => editTransaction(5, 'income')}>Edit</button>
                    <button className="btn btn-sm btn-danger btn-action" onClick={() => deleteTransaction(5, 'income')}>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td><span className="badge bg-danger">Expense</span></td>
                  <td>Monthly Rent Payment</td>
                  <td className="text-danger">-$1200.00</td>
                  <td>Housing</td>
                  <td>2024-10-01</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-warning btn-action" onClick={() => editTransaction(2, 'expense')}>Edit</button>
                    <button className="btn btn-sm btn-danger btn-action" onClick={() => deleteTransaction(2, 'expense')}>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td><span className="badge bg-danger">Expense</span></td>
                  <td>Groceries</td>
                  <td className="text-danger">-$85.20</td>
                  <td>Food</td>
                  <td>2024-10-15</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-warning btn-action" onClick={() => editTransaction(3, 'expense')}>Edit</button>
                    <button className="btn btn-sm btn-danger btn-action" onClick={() => deleteTransaction(3, 'expense')}>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td><span className="badge bg-primary">Income</span></td>
                  <td>Salary</td>
                  <td className="text-success">+$2500.00</td>
                  <td>Salary</td>
                  <td>2024-10-25</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-warning btn-action" onClick={() => editTransaction(6, 'income')}>Edit</button>
                    <button className="btn btn-sm btn-danger btn-action" onClick={() => deleteTransaction(6, 'income')}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
// ...existing code...