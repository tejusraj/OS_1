import { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-status-bar text-foreground text-sm font-medium">
      {/* Left side - Time */}
      <div className="font-semibold">
        {formatTime(currentTime)}
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center space-x-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <div className="flex items-center">
          <Battery className="w-4 h-4" />
          <span className="ml-1 text-xs">85%</span>
        </div>
      </div>
    </div>
  );
};