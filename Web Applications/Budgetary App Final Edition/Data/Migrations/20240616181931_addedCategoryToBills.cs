using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Budgetary_App_Final_Edition.Data.Migrations
{
    /// <inheritdoc />
    public partial class addedCategoryToBills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "category",
                table: "Bills",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "category",
                table: "Bills");
        }
    }
}
