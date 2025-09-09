import { useState, useEffect } from 'react';

export const ClockWidget = () => {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-gradient-widget border border-widget-border rounded-3xl px-12 py-8 shadow-widget backdrop-blur-sm">
        <div className="text-center">
          <div className="text-6xl font-light text-foreground mb-2 tracking-tight">
            {formatTime(currentTime)}
          </div>
          <div className="text-lg text-muted-foreground font-medium">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
};