import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Rocket } from "lucide-react";
import type { BusinessInfoData } from "./BusinessInfoForm";
import type { TargetingData } from "./TargetingForm";
import type { BudgetData } from "./BudgetForm";

interface CampaignReviewProps {
  businessInfo: BusinessInfoData;
  targeting: TargetingData;
  budget: BudgetData;
  onEdit: (step: number) => void;
  onLaunch: () => void;
}

const categoryLabels: Record<string, string> = {
  retail: "Retail & E-commerce",
  food: "Food & Beverage",
  services: "Professional Services",
  health: "Health & Wellness",
  tech: "Technology & Software",
  education: "Education & Training",
  "real-estate": "Real Estate",
  finance: "Finance & Insurance",
  entertainment: "Entertainment & Events",
  automotive: "Automotive",
  travel: "Travel & Hospitality",
  other: "Other",
};

const goalLabels: Record<string, string> = {
  "brand-awareness": "Brand Awareness",
  "lead-generation": "Lead Generation",
  sales: "Sales & Conversions",
};

const audienceLabels: Record<string, string> = {
  "local-shoppers": "Local Shoppers",
  "online-searchers": "Online Searchers",
  "industry-professionals": "Industry Professionals",
};

export default function CampaignReview({
  businessInfo,
  targeting,
  budget,
  onEdit,
  onLaunch,
}: CampaignReviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">Review Your Campaign</h1>
        <p className="text-muted-foreground">
          Check your campaign details before launching
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg">Business Information</CardTitle>
              <CardDescription>Your business details and campaign goal</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              data-testid="button-edit-business"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Business Name</div>
              <div className="font-medium" data-testid="text-business-name">{businessInfo.businessName}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Website URL</div>
              <div className="font-medium text-primary truncate" data-testid="text-website">
                {businessInfo.websiteUrl}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Category</div>
              <Badge variant="secondary" data-testid="badge-category">
                {categoryLabels[businessInfo.category] || businessInfo.category}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Campaign Goal</div>
              <Badge variant="secondary" data-testid="badge-goal">
                {goalLabels[businessInfo.campaignGoal] || businessInfo.campaignGoal}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg">Targeting</CardTitle>
              <CardDescription>Location and audience settings</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              data-testid="button-edit-targeting"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Target Location</div>
              <div className="font-medium" data-testid="text-location">{targeting.location}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Audience</div>
              <Badge variant="secondary" data-testid="badge-audience">
                {audienceLabels[targeting.audienceTemplate] || targeting.audienceTemplate}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg">Budget</CardTitle>
              <CardDescription>Your advertising budget</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(3)}
              data-testid="button-edit-budget"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Daily Budget</div>
              <div className="text-2xl font-bold text-primary tabular-nums" data-testid="text-daily-budget">
                {formatCurrency(budget.dailyBudget)}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Monthly Budget (Est.)</div>
              <div className="text-2xl font-bold tabular-nums" data-testid="text-monthly-budget">
                {formatCurrency(budget.dailyBudget * 30)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Ready to launch your campaign?</h3>
              <p className="text-sm text-muted-foreground">
                Your campaign will start running immediately after launch
              </p>
            </div>
            <Button
              size="lg"
              onClick={onLaunch}
              className="w-full md:w-auto"
              data-testid="button-launch"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Launch Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
