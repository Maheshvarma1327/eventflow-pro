import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Attendee } from '@/data/mockData';

interface QRCodeDialogProps {
  attendee: Attendee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeDialog({ attendee, open, onOpenChange }: QRCodeDialogProps) {
  if (!attendee) return null;

  const qrData = JSON.stringify({
    id: attendee.id,
    name: attendee.name,
    email: attendee.email,
    eventId: attendee.eventId,
    ticketType: attendee.ticketType,
  });

  const handleDownload = () => {
    const svg = document.getElementById('attendee-qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `${attendee.name.replace(/\s+/g, '-')}-ticket-qr.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Attendee QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="p-4 bg-white rounded-xl">
            <QRCodeSVG
              id="attendee-qr-code"
              value={qrData}
              size={200}
              level="H"
              includeMargin
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">{attendee.name}</p>
            <p className="text-sm text-muted-foreground">{attendee.email}</p>
            <p className="text-sm text-primary mt-1">{attendee.ticketType}</p>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Download QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
