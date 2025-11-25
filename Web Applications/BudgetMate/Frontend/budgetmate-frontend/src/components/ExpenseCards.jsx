import React from 'react';

export default function ExpenseCards() {
  return (
    <div>
      <div class="row mb-4 text-center">
            <div class="col-md-3">
                <div class="card summary-card">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Total Balance</h5>
                        <p class="h3 text-success" id="total-balance">$0.00</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card summary-card">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Monthly Income</h5>
                        <p class="h3 text-primary" id="total-income">$0.00</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card summary-card">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Monthly Expenses</h5>
                        <p class="h3 text-danger" id="total-expenses">$0.00</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card summary-card">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Budget Left</h5>
                        <p class="h3 text-info" id="budget-left">$0.00</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card summary-card text-center">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Top Spending Category</h5>
                        <p class="text-primary" id="top-category">Loading...</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card summary-card text-center alert-warning-custom">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Budget Rollover</h5>
                        <p class="text-secondary" id="budget-rollover">$0.00</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card summary-card text-center alert-danger">
                    <div class="card-body">
                        <h5 class="card-title text-muted">Projected Overspend</h5>
                        <p class="text-white" id="predictive-alert">$0.00</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  );
}