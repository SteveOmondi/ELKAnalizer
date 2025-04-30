using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.QueryDsl;
using Microsoft.AspNetCore.Mvc;
using Mo626LogAnalyser.Server.Models;
using Mo626LogAnalyser.Server.Services;
using Newtonsoft.Json;
using System;

namespace Mo626LogAnalyser.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly ILogSearcher _logSearcher;
        private readonly ILogger _logger;

        public LogsController(ILogSearcher logSearcher, ILogger<LogsController> logger)
        {
            _logger = logger;
            _logSearcher = logSearcher;
        }

        [HttpPost("search")]
        public async Task<ActionResult<PaginatedResponse<Dictionary<string, object>>>> Search([FromBody] LogSearchRequest request)
        {

                var resp = await _logSearcher.SearchLogsAsync(request);

                return Ok(new PaginatedResponse<Dictionary<string, object>>
                {
                    Items = resp.Documents,
                    TotalCount = resp.Total,
                    Page = (request.From / request.Size) + 1,
                    PageSize = request.Size
                });
        }

        [HttpGet("Applications")]
        public async Task<ActionResult> GetApplications()
        {
            var response = await _logSearcher.GetApplicationsAsync();

            return Ok(response);
        }


        [HttpGet("Levels")]
        public async Task<ActionResult> GetLevels()
        {
            var response = await _logSearcher.GetLevelsAsync();

            return Ok(response);
        }

        [HttpGet("Environments")]
        public ActionResult GetEnvironments()
        {
            return Ok(new[] { "UAT", "Production", "Development" });
        }

    }
}