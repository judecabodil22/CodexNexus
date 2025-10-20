BudgetMate

Steps to Replicate
PHASE 1

1. When creating a project, select ASP.NET Core Web API
2. Install the required packages:
- Install-Package Microsoft.EntityFrameworkCore
- Install-Package Microsoft.EntityFrameworkCore.Sqlite
- Install-Package Microsoft.EntityFrameworkCore.Tools
3. Create folders for organization (Controllers,Models,Data)
4. Configure Database Connections onn appsettings.json:
- "ConnectionStrings": {
  "DefaultConnection": "Data Source=budgetmate.db"
}
5. Create a model file .cs in Models, AppDbContext.cs in Data and finally, your controller in the Controllers folder.
6. Run to verify
7. Push to GIT

PHASE 2

Once done, run migrations:
Add-Migration InitialCreate
Update-Database

The above lines will execute a script that will create a .db file in the project directory.

PHASE 3

Create a tag:
git tag -a v1.0.0 -m "Initial stable version of BudgetMate"
git push origin v1.0.0

Create a README.md
:README Details


# 💰 BudgetMate – Expense Tracker Web App

## 🧭 Overview
BudgetMate helps users track their daily expenses, set budgets, and visualize spending trends.

## ⚙️ Tech Stack
- ASP.NET Core MVC
- Entity Framework Core
- MS SQL Server
- HTML5, CSS3, JavaScript
- Bootstrap

## 🧩 Features
- Add, edit, and delete expense entries
- Category-based analytics
- Monthly summary dashboard
- Budget alerts and savings goals

## 🚀 Version
**v1.0.0** – Initial release (database + core UI structure)

