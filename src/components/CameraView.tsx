import { useState, useRef, useEffect } from 'react';
import { X, RotateCcw, AlertCircle } from 'lucide-react';

interface CameraViewProps {
  onClose: () => void;
}

export const CameraView = ({ onClose }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const startCamera = async (facing: 'user' | 'environment' = 'user') => {
    try {
      setError(null);
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(newStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      if (err instanceof Error) {
        setError(`Camera access denied: ${err.message}`);
      } else {
        setError('Camera access denied or not available');
      }
    }
  };

  const flipCamera = () => {
    const newFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacing);
    startCamera(newFacing);
  };

  useEffect(() => {
    startCamera(facingMode);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Camera Access Error</h2>
          <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50">
      {/* Camera Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background/80 to-transparent p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          
          <button
            onClick={flipCamera}
            className="flex items-center justify-center w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Camera Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
    </div>
  );
};