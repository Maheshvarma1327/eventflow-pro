import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar, Music, Code, Briefcase, Camera, Mic, Ticket } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-border/10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold font-['Orbitron']">
                            N
                        </div>
                        <span className="font-bold text-xl tracking-wide font-['Orbitron']">NEXUS</span>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/events" className="text-sm font-medium hover:text-primary transition-colors">Find Events</Link>
                        <Link to="/organizer" className="text-sm font-medium hover:text-primary transition-colors">Create Events</Link>
                        <Link to="/help" className="text-sm font-medium hover:text-primary transition-colors">Help Center</Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-['Orbitron']">
                        Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Extraordinary</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Nexus connects you with the most immersive events, workshops, and experiences in your city.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto glass rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-3 shadow-glow border border-primary/20">
                        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-xl border border-transparent focus-within:border-primary/50 transition-colors">
                            <Search className="w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search events, categories, artists..."
                                className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-xl border border-transparent focus-within:border-primary/50 transition-colors">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="City or zip code"
                                className="bg-transparent border-none outline-none w-full text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <Button size="lg" className="h-auto py-3 px-8 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                            Find Events
                        </Button>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <section className="py-12 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold font-['Orbitron']">Browse by Category</h2>
                        <Link to="/events" className="text-primary hover:underline">View all</Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {[
                            { icon: Music, label: 'Music' },
                            { icon: Code, label: 'Tech' },
                            { icon: Briefcase, label: 'Business' },
                            { icon: Camera, label: 'Arts' },
                            { icon: Mic, label: 'Comedy' },
                            { icon: Calendar, label: 'Workshops' },
                            { icon: Ticket, label: 'Nightlife' },
                            { icon: MapPin, label: 'Local' },
                        ].map((cat, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10 group-hover:border-primary/30">
                                    <cat.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                    <span className="font-medium text-sm text-foreground/80 group-hover:text-foreground">{cat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events Layout (Eventbrite style) */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold font-['Orbitron'] mb-8">Trending in <span className="text-primary">San Francisco</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div key={item} className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer" onClick={() => navigate('/events')}>
                                <div className="aspect-[3/2] bg-muted relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-none">View Details</Button>
                                    </div>
                                    {/* Placeholder for event image */}
                                    <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
                                        <Calendar className="w-12 h-12 opacity-20" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">Future Tech Summit 2025</h3>
                                    <div className="text-sm text-primary font-medium mb-1">Sat, Dec 14 • 10:00 AM</div>
                                    <div className="text-sm text-muted-foreground">Moscone Center, SF</div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="font-semibold text-foreground">$299</span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">Selling Fast</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 hover:text-primary">
                            See more events
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-card border-t border-border py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs font-['Orbitron']">N</div>
                                <span className="font-bold text-lg tracking-wide font-['Orbitron']">NEXUS</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Reimagining how the world connects through live experiences.
                            </p>
                        </div>

                        {[
                            { title: "Use Nexus", links: ["Create Events", "Pricing", "Content Standards", "FAQs"] },
                            { title: "Discover", links: ["Music", "Tech", "Workshops", "Online Events"] },
                            { title: "Company", links: ["About Us", "Careers", "Blog", "Contact"] }
                        ].map((col, i) => (
                            <div key={i}>
                                <h4 className="font-bold mb-4">{col.title}</h4>
                                <ul className="space-y-2">
                                    {col.links.map((link) => (
                                        <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8 border-t border-border/50 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                        <p>&copy; 2025 Nexus Inc. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <a href="#" className="hover:text-foreground">Privacy</a>
                            <a href="#" className="hover:text-foreground">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
