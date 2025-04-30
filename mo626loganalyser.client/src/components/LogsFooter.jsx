// components/LogsFooter.jsx
import React from "react";

export default function LogsFooter({ filteredCount, totalCount }) {
    return (
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>Showing {filteredCount} of {totalCount} logs</div>
        <div>Last updated: {new Date().toLocaleString()}</div>
      </div>
    );
  }