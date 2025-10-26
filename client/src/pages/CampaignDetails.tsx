import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import CampaignDashboard from "@/components/CampaignDashboard";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  businessName: string;
  status: "active" | "paused";
  dailySpend: number;
  totalClicks: number;
  clickThroughRate: string;
}

export default function CampaignDetails() {
  const [, params] = useRoute("/campaign/:id");
  const { toast } = useToast();

  const { data: campaign, isLoading } = useQuery<Campaign>({
    queryKey: ['/api/campaigns', params?.id],
    enabled: !!params?.id,
  });

  // Generate mock data for the last 7 days based on total clicks
  const generateClicksData = (totalClicks: number) => {
    const today = new Date();
    const data = [];
    const avgClicksPerDay = Math.floor(totalClicks / 7);
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const clicks = Math.floor(avgClicksPerDay * (0.8 + Math.random() * 0.4));
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        clicks,
      });
    }
    return data;
  };

  const handleOptimize = () => {
    toast({
      title: "Optimization Started",
      description: "AI is analyzing your campaign to improve performance.",
    });
  };

  if (isLoading || !campaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading campaign...</p>
        </div>
      </div>
    );
  }

  const clicksData = generateClicksData(campaign.totalClicks);
  const costPerClick = campaign.dailySpend / (campaign.totalClicks / 7);

  return (
    <CampaignDashboard
      campaignName={campaign.businessName}
      status={campaign.status}
      dailySpend={campaign.dailySpend}
      totalClicks={campaign.totalClicks}
      clickThroughRate={parseFloat(campaign.clickThroughRate)}
      costPerClick={costPerClick}
      clicksData={clicksData}
      onOptimize={handleOptimize}
    />
  );
}
