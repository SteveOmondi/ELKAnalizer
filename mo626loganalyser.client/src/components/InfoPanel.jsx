// components/InfoPanel.jsx
import React from 'react'
export default function InfoPanel({ title, icon, items }) {
    return (
      <div className="bg-white p-3 rounded shadow-sm">
        <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
          {icon}
          {title}
        </h4>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-xs text-gray-500">{item.label}:</span>
              <span className="text-xs font-medium truncate max-w-xs">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }