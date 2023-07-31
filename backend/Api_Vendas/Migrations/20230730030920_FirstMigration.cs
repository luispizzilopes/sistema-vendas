using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api_Vendas.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    CodItem = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NameItem = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.CodItem);
                });

            migrationBuilder.CreateTable(
                name: "Sales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sales", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemSale",
                columns: table => new
                {
                    CodItem = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdSale = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemSale", x => new { x.CodItem, x.IdSale });
                    table.ForeignKey(
                        name: "FK_ItemSale_Items_CodItem",
                        column: x => x.CodItem,
                        principalTable: "Items",
                        principalColumn: "CodItem",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemSale_Sales_IdSale",
                        column: x => x.IdSale,
                        principalTable: "Sales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemSale_IdSale",
                table: "ItemSale",
                column: "IdSale");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemSale");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Sales");
        }
    }
}
