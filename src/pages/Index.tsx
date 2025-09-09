import { useState } from 'react';
import { StatusBar } from '@/components/StatusBar';
import { ClockWidget } from '@/components/ClockWidget';
import { QuickToggles } from '@/components/QuickToggles';
import { DockIcons } from '@/components/DockIcons';
import { CameraView } from '@/components/CameraView';

const Index = () => {
  const [showCamera, setShowCamera] = useState(false);

  const handleCameraClick = () => {
    setShowCamera(true);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  if (showCamera) {
    return <CameraView onClose={handleCameraClose} />;
  }

  return (
    <div className="min-h-screen bg-gradient-homescreen flex flex-col max-w-sm mx-auto relative overflow-hidden">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between pt-8 pb-32">
        {/* Clock Widget */}
        <div className="flex-1 flex items-center justify-center">
          <ClockWidget />
        </div>
        
        {/* Quick Toggles */}
        <div className="mt-auto">
          <QuickToggles />
        </div>
      </div>
      
      {/* Dock Icons */}
      <DockIcons onCameraClick={handleCameraClick} />
    </div>
  );
};

export default Index;
