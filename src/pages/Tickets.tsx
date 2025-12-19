import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { mockTickets, mockEvents } from '@/data/mockData';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Ticket,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Tickets() {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0].id);
  
  const tickets = mockTickets.filter(t => t.eventId === selectedEvent);
  const totalRevenue = tickets.reduce((sum, t) => sum + (t.price * t.sold), 0);
  const totalSold = tickets.reduce((sum, t) => sum + t.sold, 0);
  const totalAvailable = tickets.reduce((sum, t) => sum + t.quantity, 0);

  return (
    <AppLayout>
      <Header
        title="Tickets & Pricing"
        subtitle="Manage ticket types and track sales"
        showCreateButton
        createButtonText="Create Ticket"
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

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="stat-card animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10 text-success">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tickets Sold</p>
                <p className="text-2xl font-bold text-foreground">{totalSold}</p>
              </div>
            </div>
          </div>
          <div className="stat-card animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sell-through Rate</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round((totalSold / totalAvailable) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket, index) => (
            <TicketCard key={ticket.id} ticket={ticket} index={index} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function TicketCard({ ticket, index }: { ticket: typeof mockTickets[0]; index: number }) {
  const soldPercentage = Math.round((ticket.sold / ticket.quantity) * 100);
  const revenue = ticket.price * ticket.sold;

  return (
    <div
      className="glass rounded-xl p-6 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{ticket.name}</h3>
          <Badge
            className={cn(
              'mt-1',
              ticket.type === 'free'
                ? 'bg-muted text-muted-foreground'
                : 'bg-primary/20 text-primary'
            )}
          >
            {ticket.type === 'free' ? 'Free' : `$${ticket.price}`}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="w-4 h-4 mr-2" />
              Edit Ticket
            </DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sales Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Sales Progress</span>
          <span className="font-medium text-foreground">
            {ticket.sold} / {ticket.quantity} sold
          </span>
        </div>
        <Progress value={soldPercentage} className="h-2" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Revenue</p>
          <p className="text-lg font-semibold text-foreground">${revenue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Available</p>
          <p className="text-lg font-semibold text-foreground">{ticket.quantity - ticket.sold}</p>
        </div>
      </div>
    </div>
  );
}
