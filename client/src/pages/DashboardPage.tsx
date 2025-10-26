import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Dashboard from "@/components/Dashboard";

interface Campaign {
  id: string;
  businessName: string;
  status: "active" | "paused";
  dailySpend: number;
  totalClicks: number;
  clickThroughRate: string;
}

export default function DashboardPage() {
  const [, setLocation] = useLocation();

  const { data: campaigns = [], isLoading } = useQuery<Campaign[]>({
    queryKey: ['/api/campaigns'],
  });

  const formattedCampaigns = campaigns.map(campaign => ({
    id: campaign.id,
    name: campaign.businessName,
    status: campaign.status as "active" | "paused",
    dailySpend: campaign.dailySpend,
    totalClicks: campaign.totalClicks,
    clickThroughRate: parseFloat(campaign.clickThroughRate),
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <Dashboard
      campaigns={formattedCampaigns}
      onCreateCampaign={() => setLocation("/campaign/wizard")}
    />
  );
}
