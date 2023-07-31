using Api_Vendas.Context;
using Api_Vendas.Models;
using Api_Vendas.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api_Vendas.Services
{
    public class ItemServices : IItemServices
    {
        private readonly AppDbContext _context;

        public ItemServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateItem(Item item)
        {
            if (item != null)
            {
                await _context.Items.AddAsync(item);
                await _context.SaveChangesAsync();
                return true; 
            }

            return false; 
        }

        public async Task<bool> DeleteItem(string codItem)
        {
            var item = await _context.Items.FirstOrDefaultAsync(i => i.CodItem == codItem);

            if(item != null)
            {
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
                return true; 
            }

            return false;
        }

        public async Task<Item> GetItemByCode(string codItem)
        {
            var item = await _context.Items.FirstOrDefaultAsync(i => i.CodItem == codItem);

            if (item != null)
            {
                return item; 
            }

            return null;
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _context.Items.ToListAsync(); 
        }
    }
}
