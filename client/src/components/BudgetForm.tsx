import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { HelpCircle, Sparkles, TrendingUp } from "lucide-react";

interface BudgetFormProps {
  onNext: (data: BudgetData) => void;
  onBack: () => void;
  initialData?: BudgetData;
}

export interface BudgetData {
  dailyBudget: number;
}

export default function BudgetForm({ onNext, onBack, initialData }: BudgetFormProps) {
  const [dailyBudget, setDailyBudget] = useState(initialData?.dailyBudget || 5000);
  const [estimatedReach, setEstimatedReach] = useState(0);

  const monthlyBudget = dailyBudget * 30;

  // Calculate estimated reach based on budget (simulated AI recommendation)
  useEffect(() => {
    // Average cost per potential customer reach: ₹2-4
    const avgCostPerReach = 3;
    const reach = Math.floor(dailyBudget / avgCostPerReach);
    setEstimatedReach(reach);
  }, [dailyBudget]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ dailyBudget });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-xl border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Set Your Budget</CardTitle>
          <CardDescription>Choose how much you want to spend on your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-base mb-1 flex items-center gap-2">
                  AI Recommendation
                </h4>
                <p className="text-sm text-muted-foreground">
                  Based on your category and location, we recommend{" "}
                  <span className="font-bold text-foreground">{formatCurrency(dailyBudget)}/day</span>{" "}
                  to reach{" "}
                  <span className="font-bold text-foreground">{formatNumber(estimatedReach)}</span>{" "}
                  potential customers daily.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-2">
                  <Label htmlFor="daily-budget" className="text-base">Daily Budget</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">The maximum amount you'll spend per day. Your ads will stop showing once this limit is reached.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-3xl font-bold text-primary tabular-nums" data-testid="text-daily-budget">
                  {formatCurrency(dailyBudget)}
                </span>
              </div>
              
              <div className="relative px-2">
                <Slider
                  id="daily-budget"
                  data-testid="slider-daily-budget"
                  min={1000}
                  max={50000}
                  step={500}
                  value={[dailyBudget]}
                  onValueChange={(value) => setDailyBudget(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹1,000</span>
                  <span>₹10,000</span>
                  <span>₹20,000</span>
                  <span>₹30,000</span>
                  <span>₹40,000</span>
                  <span>₹50,000</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Your ads will run throughout the day until your daily budget is reached
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/30 rounded-lg p-6 space-y-3 border-2 border-primary/30 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Monthly Budget Projection
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Projected total spending if you run the campaign for a full month (30 days).</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tabular-nums text-primary" data-testid="text-monthly-budget">
                  {formatCurrency(monthlyBudget)}
                </span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-primary/20">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Daily Budget</p>
                  <p className="font-semibold tabular-nums">{formatCurrency(dailyBudget)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Est. Monthly Reach</p>
                  <p className="font-semibold tabular-nums">{formatNumber(estimatedReach * 30)}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 rounded-lg p-4">
              <h4 className="font-semibold mb-3">What you'll get:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Flexible daily spending control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Pause or adjust your budget anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Real-time performance tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Only pay for actual clicks and impressions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              data-testid="button-back"
            >
              Back
            </Button>
            <Button type="submit" size="lg" data-testid="button-review">
              Review Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
