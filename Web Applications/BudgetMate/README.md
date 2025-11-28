# BudgetMate 💰

A modern, full-stack personal finance application designed to help you track expenses, visualize spending habits, and stay on top of your budget. Built with a robust .NET backend and a responsive React frontend.

## 🚀 Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS (Glassmorphism design)
- **Icons:** Lucide React
- **Charts:** Chart.js & React-Chartjs-2
- **State Management:** React Hooks

### Backend
- **Framework:** ASP.NET Core 8/9 Web API
- **Database:** SQLite (Entity Framework Core)
- **Authentication:** JWT (JSON Web Tokens)
- **Documentation:** Swagger UI

## ✨ Features

- **Dashboard Overview:** Visualize your spending with dynamic charts (Doughnut & Line graphs).
- **Expense Tracking:** Add, edit, and delete transactions with ease.
- **Budget Goals:** Set and adjust your monthly budget with an interactive slider.
- **Smart Categorization:** Automatically categorize expenses (Food, Transport, Utilities, etc.).
- **Secure Authentication:** User registration and login protected by JWT.
- **Responsive Design:** Fully optimized for desktop and mobile devices.

## 🛠️ Getting Started

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) or later
- [Node.js](https://nodejs.org/) (v18+ recommended)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/judecabodil22/Codexnexus.git
    cd "Web Applications/BudgetMate"
    ```

2.  **Setup the Backend**
    ```bash
    cd Backend
    dotnet restore
    dotnet run
    ```
    The API will start at `http://localhost:5056` (or similar, check console output).

3.  **Setup the Frontend**
    Open a new terminal:
    ```bash
    cd Frontend/budgetmate-frontend
    npm install
    npm run dev
    ```
    The app will run at `http://localhost:5173`.

## 📸 Screenshots

*(Add screenshots of your dashboard and login screen here)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
