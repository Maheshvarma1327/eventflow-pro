import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { mockVenues } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Users,
  Building,
  MoreVertical,
  Edit,
  Plus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Venues() {
  return (
    <AppLayout>
      <Header
        title="Venues"
        subtitle="Manage event locations and room configurations"
        showCreateButton
        createButtonText="Add Venue"
      />

      <div className="p-6 space-y-6">
        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockVenues.map((venue, index) => (
            <div
              key={venue.id}
              className="glass rounded-xl overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Venue Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{venue.name}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{venue.address}, {venue.city}</span>
                      </div>
                    </div>
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
                        Edit Venue
                      </DropdownMenuItem>
                      <DropdownMenuItem>View on Map</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Venue</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Rooms List */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Rooms ({venue.rooms.length})
                  </h4>
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    <Plus className="w-4 h-4" />
                    Add Room
                  </Button>
                </div>
                <div className="space-y-3">
                  {venue.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground">{room.name}</span>
                      <Badge variant="outline" className="gap-1">
                        <Users className="w-3 h-3" />
                        {room.capacity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Capacity */}
              <div className="px-6 py-4 bg-muted/30 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Capacity</span>
                  <span className="font-semibold text-foreground">
                    {venue.rooms.reduce((sum, r) => sum + r.capacity, 0)} attendees
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
