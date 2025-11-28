# 💰 BudgetMate

BudgetMate is a modern, premium personal finance application designed to make tracking expenses, managing budgets, and reaching financial goals effortless and beautiful. Built with a robust .NET backend and a dynamic React frontend, it offers a seamless experience for users who want to take control of their finances.

## ✨ Key Features

*   **📊 Interactive Dashboard**: Get a bird's-eye view of your finances with expense cards, budget progress bars, and insightful charts.
*   **📝 Smart Transaction Management**: Easily add, edit, and delete transactions. Use the "Pending" queue to batch multiple expenses and save them in one go.
*   **📅 Visual Calendar**: See your spending habits on a monthly calendar. Click on any date to view a detailed breakdown of that day's expenses.
*   **🔄 Subscriptions Manager**: Never miss a bill again. Track recurring expenses like Netflix, Rent, and Utilities. See what's paid, due today, or overdue at a glance.
*   **🎯 Savings Goals**: Create visual "piggy banks" for your dreams (e.g., "New Laptop", "Vacation"). Watch your progress grow with animated circular indicators.
*   **📈 Detailed Reports**: Analyze your spending by category with beautiful bar charts and data visualizations.
*   **🎨 Premium Design**: Enjoy a sleek, glassmorphism-inspired UI with smooth animations, vibrant gradients, and a fully responsive layout.

## 🛠️ Tech Stack

### Frontend
*   **React**: For building a dynamic and responsive user interface.
*   **Tailwind CSS**: For rapid, utility-first styling and custom design systems.
*   **Chart.js**: For rendering beautiful and informative financial charts.
*   **Lucide React**: For a consistent and modern icon set.
*   **Vite**: For lightning-fast development and optimized builds.

### Backend
*   **ASP.NET Core Web API**: A high-performance, cross-platform framework for building the RESTful API.
*   **Entity Framework Core**: For efficient database access and management.
*   **SQL Server**: Robust relational database for storing user data securely.
*   **JWT Authentication**: Secure user login and session management.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   .NET 8.0 SDK
*   SQL Server (LocalDB or Express)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/judecabodil22/Codexnexus.git
    cd Codexnexus/Web\ Applications/BudgetMate
    ```

2.  **Setup Backend**
    ```bash
    cd Backend
    dotnet restore
    dotnet ef database update
    dotnet run
    ```
    The API will start at `http://localhost:5204`.

3.  **Setup Frontend**
    ```bash
    cd ../Frontend/budgetmate-frontend
    npm install
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## 📸 Screenshots

*(Add screenshots of the Dashboard, Calendar, and Savings Goals here)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
