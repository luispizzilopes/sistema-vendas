using Api_Vendas.Models;
using Microsoft.EntityFrameworkCore;

namespace Api_Vendas.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Sale>? Sales { get; set; }
        public DbSet<Item>? Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ItemSale>()
            .HasKey(iv => new { iv.CodItem, iv.IdSale });

            modelBuilder.Entity<ItemSale>()
                .HasOne(iv => iv.Item)
                .WithMany(i => i.Sales)
                .HasForeignKey(iv => iv.CodItem);

            modelBuilder.Entity<ItemSale>()
                .HasOne(iv => iv.Sale)
                .WithMany(v => v.Items)
                .HasForeignKey(iv => iv.IdSale);
        }
    }
}
