// App.jsx - Main component with axios implementation
import React from "react";
import useLogsData from "./hooks/useLogsData";
import LogsHeader from "./components/LogsHeader";
import LogsFilterBar from "./components/LogsFilterBar";
import LogsList from "./components/LogsList";
import LogsFooter from "./components/LogsFooter";
import Pagination from "./components/Pagination";

export default function App() {
  const {
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
    refreshLogs,
    onLogsFetched,
    exportLogs,levelOptions, setLevelOptions,
    appOptions, setAppOptions,
    envOptions, setEnvOptions,applyLogs
  } = useLogsData();


  return (
    <div className="app-root">
      {/* <LogsHeader onExport={exportLogs} />
       */}
      <main className="main-content">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <LogsFilterBar 
          levelOptions = {levelOptions}
          setLevelOptions = {setLevelOptions}
          appOptions = {appOptions}
          setAppOptions = {setAppOptions}
          envOptions = {envOptions}
          setEnvOptions = {setEnvOptions}
          onLogsFetched={applyLogs}
          />
          
          <LogsList 
            logs={logs}
            loading={loading}
            error={error}
            expandedLog={expandedLog}
            toggleExpand={toggleExpand}
          />
          
          {!loading && !error && logs.length > 0 && (
            <Pagination
              currentPage={page}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
        
        <LogsFooter 
          filteredCount={logs.length} 
          totalCount={totalCount} 
        />
      </main>
    </div>
  );
}