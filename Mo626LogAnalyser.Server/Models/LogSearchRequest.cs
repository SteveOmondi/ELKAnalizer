using System.Text.Json.Serialization;

namespace Mo626LogAnalyser.Server.Models
{
    public class LogSearchRequest
    {
        // Date range parameters
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Common search fields
        public string? Level { get; set; }
        public string? Msisdn { get; set; }
        public string? SessionId { get; set; }
        public string? Application { get; set; }
        public string? Environment { get; set; }
        public string? DataStream { get; set; }
        public string? RequestPath { get; set; }
        public string? ActionName { get; set; }
        public string? MessageContains { get; set; }

        // Pagination parameters
        public int From { get; set; } = 0;
        public int Size { get; set; } = 50;

        // Sort parameters
        public string? SortField { get; set; } = "@timestamp";
        public bool SortAscending { get; set; } = false;

        // Additional fields for dynamic querying
        public Dictionary<string, string> AdditionalFields { get; set; } = new Dictionary<string, string>();

    }

    public class PaginatedResponse<T>
    {
        public IEnumerable<T> Items { get; set; }
        public long TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    }

    public class LogEntry
    {
        [JsonPropertyName("@timestamp")]
        public List<string> Timestamp { get; set; }

        [JsonPropertyName("fields.ActionId")]
        public List<string> ActionId { get; set; }

        [JsonPropertyName("fields.ActionName")]
        public List<string> ActionName { get; set; }

        [JsonPropertyName("fields.Application")]
        public List<string> Application { get; set; }

        [JsonPropertyName("fields.ConnectionId")]
        public List<string> ConnectionId { get; set; }

        [JsonPropertyName("fields.DataStream")]
        public List<string> DataStream { get; set; }

        [JsonPropertyName("fields.EnvironmentName")]
        public List<string> EnvironmentName { get; set; }

        [JsonPropertyName("fields.MachineName")]
        public List<string> MachineName { get; set; }

        [JsonPropertyName("fields.msisdn")]
        public List<string> Msisdn { get; set; }

        [JsonPropertyName("fields.RequestId")]
        public List<string> RequestId { get; set; }

        [JsonPropertyName("fields.RequestPath")]
        public List<string> RequestPath { get; set; }

        [JsonPropertyName("fields.sessionid")]
        public List<string> SessionId { get; set; }

        [JsonPropertyName("fields.Version")]
        public List<string> Version { get; set; }

        [JsonPropertyName("level")]
        public List<string> Level { get; set; }

        [JsonPropertyName("message")]
        public List<string> Message { get; set; }

        [JsonPropertyName("messageTemplate")]
        public List<string> MessageTemplate { get; set; }

        [JsonPropertyName("_id")]
        public string Id { get; set; }

        [JsonPropertyName("_index")]
        public string Index { get; set; }

        [JsonPropertyName("_score")]
        public double? Score { get; set; }
    }
}
