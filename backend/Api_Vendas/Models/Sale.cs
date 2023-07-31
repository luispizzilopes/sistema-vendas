using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Vendas.Models
{
    public class Sale
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        public ICollection<ItemSale>? Items { get; set; }
    }
}
