import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { mockAttendees, mockEvents } from '@/data/mockData';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  MessageSquare,
  Users,
  Building,
  Mail,
  Linkedin,
  Twitter,
} from 'lucide-react';

export default function Networking() {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [networkingEnabled, setNetworkingEnabled] = useState(true);

  const attendees = mockAttendees
    .filter((a) => a.eventId === selectedEvent && a.status !== 'cancelled')
    .filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.company?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <AppLayout>
      <Header
        title="Networking"
        subtitle="Connect attendees and facilitate meaningful interactions"
      />

      <div className="p-6 space-y-6">
        {/* Event Selector & Settings */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
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

          <div className="flex items-center gap-3 p-4 glass rounded-xl">
            <div className="flex-1">
              <p className="font-medium text-foreground">Enable Networking</p>
              <p className="text-sm text-muted-foreground">Allow attendees to connect</p>
            </div>
            <Switch checked={networkingEnabled} onCheckedChange={setNetworkingEnabled} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Profiles</p>
                <p className="text-2xl font-bold text-foreground">{attendees.length}</p>
              </div>
            </div>
          </div>
          <div className="stat-card animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10 text-success">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Messages Sent</p>
                <p className="text-2xl font-bold text-foreground">127</p>
              </div>
            </div>
          </div>
          <div className="stat-card animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Companies</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(attendees.map((a) => a.company).filter(Boolean)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendee Directory */}
        <div className="glass rounded-xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Attendee Directory</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search attendees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 bg-muted/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attendees.map((attendee, index) => (
              <AttendeeCard key={attendee.id} attendee={attendee} index={index} />
            ))}
          </div>

          {attendees.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No attendees found</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

function AttendeeCard({ attendee, index }: { attendee: typeof mockAttendees[0]; index: number }) {
  return (
    <div
      className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
          {attendee.name.split(' ').map((n) => n[0]).join('')}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{attendee.name}</h4>
          {attendee.company && (
            <p className="text-sm text-muted-foreground truncate">{attendee.company}</p>
          )}
          <Badge variant="outline" className="mt-2 text-xs">
            {attendee.ticketType}
          </Badge>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="flex-1 gap-1">
          <Mail className="w-4 h-4" />
          Message
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Linkedin className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Twitter className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
