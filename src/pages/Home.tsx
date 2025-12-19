import { Link } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronDown, MapPin, Heart, Share } from 'lucide-react';

export default function Home() {
    const events = Array(8).fill(null).map((_, i) => ({
        id: i,
        title: "San Francisco New Year's Eve Party 2026",
        date: "Wed, Dec 31 • 9:00 PM",
        location: "Fort Mason Center • San Francisco, CA",
        price: "From $45.00",
        organizer: "SF Events"
    }));

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            {/* Hero */}
            <div className="relative h-[360px] md:h-[480px] w-full bg-[#f8f7fa] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    alt="Event banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-none md:rounded-lg shadow-xl max-w-3xl w-full mx-4 text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1e0a3c] mb-4 tracking-tight">
                            Find your next experience
                        </h1>
                        <div className="flex gap-4 justify-center">
                            <Link to="/events">
                                <Button size="lg" className="bg-[#d1410c] hover:bg-[#d1410c]/90 text-white font-semibold px-8 rounded-sm h-12">Explore Events</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Category Tabs */}
                <div className="flex items-center gap-6 overflow-x-auto pb-4 mb-8 border-b border-border/60 no-scrollbar">
                    {['All', 'For you', 'Online', 'Today', 'This weekend', 'Music', 'Food & Drink', 'Charity', 'Education'].map((tab, i) => (
                        <button
                            key={tab}
                            className={`whitespace-nowrap text-sm font-medium pb-4 border-b-2 transition-colors ${i === 0 ? 'text-[#39364f] border-[#39364f]' : 'text-[#6f7287] border-transparent hover:text-[#39364f] hover:border-[#dbdae3]'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-[#1e0a3c]">Events in <span className="text-[#39364f]">San Francisco</span></h2>
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="outline" className="border-border text-[#6f7287] rounded-full h-9 text-sm">
                            Category <ChevronDown className="w-3 h-3 ml-2" />
                        </Button>
                        <Button variant="outline" className="border-border text-[#6f7287] rounded-full h-9 text-sm">
                            Format <ChevronDown className="w-3 h-3 ml-2" />
                        </Button>
                        <Button variant="outline" className="border-border text-[#6f7287] rounded-full h-9 text-sm">
                            Price <ChevronDown className="w-3 h-3 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Event Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {events.map((event) => (
                        <Link to={`/event/${event.id}`} key={event.id} className="group cursor-pointer flex flex-col h-full bg-white transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg overflow-hidden border border-transparent hover:border-border/40 text-left">
                            <div className="relative aspect-[2/1] bg-muted overflow-hidden">
                                <img
                                    src={`https://images.unsplash.com/photo-${1500000000000 + event.id * 1000}?auto=format&fit=crop&w=800&q=80`}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform">
                                        <Heart className="w-4 h-4 text-[#6f7287]" />
                                    </div>
                                    <div className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform">
                                        <Share className="w-4 h-4 text-[#6f7287]" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="font-bold text-[#1e0a3c] text-lg leading-tight mb-1 line-clamp-2 group-hover:underline decoration-[#1e0a3c]">
                                    {event.title}
                                </h3>
                                <p className="text-[#d1410c] font-semibold text-sm mb-3 pt-1">{event.date}</p>
                                <p className="text-[#6f7287] text-sm mb-1 line-clamp-1">{event.location}</p>
                                <p className="text-[#6f7287] text-sm mb-4 line-clamp-1">{event.organizer}</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="font-medium text-[#39364f] text-sm">{event.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link to="/events">
                        <Button variant="outline" size="lg" className="border-[#39364f] text-[#39364f] hover:bg-[#f8f7fa] font-semibold px-12 h-12 rounded-sm">
                            See more
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Simplified Footer */}
            <footer className="bg-[#1e0a3c] text-white py-12 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-[#dbdae3]">&copy; 2025 Eventbrite Clone. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
