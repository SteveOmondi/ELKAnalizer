// hooks/useLogsData.js
import { useState, useEffect, useCallback } from 'react';
import { logsService } from '../services/logsService';

export default function useLogsData() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLog, onLogsFetched] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [levelOptions, setLevelOptions] = useState([]);
  const [appOptions, setAppOptions] = useState([]);
  const [envOptions, setEnvOptions] = useState([]);

  useEffect(() => {
        // Fetch levels
        logsService.fetchlevelss()
          .then(data => setLevelOptions(data))
          .catch(error => console.error("Error fetching levels:", error));
  
        // Fetch applications
        logsService.fetchapps()
          .then(data => setAppOptions(data))
          .catch(error => console.error("Error fetching applications:", error));
  
        // Fetch environments
        logsService.fetchenvs()
          .then(data => setEnvOptions(data))
          .catch(error => console.error("Error fetching environments:", error));
      }, []);

  
  const applyLogs = (result) => 
    {
      let data = result.data || result.items || [];
      setLogs(data);
      setPage(result.page || 1);
      setPageSize(result.pageSize || 10);
      setTotalCount(result.totalCount || result.items?.length || 0);

      onLogsFetched(data[0]||null);
      setLoading(false);
      setError(null);
    };

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      
      // Prepare query parameters
      const params = {
        page,
        pageSize,
        search: searchTerm
      };
      
      // Add level filter if not "all"
      if (filterType !== "all") {
        params.level = filterType;
      }
      
      const result = await logsService.fetchLogs(params);
      
      setLogs(result.data || []);
      setTotalCount(result.totalCount || result.data?.length || 0);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch logs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [filterType, searchTerm, page, pageSize]);

  const toggleExpand = useCallback((index) => {
    var newExpand = logs[index]
    onLogsFetched(expandedLog === newExpand ? null : newExpand);
  }, [expandedLog]);

  const handleExport = useCallback(async (format = 'json') => {
    try {
      setLoading(true);
      
      // Prepare filters for export
      const filters = {
        search: searchTerm
      };
      
      if (filterType !== "all") {
        filters.level = filterType;
      }
      
      const blob = await logsService.exportLogs(filters, format);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `logs-export-${new Date().toISOString()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message || "Failed to export logs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [filterType, searchTerm]);

  const onRefresh = () => {
          console.log("Search term:", searchTerm);
          console.log("Level option:", levelOption);
          console.log("Selected app option:", selectedAppOption);
          console.log("Environment option:", envOption);
          console.log("Date Range:", dateRange);
  
          logsService.fetchLogs({
            startDate: formatTimestamp(dateRange.startDate,dateRange.startTime),
            endDate: formatTimestamp(dateRange.endDate,dateRange.endTime),
            level: levelOption,
            application: selectedAppOption,
            environment: envOption,
            messageContains: searchTerm
          }).then((data) => {
            console.log("Fetched logs:", data);
            onLogsFetched(data); // Pass data to parent
          }).catch((error) => {
            console.error("Error fetching logs:", error);
            // Update context or state with fetched logs
          });
        };
  
      const formatTimestamp = (date,time) => {
        const dateTimeString = `${date}T${time}`;
        const timestamp = new Date(dateTimeString);
        return timestamp.toISOString();
      };


      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          onRefresh();
        }
      };

  return {
    logs,
    loading,
    error,
    expandedLog,
    searchTerm,
    filterType,
    page,
    pageSize,
    totalCount,
    setSearchTerm,
    setFilterType,
    setPage,
    setPageSize,
    toggleExpand,
    refreshLogs: fetchLogs,
    exportLogs: handleExport,
    levelOptions, setLevelOptions,
    appOptions, setAppOptions,
    envOptions, setEnvOptions,applyLogs
  };
}