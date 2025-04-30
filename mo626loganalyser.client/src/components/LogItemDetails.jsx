
// components/LogItemDetails.jsx
import React from 'react'
import { Server, Database, Tag, ExternalLink } from 'lucide-react';
import InfoPanel from './InfoPanel';

export default function LogItemDetails({ log }) {
  const requestDetails = [
    { label: "Method", value: log.fields.HttpMethod },
    { label: "URI", value: log.fields.Uri },
    { label: "Request ID", value: log.fields.RequestId },
    { label: "Path", value: log.fields.RequestPath }
  ];
  
  const applicationInfo = [
    { label: "Application", value: log.fields.Application },
    { label: "Source", value: log.fields.SourceContext },
    { label: "Environment", value: log.fields.EnvironmentName },
    { label: "Machine", value: log.fields.MachineName }
  ];
  
  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InfoPanel 
          title="Request Details"
          icon={<Server className="h-4 w-4 mr-1" />}
          items={requestDetails}
        />
        
        <InfoPanel 
          title="Application Info"
          icon={<Database className="h-4 w-4 mr-1" />}
          items={applicationInfo}
        />
      </div>
      
      <div className="bg-white p-3 rounded shadow-sm">
        <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
          <Tag className="h-4 w-4 mr-1" />
          Additional Information
        </h4>
        <div className="overflow-auto max-h-64">
          <pre className="text-xs text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(log.fields, null, 2)}
          </pre>
        </div>
      </div>
      
      <div className="flex justify-end mt-3">
        <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800">
          View full details
          <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
}