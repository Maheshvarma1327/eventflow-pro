import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { ChevronDown, Heart, Share, SlidersHorizontal } from 'lucide-react';

export default function Events() {
  const events = Array(12).fill(null).map((_, i) => ({
    id: i,
    title: i % 2 === 0 ? "Tech Conference 2025" : "Music Festival Weekend",
    date: "Fri, Dec 12 • 7:00 PM",
    location: "San Francisco, CA",
    price: i % 3 === 0 ? "Free" : "From $25.00",
    organizer: "Nexus Events"
  }));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex items-start gap-8">
        {/* Sidebar Filters (Hidden on mobile) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-[#1e0a3c] mb-4">Category</h3>
            <div className="space-y-2">
              {['Music', 'Business', 'Food & Drink', 'Community', 'Arts', 'Film', 'Sports', 'Health'].map(cat => (
                <label key={cat} className="flex items-center gap-3 text-sm text-[#39364f] hover:text-[#1e0a3c] cursor-pointer group">
                  <input type="checkbox" className="rounded border-gray-300 text-[#d1410c] focus:ring-[#d1410c]" />
                  <span className="group-hover:underline">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#1e0a3c] mb-4">Format</h3>
            <div className="space-y-2">
              {['Class', 'Conference', 'Festival', 'Party', 'Appearance', 'Gala'].map(fmt => (
                <label key={fmt} className="flex items-center gap-3 text-sm text-[#39364f] hover:text-[#1e0a3c] cursor-pointer group">
                  <input type="checkbox" className="rounded border-gray-300 text-[#d1410c] focus:ring-[#d1410c]" />
                  <span className="group-hover:underline">{fmt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#1e0a3c] mb-4">Price</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm text-[#39364f] cursor-pointer"><input type="checkbox" /> Free</label>
              <label className="flex items-center gap-3 text-sm text-[#39364f] cursor-pointer"><input type="checkbox" /> Paid</label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-[#1e0a3c]">Events in San Francisco <span className="text-sm font-normal text-muted-foreground ml-2">245 events</span></h1>
            <Button variant="outline" className="lg:hidden">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="group cursor-pointer flex flex-col bg-white hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-border/40">
                <div className="aspect-[2/1] bg-muted relative overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${1510000000000 + event.id * 500}?auto=format&fit=crop&w=800&q=80`}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <p className="text-[#d1410c] font-semibold text-sm mb-2">{event.date}</p>
                  <p className="text-[#6f7287] text-sm mb-1">{event.location}</p>
                  <p className="text-[#6f7287] text-sm mb-4">{event.organizer}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-medium text-[#39364f] text-sm">{event.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="ghost" className="text-[#39364f]">Load More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
