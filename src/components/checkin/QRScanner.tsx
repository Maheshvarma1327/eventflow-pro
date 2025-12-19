import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
  isActive: boolean;
}

export function QRScanner({ onScan, onError, isActive }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (isActive && !isScanning) {
      startScanner();
    } else if (!isActive && isScanning) {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isActive]);

  const startScanner = async () => {
    try {
      setCameraError(null);
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        (decodedText) => {
          onScan(decodedText);
        },
        () => {}
      );

      setIsScanning(true);
      setHasCamera(true);
    } catch (err) {
      console.error('Camera error:', err);
      setHasCamera(false);
      setCameraError('Unable to access camera. Please grant camera permissions.');
      onError?.('Camera access denied');
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  const restartScanner = () => {
    stopScanner().then(() => {
      setTimeout(startScanner, 100);
    });
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden border-2 border-primary/30 bg-muted/20">
        <div id="qr-reader" className="w-full h-full" />
        
        {!hasCamera && cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/90 p-4 text-center">
            <CameraOff className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">{cameraError}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 gap-2"
              onClick={restartScanner}
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        )}

        {hasCamera && isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-lg" />
          </div>
        )}
      </div>

      {hasCamera && isScanning && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Camera className="w-4 h-4 text-success animate-pulse" />
          <span>Camera active - Position QR code in frame</span>
        </div>
      )}
    </div>
  );
}
