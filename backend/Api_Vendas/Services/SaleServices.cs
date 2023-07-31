using Api_Vendas.Context;
using Api_Vendas.DTOs;
using Api_Vendas.Models;
using Api_Vendas.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Api_Vendas.Services
{
    public class SaleServices : ISaleServices
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper; 

        public SaleServices(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> AddItem(AddItemSaleDTO addItemSale)
        {
            var sale = await _context.Sales
                .Where(sale => sale.Id == addItemSale.IdSale)
                .Include(x => x.Items)
                .FirstOrDefaultAsync();

            var item = await _context.Items.FindAsync(addItemSale.CodItem);

            if (sale != null && item != null && !sale.Items.Any(si => si.CodItem == addItemSale.CodItem))
            {
                var newItemVenda = new ItemSale
                {
                    Item = item,
                    Amount = addItemSale.Amount
                };

                sale.Items.Add(newItemVenda);
                sale.Price += item.Price * addItemSale.Amount;
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> CancelSale(int id)
        {
            var sale = await _context.Sales.FirstOrDefaultAsync(s => s.Id == id); 
            
            if (sale != null) 
            {
                _context.Sales.Remove(sale);
                await _context.SaveChangesAsync();
                return true;
            }

            return false; 
        }

        public async Task<Sale> GetSaleById(int id)
        {
            var sale = await _context.Sales
                .Include(s => s.Items)
                .ThenInclude(si => si.Item)
                .FirstOrDefaultAsync(s => s.Id == id); 

            if(sale != null)
            {
                return sale; 
            }

            return null; 
        }

        public async Task<Sale> GetLastSale()
        {
            var lastSale = await _context.Sales.OrderByDescending(s => s.Id)
                .Include(s => s.Items)
                .ThenInclude(si => si.Item)
                .FirstOrDefaultAsync(); 

            if(lastSale != null)
            {
                return lastSale;
            }

            return null; 
        }

        public async Task<bool> CreateSale(CreateSaleDTO createSaleDTO)
        {
            if(createSaleDTO != null)
            {
                var sale = _mapper.Map<Sale>(createSaleDTO); 
                await _context.Sales.AddAsync(sale); 
                await _context.SaveChangesAsync();
                return true;
            }

            return false; 
        }

        public async Task<IEnumerable<Sale>> GetSales()
        {
            var sales = await _context.Sales
                .Include(s => s.Items)
                .ThenInclude(si => si.Item)
                .ToListAsync();

            sales.Reverse(); 
            return sales;
        }

        public async Task<bool> RemoveItem(RemoveItemSaleDTO removeItemSale)
        {
            var sale = await _context.Sales
                .Where(sale => sale.Id == removeItemSale.IdSale)
                .Include(s => s.Items)
                .FirstOrDefaultAsync();

            var item = await _context.Items.FindAsync(removeItemSale.CodItem);

            if (sale != null && item != null)
            {
                var itemSale = sale.Items.FirstOrDefault(si => si.CodItem == removeItemSale.CodItem);
                if (itemSale != null)
                {
                    sale.Items.Remove(itemSale);
                    sale.Price -= item.Price * itemSale.Amount;
                    await _context.SaveChangesAsync();
                    return true;
                }
            }

            return false;
        }

        public async Task RemoveSaleEmpity()
        {
            var sales = await _context.Sales.Where(sale => sale.Items.Count == 0).ToListAsync();
            foreach(var sale in sales)
            {
                _context.Sales.Remove(sale); 
            }

            await _context.SaveChangesAsync();
        }

        public async Task<bool> AddOneUnit(AddOneUnitDTO addOneUnit)
        {
            var sale = await _context.Sales
                .Where(sale => sale.Id == addOneUnit.SaleId)
                .Include(s => s.Items)
                .FirstOrDefaultAsync();

            var item = await _context.Items.FindAsync(addOneUnit.CodItem);
            var itemSale = sale.Items.FirstOrDefault(si => si.CodItem == addOneUnit.CodItem);

            if (sale != null && itemSale != null && item != null)
            {
                itemSale.Amount++;
                sale.Price += item.Price; 
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> RemoveOneUnit(RemoveOneUnitDTO removeOneUnit)
        {
            var sale = await _context.Sales
                .Where(sale => sale.Id == removeOneUnit.SaleId)
                .Include(s => s.Items)
                .FirstOrDefaultAsync();

            var item = await _context.Items.FindAsync(removeOneUnit.CodItem);
            var itemSale = sale.Items.FirstOrDefault(si => si.CodItem == removeOneUnit.CodItem); 

            if(sale != null && itemSale != null && item != null && itemSale.Amount >= 2)
            {
                itemSale.Amount--;
                sale.Price -= item.Price; 
                await _context.SaveChangesAsync();
                return true;
            }

            return false; 
        }

    }
}
