using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api_Vendas.Models
{
    public class Item
    {
        [Key]
        public string? CodItem { get; set; }

        [Required]
        [MaxLength(50)]
        public string? NameItem { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [JsonIgnore]
        public ICollection<ItemSale>? Sales { get; set; }
    }
}
