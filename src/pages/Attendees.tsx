import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { mockAttendees, mockEvents, Attendee, AttendeeStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  Download,
  Mail,
  MoreHorizontal,
  QrCode,
  UserCheck,
  UserX,
} from 'lucide-react';
import { QRCodeDialog } from '@/components/attendees/QRCodeDialog';

const statusConfig: Record<AttendeeStatus, { label: string; className: string }> = {
  registered: { label: 'Registered', className: 'bg-primary/20 text-primary' },
  'checked-in': { label: 'Checked In', className: 'bg-success/20 text-success' },
  cancelled: { label: 'Cancelled', className: 'bg-destructive/20 text-destructive' },
};

export default function Attendees() {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AttendeeStatus | 'all'>('all');
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  const filteredAttendees = mockAttendees
    .filter((a) => a.eventId === selectedEvent)
    .filter((a) => statusFilter === 'all' || a.status === statusFilter)
    .filter(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.company?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const stats = {
    total: mockAttendees.filter((a) => a.eventId === selectedEvent).length,
    checkedIn: mockAttendees.filter((a) => a.eventId === selectedEvent && a.status === 'checked-in').length,
    registered: mockAttendees.filter((a) => a.eventId === selectedEvent && a.status === 'registered').length,
    cancelled: mockAttendees.filter((a) => a.eventId === selectedEvent && a.status === 'cancelled').length,
  };

  const handleViewQR = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setQrDialogOpen(true);
  };

  return (
    <AppLayout>
      <Header
        title="Attendees"
        subtitle="Manage event registrations and attendees"
        showCreateButton
        createButtonText="Add Attendee"
      />

      <div className="p-6 space-y-6">
        {/* Event Selector & Stats */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-4 justify-between">
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

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            <StatBadge label="Total" value={stats.total} />
            <StatBadge label="Checked In" value={stats.checkedIn} color="success" />
            <StatBadge label="Pending" value={stats.registered} color="primary" />
            <StatBadge label="Cancelled" value={stats.cancelled} color="destructive" />
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search attendees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 bg-card"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as AttendeeStatus | 'all')}>
              <SelectTrigger className="w-[150px] bg-card">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="w-4 h-4" />
              Email All
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Attendees Table */}
        <div className="glass rounded-xl overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Company</TableHead>
                <TableHead className="text-muted-foreground">Ticket Type</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Registered</TableHead>
                <TableHead className="text-muted-foreground w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendees.map((attendee, index) => (
                <AttendeeRow key={attendee.id} attendee={attendee} index={index} onViewQR={handleViewQR} />
              ))}
            </TableBody>
          </Table>

          {filteredAttendees.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">No attendees found matching your criteria.</p>
            </div>
          )}
        </div>

        <QRCodeDialog
          attendee={selectedAttendee}
          open={qrDialogOpen}
          onOpenChange={setQrDialogOpen}
        />
      </div>
    </AppLayout>
  );
}

function StatBadge({ label, value, color }: { label: string; value: number; color?: string }) {
  const colorClasses = {
    success: 'text-success',
    primary: 'text-primary',
    destructive: 'text-destructive',
  };

  return (
    <div className="text-center">
      <p className={cn('text-2xl font-bold', color ? colorClasses[color as keyof typeof colorClasses] : 'text-foreground')}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function AttendeeRow({ attendee, index, onViewQR }: { attendee: Attendee; index: number; onViewQR: (attendee: Attendee) => void }) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <TableRow
      className="border-border animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <TableCell className="font-medium text-foreground">{attendee.name}</TableCell>
      <TableCell className="text-muted-foreground">{attendee.email}</TableCell>
      <TableCell className="text-muted-foreground">{attendee.company || '-'}</TableCell>
      <TableCell className="text-foreground">{attendee.ticketType}</TableCell>
      <TableCell>
        <Badge className={cn('capitalize', statusConfig[attendee.status].className)}>
          {statusConfig[attendee.status].label}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">{formatDate(attendee.registeredAt)}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewQR(attendee)}>
              <QrCode className="w-4 h-4 mr-2" />
              View QR Code
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserCheck className="w-4 h-4 mr-2" />
              Check In
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <UserX className="w-4 h-4 mr-2" />
              Cancel Registration
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
