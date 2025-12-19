import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Share, Heart } from 'lucide-react';

export default function EventDetails() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            {/* Background Blur */}
            <div className="relative h-[360px] md:h-[480px] w-full bg-[#f8f7fa] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    alt="Event banner"
                    className="w-full h-full object-cover blur-sm opacity-50 absolute"
                />

                <div className="relative container mx-auto px-4 h-full flex items-end pb-8 md:pb-12 z-10">
                    <div className="w-full max-w-5xl mx-auto">
                        <div className="relative aspect-[3/1] md:aspect-[4/1] bg-muted rounded-xl overflow-hidden shadow-2xl mb-6 hidden md:block border border-white/20">
                            <img
                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                                alt="Event banner"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl relative -mt-20 md:-mt-8 z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-[#f05537]/10 text-[#f05537] text-sm font-bold rounded-sm mb-4">
                                DEC 31
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e0a3c] mb-4">San Francisco New Year's Eve Party 2026</h1>
                            <p className="text-lg text-[#39364f]">Hosted by <span className="font-bold text-[#d1410c]">SF Events</span></p>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-border/60 shadow-sm md:hidden">
                            <h3 className="font-bold text-lg mb-4 text-[#1e0a3c]">Date & Time</h3>
                            <div className="flex items-start gap-4 mb-6">
                                <Calendar className="w-5 h-5 text-[#d1410c] mt-1" />
                                <div>
                                    <p className="font-semibold text-[#39364f]">Wednesday, December 31, 2025</p>
                                    <p className="text-[#6f7287]">9:00 PM - 2:00 AM PST</p>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg mb-4 text-[#1e0a3c]">Location</h3>
                            <div className="flex items-start gap-4 mb-6">
                                <MapPin className="w-5 h-5 text-[#d1410c] mt-1" />
                                <div>
                                    <p className="font-semibold text-[#39364f]">Fort Mason Center</p>
                                    <p className="text-[#6f7287]">2 Marina Blvd, San Francisco, CA 94123</p>
                                </div>
                            </div>

                            <Button size="lg" className="w-full bg-[#d1410c] hover:bg-[#d1410c]/90 h-12 text-lg" onClick={() => alert("Ticket selection modal would open here!")}>Get Tickets</Button>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[#1e0a3c]">About this event</h2>
                            <div className="prose text-[#39364f] leading-relaxed">
                                <p>Join us for the most exclusive New Year's Eve celebration in San Francisco! Experience a night of luxury, music, and celebration as we ring in 2026 at the historic Fort Mason Center.</p>
                                <p>Featuring:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Open Bar from 9 PM - 2 AM</li>
                                    <li>World-class DJs and Live Entertainment</li>
                                    <li>Spectacular view of the Fireworks</li>
                                    <li>Champagne Toast at Midnight</li>
                                </ul>
                                <p>Don't miss out on the event of the year. Tickets are limited and prices will increase as we get closer to the date.</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="hidden md:block">
                        <div className="sticky top-24 bg-white p-6 rounded-lg border border-border/60 shadow-lg">
                            <p className="text-[#39364f] font-medium mb-4">Tickets start at <span className="font-bold text-xl text-[#1e0a3c]">$45.00</span></p>
                            <Button size="lg" className="w-full bg-[#d1410c] hover:bg-[#d1410c]/90 h-12 text-lg font-semibold mb-6">Get Tickets</Button>

                            <div className="space-y-4 pt-6 border-t border-border/60">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-[#39364f]" />
                                    <div>
                                        <p className="font-semibold text-[#39364f] text-sm">Wed, Dec 31</p>
                                        <p className="text-[#6f7287] text-sm">9:00 PM - 2:00 AM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#39364f]" />
                                    <div>
                                        <p className="font-semibold text-[#39364f] text-sm">Fort Mason Center</p>
                                        <p className="text-[#6f7287] text-sm">San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6 pt-6 border-t border-border/60 justify-center">
                                <Button variant="ghost" size="icon" className="text-[#39364f] hover:text-[#d1410c] hover:bg-[#f05537]/10"><Heart className="w-5 h-5" /></Button>
                                <Button variant="ghost" size="icon" className="text-[#39364f] hover:text-[#d1410c] hover:bg-[#f05537]/10"><Share className="w-5 h-5" /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
