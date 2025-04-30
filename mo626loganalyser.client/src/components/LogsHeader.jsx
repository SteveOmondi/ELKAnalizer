// components/LogsHeader.jsx
import React, { useState } from "react";
import { DownloadCloud, ChevronDown } from "lucide-react";

export default function LogsHeader({ onExport }) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format) => {
    onExport(format);
    setShowExportMenu(false);
  };

  return (
    <header className="app-bar">
      <div className="app-bar-title">
        <div className="flex justify-between items-center">
          <h1 className="app-bar-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <polyline points="9 22 9 16 15 16 15 22"></polyline>
              <path d="M8 10h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M16 10h.01"></path>
            </svg>
            Mo626 ice Log Analyzer
          </h1>
          <div className="app-bar-actions">
            <button className="button button-text" onClick={() => console.log('Refresh clicked')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}