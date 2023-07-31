using Api_Vendas.Context;
using Api_Vendas.DTOs.Mappings;
using Api_Vendas.Services;
using Api_Vendas.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api_Vendas
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IItemServices, ItemServices>();
            builder.Services.AddScoped<ISaleServices, SaleServices>();

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            }); 

            IMapper mapper = mappingConfig.CreateMapper();
            builder.Services.AddSingleton(mapper); 

            string connectionDefault = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionDefault));

            builder.Services.AddCors(); 

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(c =>
            {
                c.AllowAnyMethod();
                c.AllowAnyOrigin();
                c.AllowAnyHeader();
            }); 

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}