import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, MousePointerClick, Target, IndianRupee } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  dailySpend: number;
  totalClicks: number;
  clickThroughRate: number;
}

interface DashboardProps {
  campaigns: Campaign[];
  onCreateCampaign: () => void;
}

export default function Dashboard({ campaigns, onCreateCampaign }: DashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalSpend = campaigns.reduce((sum, c) => sum + c.dailySpend, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.totalClicks, 0);
  const avgCTR = campaigns.length > 0
    ? campaigns.reduce((sum, c) => sum + c.clickThroughRate, 0) / campaigns.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">Campaign Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage your advertising campaigns
            </p>
          </div>
          <Button size="lg" onClick={onCreateCampaign} data-testid="button-create-campaign">
            <Plus className="w-4 h-4 mr-2" />
            Create New Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Total Campaigns
              </CardTitle>
              <Target className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" data-testid="text-total-campaigns">
                {campaigns.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Active advertising campaigns
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Total Daily Spend
              </CardTitle>
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums text-primary" data-testid="text-total-spend">
                {formatCurrency(totalSpend)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all campaigns
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Total Clicks
              </CardTitle>
              <MousePointerClick className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" data-testid="text-total-clicks">
                {totalClicks.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Avg CTR
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" data-testid="text-avg-ctr">
                {avgCTR.toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Click-through rate
              </p>
            </CardContent>
          </Card>
        </div>

        {campaigns.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-6">
                  Get started by creating your first advertising campaign
                </p>
                <Button size="lg" onClick={onCreateCampaign} data-testid="button-create-first">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Campaigns</h2>
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover-elevate" data-testid={`card-campaign-${campaign.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg" data-testid={`text-campaign-name-${campaign.id}`}>
                          {campaign.name}
                        </h3>
                        <Badge
                          variant={campaign.status === "active" ? "default" : "secondary"}
                          data-testid={`badge-status-${campaign.id}`}
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 md:gap-8">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                          Daily Spend
                        </div>
                        <div className="font-bold tabular-nums" data-testid={`text-spend-${campaign.id}`}>
                          {formatCurrency(campaign.dailySpend)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                          Clicks
                        </div>
                        <div className="font-bold tabular-nums" data-testid={`text-clicks-${campaign.id}`}>
                          {campaign.totalClicks.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                          CTR
                        </div>
                        <div className="font-bold tabular-nums" data-testid={`text-ctr-${campaign.id}`}>
                          {campaign.clickThroughRate.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
