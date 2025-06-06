
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewReport from "./pages/NewReport";
import Development from "./pages/Development";
import DevelopmentDetail from "./pages/DevelopmentDetail";
import Requirements from "./pages/Requirements";
import RequirementDetail from "./pages/RequirementDetail";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";
import Department from "./pages/Department";
import Personal from "./pages/Personal";
import ProjectBoard from "./pages/ProjectBoard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/new-report" element={<NewReport />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/requirements/:id" element={<RequirementDetail />} />
          <Route path="/development" element={<Development />} />
          <Route path="/development/:id" element={<DevelopmentDetail />} />
          <Route path="/project-board" element={<ProjectBoard />} />
          <Route path="/roadmap/:id" element={<Roadmap />} />
          <Route path="/department" element={<Department />} />
          <Route path="/personal" element={<Personal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
