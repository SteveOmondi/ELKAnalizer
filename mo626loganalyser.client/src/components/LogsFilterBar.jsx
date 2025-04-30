// components/LogsFilterBar.jsx
import React, { useEffect, useState } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";
import { logsService } from "../services/logsService";

export default function LogsFilterBar({
  onLogsFetched, // Callback to pass fetched logs to parent component
  levelOptions, setLevelOptions,
  appOptions, setAppOptions,
  envOptions, setEnvOptions
}){
    //const [levelOptions, setLevelOptions] = useState([]);
    //const [appOptions, setAppOptions] = useState([]);
    //const [envOptions, setEnvOptions] = useState([]);
    const [dateRange, setDateRange] = useState({
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
    });
    
    const [selectedAppOption, setSelectedAppOption] = useState("");
    const [levelOption, setLevelOption] = useState("");
    const [envOption, setEnvOption] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isCardContentVisible, setIsCardContentVisible] = useState(true); // State for toggling visibility

    

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        OnRefresh();
      }
    };

    const OnRefresh = () => {

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
    
    // Handle search input change
    const handleSearchChange = (e) => {
      setSearchTerm(e);
    };
    
    // Handle export button click
    const handleExport = (format) => {
      console.log(`Exporting logs in ${format} format`);
      // Implementation would go here
    };

    const toggleCardContent = () => {
      setIsCardContentVisible(!isCardContentVisible);
    };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filter Logs
        </h2>
        <div>
          <button className="button button-outlined" style={{ marginRight: '8px' }} onClick={() => handleExport('csv')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
          <button className="button button-outlined" onClick={toggleCardContent}>
            {isCardContentVisible ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline> {/* Collapse Icon */}
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline> {/* Expand Icon */}
              </svg>
            )}
          </button>
        </div>
      </div>
    {isCardContentVisible && (
      <div className="card-content">
      <div className="form-control input-with-icon">
        <label className="form-label" htmlFor="search-logs">Search Logs</label>
        <div style={{ position: 'relative' }}>
          <svg className="input-adornment input-adornment-start" style={{ top: '50%', transform: 'translateY(-50%)' }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="search-logs"
            name="search-logs"
            type="text"
            className="input-base"
            placeholder="Search by keyword, ID, or message content..."
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="filter-grid">
        <div className="form-control">
          <label className="form-label" htmlFor="start-date">Start Date & Time</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              id="start-date"
              name="start-date"
              className="input-base" 
              type="date" 
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
            />
            <input 
              id="start-time"
              name="start-time"
              className="input-base" 
              type="time" 
              value={dateRange.startTime}
              onChange={(e) => setDateRange({...dateRange, startTime: e.target.value})}
            />
          </div>
        </div>
        
        <div className="form-control">
          <label className="form-label" htmlFor="end-date">End Date & Time</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              id="end-time"
              name="end-time"
              className="input-base" 
              type="date" 
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
            />
            <input 
              id="end-date"
              name="end-date"
              className="input-base" 
              type="time" 
              value={dateRange.endTime}
              onChange={(e) => setDateRange({...dateRange, endTime: e.target.value})}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="form-label" htmlFor="log-level">Log Level</label>
          <div className="select-wrapper">
            <select 
              id="log-level"
              className="select" 
              name="log-level"
              value={levelOption}
              onChange={(e) => setLevelOption(e.target.value)} >
                {levelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))} </select>

            <svg className="select-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="form-control">
          <label className="form-label" htmlFor="application">Application</label>
          <div className="select-wrapper">
            <select 
              id="application"
              name="application"
              className="select" 
              value={selectedAppOption}
              onChange={(e) => setSelectedAppOption(e.target.value) }
            >
          {appOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
            </select>
            <svg className="select-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="form-control">
          <label className="form-label" htmlFor="environment">Environment</label>
          <div className="select-wrapper">
            <select 
              id="environment"
              name="environment"
              className="select" 
              value={envOption}
              onChange={(e) => setEnvOption(e.target.value)}
            >
                {envOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            <svg className="select-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div className="filter-actions">
        <button className="button button-outlined" onClick={() => {console.log('Reset filters'); OnRefresh();}}>
          Reset
        </button>
        <button className="button button-contained" onClick={() => {console.log('Reset filters'); OnRefresh();}}>
          Apply Filters
        </button>
      </div>      
      
      </div>
    )}
    </div>
  );
}