using Elastic.Clients.Elasticsearch.QueryDsl;
using Elastic.Clients.Elasticsearch;
using Mo626LogAnalyser.Server.Controllers;
using Microsoft.Extensions.Configuration;
using System.Net;
using Mo626LogAnalyser.Server.Models;

namespace Mo626LogAnalyser.Server.Services
{
    public interface ILogSearcher
    {
        Task<List<string>> GetApplicationsAsync();
        Task<List<string>> GetLevelsAsync();        
        public Task<SearchResponse<Dictionary<string, object>>> SearchLogsAsync(LogSearchRequest payload);
    }
    public class LogSearcher : ILogSearcher
    {
        private readonly ElasticsearchClient _client;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;

        public LogSearcher(IElasticsearchClientSettings elasticSettings, IConfiguration configuration, ILogger<LogsController> logger)
        {
            _configuration = configuration;
            _logger = logger;
            _client = new ElasticsearchClient(elasticSettings); ;
        }

        public async Task<List<string>> GetApplicationsAsync()
        {
            var apps = _configuration.GetSection("ELK:Applications").Get<List<string>>() ?? new List<string>();
            await Task.CompletedTask;
            return apps;
        }

        public async Task<List<string>> GetLevelsAsync()
        {
            var apps = _configuration.GetSection("ELK:Levels").Get<List<string>>() ?? new List<string>();
            await Task.CompletedTask;
            return apps;
        }

        public async Task<SearchResponse<Dictionary<string, object>>> SearchLogsAsync(LogSearchRequest payload)
        {
            var filters = new List<Query>();

            // Date range filter
            filters.Add(new DateRangeQuery("@timestamp")
            {
                Gte = payload.StartDate,
                Lte = payload.EndDate
            });

            // Standard field filters (only add if value is provided)
            if (!string.IsNullOrWhiteSpace(payload.Level))
                filters.Add(new TermQuery("level.raw") { Value = payload.Level });

            if (!string.IsNullOrWhiteSpace(payload.Application))
                filters.Add(new TermQuery("fields.Application.raw") { Value = payload.Application });

            if (!string.IsNullOrWhiteSpace(payload.Environment))
                filters.Add(new TermQuery("fields.EnvironmentName.raw") { Value = payload.Environment });

            if (!string.IsNullOrWhiteSpace(payload.DataStream))
                filters.Add(new TermQuery("fields.DataStream.raw") { Value = payload.DataStream });

            if (!string.IsNullOrWhiteSpace(payload.MessageContains))
                filters.Add(new MatchQuery("message") { Query = payload.MessageContains });

            // Additional fields
            foreach (var kvp in payload.AdditionalFields)
            {
                if (!string.IsNullOrWhiteSpace(kvp.Value))
                {
                    filters.Add(new TermQuery($"fields.{kvp.Key}.raw") { Value = kvp.Value });
                }
            }

            // Build the query
            var searchRequest = new SearchRequest<Dictionary<string, object>>
            {
                From = payload.From,
                Size = payload.Size > 0 ? payload.Size : 10,
                Query = new BoolQuery
                {
                    Filter = filters
                }
            };

            //// Sort (if specified)
            if (!string.IsNullOrWhiteSpace(payload.SortField))
            {
                searchRequest.Sort = new[]
                {
                    SortOptions.Field(Infer.Field<LogEntry>(f=>f.Timestamp), new FieldSort { Order = payload.SortAscending ? SortOrder.Asc : SortOrder.Desc })
                };
            }

            // Execute the search
            var resp = await _client
                .SearchAsync<Dictionary<string, object>>(searchRequest);

            return resp;
        }
    }
}
