using System.Text.Json.Serialization;

namespace Api_Vendas.Models
{
    public class ItemSale
    {
        [JsonIgnore]
        public string? CodItem { get; set; }

        public Item? Item { get; set; }

        [JsonIgnore]
        public Sale? Sale { get; set; }

        [JsonIgnore]
        public int IdSale { get; set; }

        public int Amount { get; set; }
    }
}
