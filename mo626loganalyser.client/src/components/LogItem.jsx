// components/LogItem.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import LogItemDetails from './LogItemDetails';

export default function LogItem({ log, index, isExpanded, onToggle }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getLevelColor = (level) => {
    switch (level) {
      case "Information":
        return "bg-blue-100 text-blue-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className={`px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 ${isExpanded ? 'bg-gray-50' : 'bg-white'}`}
        onClick={onToggle}
      >
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(log.level)}`}>
              {log.level}
            </span>
            <span className="text-gray-500 text-xs flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDate(log["@timestamp"])}
            </span>
          </div>
          <h3 className="font-medium text-gray-900 truncate">{log.message}</h3>
        </div>
        <div className="ml-2">
          {isExpanded ? 
            <ChevronUp className="h-5 w-5 text-gray-400" /> : 
            <ChevronDown className="h-5 w-5 text-gray-400" />
          }
        </div>
      </div>
      
      {isExpanded && <LogItemDetails log={log} />}
    </div>
  );
}