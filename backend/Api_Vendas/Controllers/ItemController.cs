using Api_Vendas.Models;
using Api_Vendas.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Vendas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemServices _itemServices;

        public ItemController(IItemServices itemServices)
        {
            _itemServices = itemServices;
        }

        [HttpGet("list")]
        public async Task<ActionResult<IAsyncEnumerable<Item>>> GetItems()
        {
            try
            {
                return Ok(await _itemServices.GetItems());
            }
            catch (Exception)
            {
                return BadRequest("Não foi possível listar os itens cadastrados!"); 
            }
        }

        [HttpGet("getbycode")]
        public async Task<ActionResult<Item>> GetItemByCode([FromQuery] string codItem)
        {
            try
            {
                var item = await _itemServices.GetItemByCode(codItem);

                if(item != null)
                {
                    return Ok(item);
                }
                else
                {
                    return NotFound("Não foi possível localizar um item com o id informado!"); 
                }
            }
            catch (Exception)
            {
                return BadRequest("Ocorreu um erro durante a execução do EndPoint, tente novamente!");
            }
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddItem([FromBody] Item item)
        {
            try
            {
                if(await _itemServices.CreateItem(item))
                {
                    return Ok($"Item {item.NameItem} criado com sucesso!");
                }
                else
                {
                    return NotFound("Não foi possível adicionar o novo item, verifique todos os campos e tente novamente");
                }
                
            }
            catch (Exception)
            {
                return BadRequest("Ocorreu um erro durante a execução do EndPoint, tente novamente!");
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteItem([FromQuery] string codItem)
        {
            try
            {
                if(await _itemServices.DeleteItem(codItem))
                {
                    return Ok($"Item com o código: {codItem} removido com sucesso!"); 
                }
                else
                {
                    return NotFound("Não foi possível localizar um item com o código informado, verifique todos os campos e tente novamente");
                }
            }
            catch (Exception)
            {
                return BadRequest("Ocorreu um erro durante a execução do EndPoint, tente novamente!");
            }
        }
    }
}
