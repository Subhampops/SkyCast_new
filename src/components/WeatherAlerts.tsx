import React, { useState } from 'react';
import { BellRing, X } from 'lucide-react';

interface WeatherAlertsProps {
  alerts?: {
    event: string;
    description: string;
    start: number;
    end: number;
  }[];
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts = [] }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  
  if (!alerts.length) {
    return null;
  }
  
  const activeAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.event));
  
  if (!activeAlerts.length) {
    return null;
  }
  
  const dismissAlert = (event: string) => {
    setDismissedAlerts([...dismissedAlerts, event]);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      {activeAlerts.map((alert, index) => (
        <div 
          key={`${alert.event}-${index}`}
          className="bg-red-50 border-l-4 border-red-500 rounded-md p-4 mb-3 flex items-start justify-between"
        >
          <div className="flex items-start">
            <BellRing size={20} className="text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-700">{alert.event}</h3>
              <p className="text-red-600 text-sm mt-1">{alert.description}</p>
              <p className="text-red-500 text-xs mt-2">
                Valid until: {new Date(alert.end * 1000).toLocaleString()}
              </p>
            </div>
          </div>
          <button 
            onClick={() => dismissAlert(alert.event)}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;