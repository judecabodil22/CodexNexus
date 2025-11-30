# BudgetMate

BudgetMate is a smart financial tracking application designed to help you manage your budget, expenses, and savings goals effectively.

## Changelog

### v1.3 (Current)
*   **New Feature: Advanced Budget Planning**
    *   Added ability to track multiple **Income Sources** (e.g., Salary, Freelance, Investments).
    *   Added **Savings** tracking separate from expenses.
    *   Implemented **Budget Allocation Rules** (e.g., 50/30/20, 70/20/10) that automatically calculate needs, wants, and savings goals based on income.
    *   **Available Budget** is now dynamically calculated as `Total Income - Total Expenses - Total Savings`.
*   **New Feature: Enhanced Dashboard**
    *   Added **Budget vs. Actual** chart to visualize spending against the selected budget rule (Needs vs. Wants vs. Savings).
*   **New Feature: Comprehensive Reports**
    *   Updated Financial Reports to include Income and Savings metrics.
    *   Added **Net Cash Flow** and **Savings Rate** calculations.
    *   Enhanced CSV export to include Income and Savings data.
*   **Backend Updates**
    *   Migrated to Google Cloud Firestore for scalable data persistence.
    *   Added `Income` and `Savings` data models and API endpoints.
    *   Improved error handling and data validation.

### v1.2
*   **Recurring Transactions**: Added support for subscriptions and recurring payments.
*   **Calendar View**: Visualized expenses on a monthly calendar.
*   **UI Overhaul**: Implemented a modern, glassmorphism-inspired design with improved responsiveness.
*   **Currency Update**: Switched default currency to Philippine Peso (₱).

### v1.1
*   **User Authentication**: Implemented JWT-based registration and login.
*   **Basic CRUD**: Added core functionality to Create, Read, Update, and Delete expenses.
*   **Charts**: Integrated Chart.js for visual expense breakdown.

### v1.0
*   Initial Release: Basic expense tracking functionality.
