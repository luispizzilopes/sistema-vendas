using Api_Vendas.Models;
using AutoMapper;

namespace Api_Vendas.DTOs.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Sale, CreateSaleDTO>().ReverseMap();
        }
    }
}
