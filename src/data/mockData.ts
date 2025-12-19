export type EventStatus = 'draft' | 'published' | 'completed';
export type TicketType = 'free' | 'paid';
export type AttendeeStatus = 'registered' | 'checked-in' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  venue: string;
  attendeeCount: number;
  maxCapacity: number;
  ticketsSold: number;
  revenue: number;
  coverImage?: string;
}

export interface Session {
  id: string;
  eventId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  room: string;
  speaker: string;
  speakerTitle?: string;
  type: 'keynote' | 'workshop' | 'panel' | 'break' | 'networking';
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
}

export interface Attendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  company?: string;
  ticketType: string;
  status: AttendeeStatus;
  registeredAt: string;
  checkedInAt?: string;
  qrCode: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  type: TicketType;
  price: number;
  quantity: number;
  sold: number;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'TechSummit 2025',
    description: 'The premier technology conference bringing together industry leaders, innovators, and developers.',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    status: 'published',
    venue: 'Convention Center',
    attendeeCount: 847,
    maxCapacity: 1200,
    ticketsSold: 892,
    revenue: 156400,
  },
  {
    id: '2',
    title: 'Design Masters Conference',
    description: 'A gathering of creative minds exploring the future of design and user experience.',
    startDate: '2025-04-22',
    endDate: '2025-04-23',
    status: 'draft',
    venue: 'Creative Hub',
    attendeeCount: 0,
    maxCapacity: 500,
    ticketsSold: 0,
    revenue: 0,
  },
  {
    id: '3',
    title: 'Startup Showcase 2025',
    description: 'Annual startup pitch event connecting founders with investors and mentors.',
    startDate: '2025-02-10',
    endDate: '2025-02-10',
    status: 'completed',
    venue: 'Innovation Campus',
    attendeeCount: 312,
    maxCapacity: 350,
    ticketsSold: 345,
    revenue: 24150,
  },
  {
    id: '4',
    title: 'AI & Machine Learning Summit',
    description: 'Deep dive into the latest advancements in artificial intelligence and machine learning.',
    startDate: '2025-05-08',
    endDate: '2025-05-10',
    status: 'published',
    venue: 'Tech Center',
    attendeeCount: 156,
    maxCapacity: 800,
    ticketsSold: 234,
    revenue: 93600,
  },
];

export const mockSessions: Session[] = [
  {
    id: 's1',
    eventId: '1',
    title: 'Opening Keynote: The Future of Tech',
    description: 'Setting the stage for three days of innovation and learning.',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Main Hall',
    speaker: 'Sarah Chen',
    speakerTitle: 'CEO, TechVision Inc.',
    type: 'keynote',
  },
  {
    id: 's2',
    eventId: '1',
    title: 'Building Scalable Systems',
    description: 'Best practices for architecting systems that scale.',
    startTime: '10:30',
    endTime: '12:00',
    room: 'Room A',
    speaker: 'Marcus Johnson',
    speakerTitle: 'Principal Engineer, ScaleCo',
    type: 'workshop',
  },
  {
    id: 's3',
    eventId: '1',
    title: 'Networking Lunch',
    description: 'Connect with fellow attendees over lunch.',
    startTime: '12:00',
    endTime: '13:30',
    room: 'Atrium',
    speaker: '',
    type: 'break',
  },
  {
    id: 's4',
    eventId: '1',
    title: 'Panel: Women in Tech Leadership',
    description: 'Inspiring stories and insights from women leading in technology.',
    startTime: '14:00',
    endTime: '15:30',
    room: 'Main Hall',
    speaker: 'Various Speakers',
    type: 'panel',
  },
  {
    id: 's5',
    eventId: '1',
    title: 'Hands-on: Cloud Native Development',
    description: 'Practical workshop on building cloud-native applications.',
    startTime: '14:00',
    endTime: '16:00',
    room: 'Room B',
    speaker: 'Alex Rivera',
    speakerTitle: 'Cloud Architect, CloudFirst',
    type: 'workshop',
  },
  {
    id: 's6',
    eventId: '1',
    title: 'Evening Networking Reception',
    description: 'Casual networking with drinks and appetizers.',
    startTime: '17:00',
    endTime: '19:00',
    room: 'Rooftop Terrace',
    speaker: '',
    type: 'networking',
  },
];

export const mockAttendees: Attendee[] = [
  {
    id: 'a1',
    eventId: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'TechCorp',
    ticketType: 'VIP Pass',
    status: 'checked-in',
    registeredAt: '2025-01-15T10:30:00Z',
    checkedInAt: '2025-03-15T08:45:00Z',
    qrCode: 'QR-A1-JOHN',
  },
  {
    id: 'a2',
    eventId: '1',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    company: 'DesignStudio',
    ticketType: 'General Admission',
    status: 'registered',
    registeredAt: '2025-01-18T14:20:00Z',
    qrCode: 'QR-A2-EMILY',
  },
  {
    id: 'a3',
    eventId: '1',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    company: 'StartupXYZ',
    ticketType: 'General Admission',
    status: 'checked-in',
    registeredAt: '2025-01-20T09:15:00Z',
    checkedInAt: '2025-03-15T09:02:00Z',
    qrCode: 'QR-A3-MICHAEL',
  },
  {
    id: 'a4',
    eventId: '1',
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    company: 'InnovateLab',
    ticketType: 'VIP Pass',
    status: 'registered',
    registeredAt: '2025-01-22T16:45:00Z',
    qrCode: 'QR-A4-SARAH',
  },
  {
    id: 'a5',
    eventId: '1',
    name: 'David Lee',
    email: 'david.lee@example.com',
    company: 'CodeCraft',
    ticketType: 'Workshop Pass',
    status: 'cancelled',
    registeredAt: '2025-01-25T11:00:00Z',
    qrCode: 'QR-A5-DAVID',
  },
];

export const mockVenues: Venue[] = [
  {
    id: 'v1',
    name: 'Convention Center',
    address: '123 Main Street',
    city: 'San Francisco, CA',
    rooms: [
      { id: 'r1', name: 'Main Hall', capacity: 800 },
      { id: 'r2', name: 'Room A', capacity: 150 },
      { id: 'r3', name: 'Room B', capacity: 150 },
      { id: 'r4', name: 'Atrium', capacity: 400 },
      { id: 'r5', name: 'Rooftop Terrace', capacity: 200 },
    ],
  },
  {
    id: 'v2',
    name: 'Creative Hub',
    address: '456 Design Ave',
    city: 'New York, NY',
    rooms: [
      { id: 'r6', name: 'Gallery', capacity: 300 },
      { id: 'r7', name: 'Studio A', capacity: 80 },
      { id: 'r8', name: 'Studio B', capacity: 80 },
    ],
  },
];

export const mockTickets: Ticket[] = [
  {
    id: 't1',
    eventId: '1',
    name: 'General Admission',
    type: 'paid',
    price: 150,
    quantity: 800,
    sold: 612,
  },
  {
    id: 't2',
    eventId: '1',
    name: 'VIP Pass',
    type: 'paid',
    price: 350,
    quantity: 200,
    sold: 156,
  },
  {
    id: 't3',
    eventId: '1',
    name: 'Workshop Pass',
    type: 'paid',
    price: 250,
    quantity: 200,
    sold: 124,
  },
  {
    id: 't4',
    eventId: '1',
    name: 'Student Ticket',
    type: 'paid',
    price: 75,
    quantity: 100,
    sold: 89,
  },
];

export const dashboardStats = {
  totalEvents: 4,
  activeEvents: 2,
  totalAttendees: 1315,
  totalRevenue: 274150,
  upcomingEvents: 3,
  checkedInToday: 312,
};
