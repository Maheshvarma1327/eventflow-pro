import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, MoreVertical, ArrowRight } from 'lucide-react';
import { Event } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const statusStyles = {
    draft: 'badge-draft',
    published: 'badge-published',
    completed: 'badge-completed',
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const capacityPercentage = (event.attendeeCount / event.maxCapacity) * 100;

  return (
    <div
      className="event-card animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Card Header with gradient accent */}
      <div className="h-2 gradient-primary" />
      
      <div className="p-5">
        {/* Top Row: Status & Actions */}
        <div className="flex items-start justify-between mb-3">
          <Badge className={cn('capitalize', statusStyles[event.status])}>
            {event.status}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Event</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Event Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(event.startDate)}
              {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>
              {event.attendeeCount.toLocaleString()} / {event.maxCapacity.toLocaleString()} attendees
            </span>
          </div>
        </div>

        {/* Capacity Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Capacity</span>
            <span className="text-foreground font-medium">{Math.round(capacityPercentage)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
        </div>

        {/* Revenue */}
        {event.revenue > 0 && (
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Revenue</span>
            <span className="text-lg font-semibold text-foreground">
              ${event.revenue.toLocaleString()}
            </span>
          </div>
        )}

        {/* View Details Link */}
        <Link
          to={`/events/${event.id}`}
          className="mt-4 flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors font-medium"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
