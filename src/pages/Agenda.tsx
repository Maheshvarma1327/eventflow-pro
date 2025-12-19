import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { mockSessions, mockEvents, Session } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Clock, MapPin, User, Plus, GripVertical } from 'lucide-react';

const sessionTypeColors: Record<Session['type'], string> = {
  keynote: 'bg-primary/20 text-primary border-primary/30',
  workshop: 'bg-success/20 text-success border-success/30',
  panel: 'bg-accent/20 text-accent border-accent/30',
  break: 'bg-muted text-muted-foreground border-border',
  networking: 'bg-warning/20 text-warning border-warning/30',
};

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

export default function Agenda() {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0].id);
  const sessions = mockSessions.filter((s) => s.eventId === selectedEvent);

  const rooms = [...new Set(sessions.map((s) => s.room))];

  return (
    <AppLayout>
      <Header
        title="Agenda Builder"
        subtitle="Create and manage event schedules"
        showCreateButton
        createButtonText="Add Session"
      />

      <div className="p-6 space-y-6">
        {/* Event Selector */}
        <div className="flex items-center gap-4">
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

        {/* Schedule Grid */}
        <div className="glass rounded-xl overflow-hidden animate-fade-in">
          {/* Grid Header - Rooms */}
          <div className="grid border-b border-border" style={{ gridTemplateColumns: `80px repeat(${rooms.length}, 1fr)` }}>
            <div className="p-4 bg-muted/50 border-r border-border">
              <span className="text-sm font-medium text-muted-foreground">Time</span>
            </div>
            {rooms.map((room) => (
              <div key={room} className="p-4 bg-muted/50 border-r border-border last:border-r-0">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{room}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="relative">
            {timeSlots.map((time, timeIndex) => (
              <div
                key={time}
                className="grid border-b border-border last:border-b-0"
                style={{ gridTemplateColumns: `80px repeat(${rooms.length}, 1fr)` }}
              >
                {/* Time Column */}
                <div className="p-4 border-r border-border text-sm text-muted-foreground font-medium">
                  {time}
                </div>

                {/* Room Columns */}
                {rooms.map((room) => {
                  const session = sessions.find(
                    (s) => s.room === room && s.startTime === time
                  );

                  return (
                    <div
                      key={`${time}-${room}`}
                      className="p-2 border-r border-border last:border-r-0 min-h-[80px] relative group"
                    >
                      {session ? (
                        <SessionCard session={session} />
                      ) : (
                        <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                            <Plus className="w-4 h-4" />
                            Add
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm text-muted-foreground">Session Types:</span>
          {Object.entries(sessionTypeColors).map(([type, color]) => (
            <Badge
              key={type}
              variant="outline"
              className={cn('capitalize', color)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function SessionCard({ session }: { session: Session }) {
  return (
    <div
      className={cn(
        'p-3 rounded-lg border cursor-move transition-all hover:shadow-md group/card',
        sessionTypeColors[session.type]
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm line-clamp-2 text-foreground">
            {session.title}
          </h4>
          {session.speaker && (
            <div className="flex items-center gap-1 mt-1 text-xs opacity-75">
              <User className="w-3 h-3" />
              <span>{session.speaker}</span>
            </div>
          )}
          <div className="flex items-center gap-1 mt-1 text-xs opacity-75">
            <Clock className="w-3 h-3" />
            <span>{session.startTime} - {session.endTime}</span>
          </div>
        </div>
        <GripVertical className="w-4 h-4 opacity-0 group-hover/card:opacity-50 transition-opacity flex-shrink-0" />
      </div>
    </div>
  );
}
