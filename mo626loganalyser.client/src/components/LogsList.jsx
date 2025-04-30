// components/LogsList.jsx
import React from 'react'
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import LogItem from './LogItem';

export default function LogsList({ logs, loading, error, expandedLog, toggleExpand }) {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (logs.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {logs.map((log, index) => (
        <LogItem 
          key={index}
          log={log}
          index={index}
          isExpanded={expandedLog === index}
          onToggle={() => toggleExpand(index)}
        />
      ))}
    </div>
  );
}