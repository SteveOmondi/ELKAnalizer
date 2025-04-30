using Elastic.Clients.Elasticsearch;
using Elastic.Transport;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Mo626LogAnalyser.Server.Services;
using Serilog.Core;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var logger = builder.Services.BuildServiceProvider()
   .GetRequiredService<ILogger<Program>>();
var elasticConfig = builder.Configuration.GetSection("ELK");
var urls = elasticConfig.GetSection("Urls").Get<string[]>() ?? new[] { "http://localhost:9200" };
var defaultIndex = elasticConfig["Index"];
var pool = new StaticNodePool(urls.Select(c => new Uri(c)));

var settings = new ElasticsearchClientSettings(new Uri(elasticConfig["ServerUrl"]))
   .Authentication(new BasicAuthentication(elasticConfig["username"]!, elasticConfig["password"]!))
   .DefaultIndex(defaultIndex!)
   .EnableDebugMode();

builder.Services.AddSingleton<IElasticsearchClientSettings>(settings);

builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ILogSearcher, LogSearcher>();

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapControllers();


app.Run();
