import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { mockEvents } from '@/data/mockData';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Download,
  QrCode,
  Calendar,
  Image,
  Link,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';

const digitalAssets = [
  {
    id: '1',
    type: 'ticket',
    title: 'Digital Ticket',
    description: 'Personalized digital ticket with QR code',
    icon: QrCode,
    status: 'active',
  },
  {
    id: '2',
    type: 'agenda',
    title: 'Digital Agenda',
    description: 'Interactive event schedule for attendees',
    icon: Calendar,
    status: 'active',
  },
  {
    id: '3',
    type: 'brochure',
    title: 'Event Brochure',
    description: 'Downloadable PDF brochure with event details',
    icon: FileText,
    status: 'draft',
  },
  {
    id: '4',
    type: 'badge',
    title: 'Digital Badge',
    description: 'Shareable event attendance badge',
    icon: Image,
    status: 'active',
  },
];

export default function Digital() {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0].id);
  const selectedEventData = mockEvents.find(e => e.id === selectedEvent);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  };

  return (
    <AppLayout>
      <Header
        title="Digital Assets"
        subtitle="Manage paperless event materials and digital resources"
      />

      <div className="p-6 space-y-6">
        {/* Event Selector */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Select Event</label>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-[300px] bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Public Event Page */}
        <div className="glass rounded-xl p-6 animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Public Event Page</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share this link with attendees for registration and event info
              </p>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Link className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground font-mono">
                  eventflow.app/events/{selectedEvent}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 ml-auto"
                  onClick={() => copyLink(`https://eventflow.app/events/${selectedEvent}`)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Assets Grid */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Digital Materials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {digitalAssets.map((asset, index) => (
              <AssetCard key={asset.id} asset={asset} index={index} />
            ))}
          </div>
        </div>

        {/* Branding Section */}
        <div className="glass rounded-xl p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Event Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BrandingUpload label="Event Logo" description="PNG, SVG • Max 2MB" />
            <BrandingUpload label="Cover Image" description="1920x1080 recommended" />
            <BrandingUpload label="Sponsor Logos" description="Upload multiple logos" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function AssetCard({ asset, index }: { asset: typeof digitalAssets[0]; index: number }) {
  const Icon = asset.icon;
  
  return (
    <div
      className="glass rounded-xl p-5 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{asset.title}</h4>
            <Badge
              className={
                asset.status === 'active'
                  ? 'bg-success/20 text-success'
                  : 'bg-muted text-muted-foreground'
              }
            >
              {asset.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="ghost" size="sm">
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandingUpload({ label, description }: { label: string; description: string }) {
  return (
    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
      <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
      <p className="font-medium text-foreground text-sm">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
