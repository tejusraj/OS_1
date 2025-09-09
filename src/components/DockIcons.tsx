import { Phone, MessageSquare, Camera, Globe } from 'lucide-react';

interface DockIconsProps {
  onCameraClick: () => void;
}

export const DockIcons = ({ onCameraClick }: DockIconsProps) => {
  const dockItems = [
    { icon: Phone, label: 'Phone', onClick: () => {} },
    { icon: MessageSquare, label: 'Messages', onClick: () => {} },
    { icon: Camera, label: 'Camera', onClick: onCameraClick },
    { icon: Globe, label: 'Browser', onClick: () => {} },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-6">
      <div className="bg-gradient-dock border border-widget-border rounded-2xl p-4 shadow-dock backdrop-blur-lg">
        <div className="flex justify-center items-center space-x-6">
          {dockItems.map(({ icon: Icon, label, onClick }, index) => (
            <button
              key={label}
              onClick={onClick}
              className={`relative group flex items-center justify-center w-14 h-14 bg-gradient-icon rounded-xl shadow-icon transition-all duration-300 transform hover:scale-110 hover:shadow-glow ${
                index === 2 ? 'hover:bg-primary hover:shadow-glow' : ''
              }`}
            >
              <Icon className={`w-7 h-7 ${index === 2 ? 'text-primary group-hover:text-primary-foreground' : 'text-foreground'}`} />
              
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card text-card-foreground px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};