import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EventCard } from '@/components/events/EventCard';
import { CreateEventDialog } from '@/components/events/CreateEventDialog';
import { dashboardStats, mockEvents } from '@/data/mockData';
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const upcomingEvents = mockEvents.filter(e => e.status === 'published');

  return (
    <AppLayout>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your events."
        showCreateButton
        onCreateClick={() => setCreateDialogOpen(true)}
        createButtonText="New Event"
      />

      <div className="p-6 space-y-8">
        {/* Stats Grid */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Events"
              value={dashboardStats.totalEvents}
              change="+2 this month"
              changeType="positive"
              icon={Calendar}
            />
            <StatsCard
              title="Total Attendees"
              value={dashboardStats.totalAttendees.toLocaleString()}
              change="+12% from last month"
              changeType="positive"
              icon={Users}
            />
            <StatsCard
              title="Total Revenue"
              value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
              change="+8.5% from last month"
              changeType="positive"
              icon={DollarSign}
            />
            <StatsCard
              title="Checked In Today"
              value={dashboardStats.checkedInToday}
              change="Active event in progress"
              changeType="neutral"
              icon={QrCode}
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <QuickActionCard
            title="Manage Check-ins"
            description="Monitor real-time check-ins and attendance"
            href="/checkin"
            icon={QrCode}
          />
          <QuickActionCard
            title="View All Attendees"
            description="Access your complete attendee database"
            href="/attendees"
            icon={Users}
          />
          <QuickActionCard
            title="Revenue Analytics"
            description="Track ticket sales and revenue trends"
            href="/tickets"
            icon={TrendingUp}
          />
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="glass rounded-xl p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </section>
      </div>

      <CreateEventDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </AppLayout>
  );
};

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

function QuickActionCard({ title, description, href, icon: Icon }: QuickActionCardProps) {
  return (
    <Link
      to={href}
      className="glass rounded-xl p-5 transition-all duration-300 hover:shadow-glow hover:border-primary/30 group animate-fade-in"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </Link>
  );
}

interface ActivityItemProps {
  action: string;
  event: string;
  time: string;
  type: 'registration' | 'checkin' | 'ticket' | 'update';
}

function ActivityItem({ action, event, time, type }: ActivityItemProps) {
  const typeColors = {
    registration: 'bg-success/20 text-success',
    checkin: 'bg-primary/20 text-primary',
    ticket: 'bg-warning/20 text-warning',
    update: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="flex items-center gap-4 py-2">
      <div className={`w-2 h-2 rounded-full ${typeColors[type].split(' ')[0]}`} />
      <div className="flex-1">
        <p className="text-sm text-foreground">
          <span className="font-medium">{action}</span>
          <span className="text-muted-foreground"> for </span>
          <span className="font-medium">{event}</span>
        </p>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
}

const recentActivities: ActivityItemProps[] = [
  { action: 'New registration', event: 'TechSummit 2025', time: '2 min ago', type: 'registration' },
  { action: 'Check-in completed', event: 'TechSummit 2025', time: '5 min ago', type: 'checkin' },
  { action: 'Ticket purchased', event: 'AI & ML Summit', time: '12 min ago', type: 'ticket' },
  { action: 'Event updated', event: 'Design Masters', time: '1 hour ago', type: 'update' },
  { action: 'New registration', event: 'AI & ML Summit', time: '2 hours ago', type: 'registration' },
];

export default Index;
