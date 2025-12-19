import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { EventCard } from '@/components/events/EventCard';
import { CreateEventDialog } from '@/components/events/CreateEventDialog';
import { mockEvents, EventStatus } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Grid, List } from 'lucide-react';

const statusFilters: { label: string; value: EventStatus | 'all' }[] = [
  { label: 'All Events', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Completed', value: 'completed' },
];

export default function Events() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<EventStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredEvents =
    activeFilter === 'all'
      ? mockEvents
      : mockEvents.filter((event) => event.status === activeFilter);

  return (
    <AppLayout>
      <Header
        title="Events"
        subtitle={`${mockEvents.length} total events`}
        showCreateButton
        onCreateClick={() => setCreateDialogOpen(true)}
        createButtonText="Create Event"
      />

      <div className="p-6 space-y-6">
        {/* Filters & View Toggle */}
        <div className="flex items-center justify-between">
          {/* Status Filters */}
          <div className="flex items-center gap-2">
            {statusFilters.map((filter) => (
              <Button
                key={filter.value}
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  'rounded-full px-4',
                  activeFilter === filter.value &&
                    'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
                )}
              >
                {filter.label}
                {filter.value !== 'all' && (
                  <span className="ml-2 text-xs opacity-60">
                    {mockEvents.filter((e) =>
                      filter.value === 'all' ? true : e.status === filter.value
                    ).length}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8',
                viewMode === 'grid' && 'bg-background shadow-sm'
              )}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8',
                viewMode === 'list' && 'bg-background shadow-sm'
              )}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Events Grid/List */}
        {filteredEvents.length > 0 ? (
          <div
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'flex flex-col gap-4'
            )}
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState onCreateClick={() => setCreateDialogOpen(true)} />
        )}
      </div>

      <CreateEventDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </AppLayout>
  );
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="glass rounded-xl p-12 text-center animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
        <Grid className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Get started by creating your first event. You can always edit or duplicate events later.
      </p>
      <Button onClick={onCreateClick}>Create Your First Event</Button>
    </div>
  );
}
