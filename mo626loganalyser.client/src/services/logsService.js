// services/logsService.js
import api from './api';

export const logsService = {
  /**
   * Fetch logs with optional filters
   * @param {Object} params - Query parameters
   * @param {string} params.startDate - Filter by start date
   * @param {string} params.endDate - Filter by end date
   * @param {string} params.level - Filter by log level
   * @param {string} params.msisdn - Filter by MSISDN
   * @param {string} params.sessionId - Filter by session ID
   * @param {string} params.application - Filter by application
   * @param {string} params.environment - Filter by environment
   * @param {string} params.dataStream - Filter by data stream
   * @param {string} params.requestPath - Filter by request path
   * @param {string} params.actionName - Filter by action name
   * @param {string} params.messageContains - Filter by message content
   * @param {number} params.from - Pagination start index
   * @param {number} params.size - Number of items per page
   * @param {string} params.sortField - Field to sort by
   * @param {boolean} params.sortAscending - Sort order
   * @returns {Promise<Object>} Promise with logs data
   */
  fetchLogs: async (params = {}) => {
    try {
      const response = await api.post('/search', {
          startDate: params.startDate,
          endDate: params.endDate,
          Level: params.level,
          Msisdn: params.msisdn,
          sessionId: params.sessionId,
          Application: params.application,
          Environment: params.environment,
          DataStream: params.dataStream,
          RequestPath: params.requestPath,
          ActionName: params.actionName,
          MessageContains: params.messageContains,
          from: params.from || 0,
          size: params.size || 50,
          SortField: params.sortField || "@timestamp",
          SortAscending: params.sortAscending || false
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchapps: async (params = {}) => {
    try {
      const response = await api.get('/applications', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchlevelss: async (params = {}) => {
    try {
      const response = await api.get('/levels', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchenvs: async (params = {}) => {
    try {
      const response = await api.get('/environments', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  /**
   * Export logs as a downloadable file
   * @param {Object} filters - Filters to apply before export
   * @param {string} format - Export format (csv, json)
   * @returns {Promise<Blob>} Promise with file blob
   */
  exportLogs: async (filters = {}, format = 'json') => {
    try {
      const response = await api.get('/export', { 
        params: { ...filters, format },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};