import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  MapPin,
  Ticket,
  Users,
  QrCode,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';
import ventureMondLogo from '@/assets/venture-mond-logo.jpeg';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Agenda', href: '/agenda', icon: CalendarDays },
  { name: 'Venues', href: '/venues', icon: MapPin },
  { name: 'Tickets', href: '/tickets', icon: Ticket },
  { name: 'Attendees', href: '/attendees', icon: Users },
  { name: 'Check-in', href: '/checkin', icon: QrCode },
  { name: 'Digital Assets', href: '/digital', icon: FileText },
  { name: 'Networking', href: '/networking', icon: MessageSquare },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={ventureMondLogo}
            alt="Venture Mond"
            className="w-8 h-8 rounded-lg object-cover"
          />
          {!collapsed && (
            <span className="font-semibold text-lg text-foreground">Venture Mond</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft
            className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')}
          />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'nav-item',
                isActive && 'nav-item-active',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-primary')} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'nav-item',
                isActive && 'nav-item-active',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-primary')} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
