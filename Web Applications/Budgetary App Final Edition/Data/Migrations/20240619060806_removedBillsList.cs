using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Budgetary_App_Final_Edition.Data.Migrations
{
    /// <inheritdoc />
    public partial class removedBillsList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Bills_Billsid",
                table: "Bills");

            migrationBuilder.DropIndex(
                name: "IX_Bills_Billsid",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "Billsid",
                table: "Bills");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Billsid",
                table: "Bills",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bills_Billsid",
                table: "Bills",
                column: "Billsid");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Bills_Billsid",
                table: "Bills",
                column: "Billsid",
                principalTable: "Bills",
                principalColumn: "id");
        }
    }
}
