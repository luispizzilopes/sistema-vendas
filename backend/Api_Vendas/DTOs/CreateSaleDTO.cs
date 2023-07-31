using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Api_Vendas.Models;
using System.Text.Json.Serialization;

namespace Api_Vendas.DTOs
{
    public class CreateSaleDTO
    {
        public int Id { get; set; }
        public decimal Price { get; set; }

        [JsonIgnore]
        public ICollection<Item>? Items { get; set; } 
    }
}
