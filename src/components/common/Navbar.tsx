import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-background border-b border-border h-16 flex items-center shadow-sm">
            <div className="container mx-auto px-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="text-[#f05537] font-bold text-2xl tracking-tight">
                    nexus
                </Link>

                {/* Search Bar (Hidden on mobile) */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search events"
                        className="w-full h-10 pl-10 pr-4 rounded-full border border-input bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>

                {/* Links */}
                <div className="flex items-center gap-6">
                    <Link to="/events" className="hidden md:block text-sm font-medium text-foreground/80 hover:text-foreground">
                        Find Events
                    </Link>
                    <Link to="/create-event" className="hidden md:block text-sm font-medium text-foreground/80 hover:text-foreground">
                        Create Events
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link to="/signin" className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2">
                            Log In
                        </Link>
                        <Link to="/signup">
                            <Button variant="ghost" className="hidden sm:inline-flex font-medium">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
