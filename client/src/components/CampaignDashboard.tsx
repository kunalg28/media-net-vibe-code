import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, MousePointerClick, TrendingUp, DollarSign, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CampaignDashboardProps {
  campaignName: string;
  status: "active" | "paused";
  dailySpend: number;
  totalClicks: number;
  clickThroughRate: number;
  costPerClick: number;
  clicksData: Array<{ date: string; clicks: number }>;
  onOptimize: () => void;
}

export default function CampaignDashboard({
  campaignName,
  status,
  dailySpend,
  totalClicks,
  clickThroughRate,
  costPerClick,
  clicksData,
  onOptimize,
}: CampaignDashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-semibold" data-testid="text-campaign-name">
              {campaignName}
            </h1>
            <Badge
              variant={status === "active" ? "default" : "secondary"}
              className="text-base px-4 py-1 w-fit"
              data-testid="badge-status"
            >
              {status === "active" ? "Active" : "Paused"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Monitor your campaign performance and track key metrics
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Daily Spend
              </CardTitle>
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary tabular-nums" data-testid="text-daily-spend">
                {formatCurrency(dailySpend)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Current spending rate
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
                Last 7 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Click-Through Rate
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tabular-nums" data-testid="text-ctr">
                {clickThroughRate.toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Engagement rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Cost Per Click
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary tabular-nums" data-testid="text-cpc">
                {formatCurrency(costPerClick)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Average CPC
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Clicks Over Time</CardTitle>
            <p className="text-sm text-muted-foreground">
              Daily click performance for the last 7 days
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80" data-testid="chart-clicks">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clicksData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Optimize Button */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Ready to improve your results?
                </h3>
                <p className="text-muted-foreground">
                  Use AI-powered optimization to maximize your campaign performance
                </p>
              </div>
              <Button
                size="lg"
                onClick={onOptimize}
                className="w-full md:w-auto"
                data-testid="button-optimize"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Optimize Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
