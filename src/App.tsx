import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Agenda from "./pages/Agenda";
import Venues from "./pages/Venues";
import Tickets from "./pages/Tickets";
import Attendees from "./pages/Attendees";
import Checkin from "./pages/Checkin";
import Digital from "./pages/Digital";
import Networking from "./pages/Networking";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/attendees" element={<Attendees />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/digital" element={<Digital />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
