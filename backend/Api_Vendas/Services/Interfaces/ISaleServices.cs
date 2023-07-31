using Api_Vendas.DTOs;
using Api_Vendas.Models;

namespace Api_Vendas.Services.Interfaces
{
    public interface ISaleServices
    {
        Task<IEnumerable<Sale>> GetSales();
        Task<Sale> GetSaleById(int id);
        Task<Sale> GetLastSale();
        Task RemoveSaleEmpity(); 
        Task<bool> CreateSale(CreateSaleDTO sale);
        Task<bool> AddOneUnit(AddOneUnitDTO addOneUnit);
        Task<bool> RemoveOneUnit(RemoveOneUnitDTO removeOneUnit); 
        Task<bool> CancelSale(int id);
        Task<bool> AddItem(AddItemSaleDTO item);
        Task<bool> RemoveItem(RemoveItemSaleDTO item); 
    }
}
