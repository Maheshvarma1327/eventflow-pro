import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { mockAttendees, mockEvents } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  QrCode,
  UserCheck,
  Users,
  Clock,
  TrendingUp,
  Scan,
} from 'lucide-react';

export default function Checkin() {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [scanMode, setScanMode] = useState(false);

  const eventAttendees = mockAttendees.filter((a) => a.eventId === selectedEvent);
  const checkedInCount = eventAttendees.filter((a) => a.status === 'checked-in').length;
  const totalCount = eventAttendees.length;
  const checkInRate = Math.round((checkedInCount / totalCount) * 100);

  const pendingAttendees = eventAttendees
    .filter((a) => a.status === 'registered')
    .filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const recentCheckIns = eventAttendees
    .filter((a) => a.status === 'checked-in')
    .sort((a, b) => new Date(b.checkedInAt!).getTime() - new Date(a.checkedInAt!).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
      <Header
        title="Check-in Dashboard"
        subtitle="Monitor and manage event check-ins in real-time"
      />

      <div className="p-6 space-y-6">
        {/* Event Selector */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Active Event</label>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-[300px] bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockEvents.filter(e => e.status === 'published').map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            size="lg"
            className={cn(
              'gap-2 px-8',
              scanMode && 'bg-success hover:bg-success/90'
            )}
            onClick={() => setScanMode(!scanMode)}
          >
            <Scan className="w-5 h-5" />
            {scanMode ? 'Scanning Active' : 'Start Scanning'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Registered"
            value={totalCount}
            color="primary"
          />
          <StatCard
            icon={UserCheck}
            label="Checked In"
            value={checkedInCount}
            color="success"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={totalCount - checkedInCount}
            color="warning"
          />
          <StatCard
            icon={TrendingUp}
            label="Check-in Rate"
            value={`${checkInRate}%`}
            color="accent"
          />
        </div>

        {/* Progress Bar */}
        <div className="glass rounded-xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Check-in Progress</h3>
            <span className="text-sm text-muted-foreground">
              {checkedInCount} of {totalCount} attendees
            </span>
          </div>
          <Progress value={checkInRate} className="h-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Search & Check-in */}
          <div className="glass rounded-xl p-6 animate-fade-in">
            <h3 className="font-semibold text-foreground mb-4">Quick Check-in</h3>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/50"
              />
            </div>

            {/* QR Scan Area */}
            {scanMode && (
              <div className="mb-4 p-8 border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 text-center">
                <QrCode className="w-12 h-12 mx-auto mb-3 text-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  Position QR code in front of camera to scan
                </p>
              </div>
            )}

            {/* Pending Attendees List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {pendingAttendees.map((attendee) => (
                <div
                  key={attendee.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{attendee.name}</p>
                    <p className="text-sm text-muted-foreground">{attendee.email}</p>
                  </div>
                  <Button size="sm" className="gap-1">
                    <UserCheck className="w-4 h-4" />
                    Check In
                  </Button>
                </div>
              ))}
              {pendingAttendees.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  {searchQuery ? 'No matching attendees found' : 'All attendees checked in!'}
                </p>
              )}
            </div>
          </div>

          {/* Recent Check-ins */}
          <div className="glass rounded-xl p-6 animate-fade-in">
            <h3 className="font-semibold text-foreground mb-4">Recent Check-ins</h3>
            <div className="space-y-3">
              {recentCheckIns.map((attendee, index) => (
                <div
                  key={attendee.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-success/5 border border-success/20 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{attendee.name}</p>
                    <p className="text-sm text-muted-foreground">{attendee.ticketType}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-success/20 text-success">Checked In</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatCheckInTime(attendee.checkedInAt!)}
                    </p>
                  </div>
                </div>
              ))}
              {recentCheckIns.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No check-ins yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-center gap-4">
        <div className={cn('p-3 rounded-xl', colorClasses[color as keyof typeof colorClasses])}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

function formatCheckInTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
