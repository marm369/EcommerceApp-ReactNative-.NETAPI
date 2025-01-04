using Application.Services.ServicesImpl;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using ProductApi.Domain.Interfaces;
using ProductApi.Infrastructure;
using Serilog;
using ProductApi.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Lire la configuration
var configuration = builder.Configuration;

// Configurer Serilog
var logFileName = configuration["MySerilog:FileName"];
Log.Logger = new LoggerConfiguration()
    .WriteTo.File($"{logFileName}-.log", rollingInterval: RollingInterval.Day)
    .WriteTo.Console() // Optionnel : Pour afficher les logs dans la console
    .WriteTo.Debug()   // Optionnel : Pour afficher les logs dans la fenêtre de débogage
    .CreateLogger();

// Ajouter Serilog comme fournisseur de journalisation pour l'application
builder.Host.UseSerilog();


builder.Services.AddDbContext<MarketDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("eCommerceConnection"))
           .EnableSensitiveDataLogging() // Pour voir les valeurs dans les logs
           .LogTo(Console.WriteLine));   // Affiche les requêtes SQL dans la console

// Enregistrer vos services et dépendances
builder.Services.AddScoped<IMarketService, MarketService>();
builder.Services.AddScoped<IMarketRepository, MarketRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();



// Ajouter des services au conteneur
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Activer Swagger pour la documentation API
app.UseSwagger();
app.UseSwaggerUI();

// Configurer le middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Lancer l'application
app.Run();
