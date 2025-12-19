import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AmenagementFoncierPage from "./pages/services/AmenagementFoncierPage";
import AmenagementForestierPage from "./pages/services/AmenagementForestierPage";
import BtpPage from "./pages/services/BtpPage";
import TopographiePage from "./pages/services/TopographiePage";
import GeomatiquePage from "./pages/services/GeomatiquePage";
import InformatiquePage from "./pages/services/InformatiquePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/amenagement-foncier" element={<AmenagementFoncierPage />} />
          <Route path="/services/amenagement-forestier" element={<AmenagementForestierPage />} />
          <Route path="/services/btp" element={<BtpPage />} />
          <Route path="/services/topographie" element={<TopographiePage />} />
          <Route path="/services/geomatique" element={<GeomatiquePage />} />
          <Route path="/services/informatique" element={<InformatiquePage />} />
          <Route path="/projets" element={<ProjectsPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/actualites" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
