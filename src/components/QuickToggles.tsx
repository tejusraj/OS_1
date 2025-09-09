import { useState } from 'react';
import { Wifi, Bluetooth, Moon, Flashlight } from 'lucide-react';

export const QuickToggles = () => {
  const [toggles, setToggles] = useState({
    wifi: true,
    bluetooth: false,
    dnd: false,
    torch: false
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleItems = [
    { key: 'wifi' as const, icon: Wifi, label: 'WiFi' },
    { key: 'bluetooth' as const, icon: Bluetooth, label: 'Bluetooth' },
    { key: 'dnd' as const, icon: Moon, label: 'DND' },
    { key: 'torch' as const, icon: Flashlight, label: 'Torch' },
  ];

  return (
    <div className="px-6 py-4">
      <div className="bg-gradient-widget border border-widget-border rounded-2xl p-4 shadow-widget backdrop-blur-sm">
        <div className="grid grid-cols-4 gap-4">
          {toggleItems.map(({ key, icon: Icon, label }) => {
            const isActive = toggles[key];
            return (
              <button
                key={key}
                onClick={() => handleToggle(key)}
                className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-toggle-active text-primary-foreground shadow-glow' 
                    : 'bg-toggle-inactive text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};