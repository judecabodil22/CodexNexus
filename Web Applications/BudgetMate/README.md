BudgetMate

Steps to Replicate

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

Once done, run migrations:
Add-Migration InitialCreate
Update-Database

The above lines will execute a script that will create a .db file in the project directory.
