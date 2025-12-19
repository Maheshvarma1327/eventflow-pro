import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Upload } from 'lucide-react';

export default function CreateEvent() {
    return (
        <div className="min-h-screen bg-[#f8f7fa] font-sans text-[#1e0a3c]">
            <Navbar />

            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold mb-2">Create an Event</h1>
                    <p className="text-[#6f7287]">Fill in the details below to publish your event.</p>
                </div>

                <div className="space-y-8">
                    {/* Step 1: Basic Info */}
                    <section className="bg-white p-8 rounded-lg border border-border/60 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/60">
                            <div className="w-8 h-8 rounded-full bg-[#d1410c] text-white flex items-center justify-center font-bold">1</div>
                            <h2 className="text-xl font-bold">Basic Info</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Event Title</label>
                                <Input placeholder="Be clear and descriptive" className="h-12 text-lg" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Organizer</label>
                                    <Input placeholder="Who is hosting?" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Category</label>
                                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                                        <option>Select a category</option>
                                        <option>Music</option>
                                        <option>Business</option>
                                        <option>Food & Drink</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Step 2: Location & Time */}
                    <section className="bg-white p-8 rounded-lg border border-border/60 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/60">
                            <div className="w-8 h-8 rounded-full bg-[#d1410c] text-white flex items-center justify-center font-bold">2</div>
                            <h2 className="text-xl font-bold">Location & Time</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Venue Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <Input className="pl-10" placeholder="Search for a venue or address" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Start Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" type="date" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Start Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" type="time" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Step 3: Media */}
                    <section className="bg-white p-8 rounded-lg border border-border/60 shadow-sm">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border/60">
                            <div className="w-8 h-8 rounded-full bg-[#d1410c] text-white flex items-center justify-center font-bold">3</div>
                            <h2 className="text-xl font-bold">Event Media</h2>
                        </div>

                        <div className="mt-4">
                            <label className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition-colors relative">
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        alert(`File selected: ${e.target.files[0].name}`);
                                    }
                                }} />
                                <Upload className="h-12 w-12 text-[#d1410c] mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Click to Upload Event Image</h3>
                                <p className="text-sm text-muted-foreground max-w-xs">High quality images work best. We recommend using a 2:1 ratio image.</p>
                            </label>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-semibold mb-2">Description</label>
                            <Textarea placeholder="Tell people what makes your event special..." className="min-h-[150px]" />
                        </div>
                    </section>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outline" size="lg">Save Draft</Button>
                        <Button size="lg" className="bg-[#d1410c] hover:bg-[#d1410c]/90 px-8">Publish Event</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
