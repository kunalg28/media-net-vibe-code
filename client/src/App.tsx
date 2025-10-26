import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import CampaignWizard from "@/pages/CampaignWizard";
import Review from "@/pages/Review";
import DashboardPage from "@/pages/DashboardPage";
import CampaignDetails from "@/pages/CampaignDetails";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/campaign/wizard" component={CampaignWizard} />
      <Route path="/campaign/review" component={Review} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/campaign/:id" component={CampaignDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
