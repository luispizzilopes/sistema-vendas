using Api_Vendas.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api_Vendas.Services.Interfaces
{
    public interface IItemServices
    {
        Task<IEnumerable<Item>> GetItems();
        Task<bool> CreateItem(Item item); 
        Task<bool> DeleteItem(string codItem);
        Task<Item> GetItemByCode(string codItem); 
    }
}
