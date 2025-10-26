import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HelpCircle } from "lucide-react";

interface BusinessInfoFormProps {
  onNext: (data: BusinessInfoData) => void;
  initialData?: BusinessInfoData;
}

export interface BusinessInfoData {
  businessName: string;
  websiteUrl: string;
  category: string;
  campaignGoal: string;
}

export default function BusinessInfoForm({ onNext, initialData }: BusinessInfoFormProps) {
  const [formData, setFormData] = useState<BusinessInfoData>(
    initialData || {
      businessName: "",
      websiteUrl: "",
      category: "",
      campaignGoal: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-xl border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Business Information</CardTitle>
          <CardDescription>Tell us about your business and campaign goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">The name of your business as it will appear in your ads</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="businessName"
              data-testid="input-business-name"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="websiteUrl">Website URL *</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Your website address where customers will be directed when they click your ad</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="websiteUrl"
              data-testid="input-website-url"
              type="url"
              placeholder="https://www.example.com"
              value={formData.websiteUrl}
              onChange={(e) =>
                setFormData({ ...formData, websiteUrl: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="category">Business Category *</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Select the industry that best describes your business. This helps us optimize your ad placement.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
            >
              <SelectTrigger id="category" data-testid="select-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail & E-commerce</SelectItem>
                <SelectItem value="food">Food & Beverage</SelectItem>
                <SelectItem value="services">Professional Services</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="tech">Technology & Software</SelectItem>
                <SelectItem value="education">Education & Training</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="finance">Finance & Insurance</SelectItem>
                <SelectItem value="entertainment">Entertainment & Events</SelectItem>
                <SelectItem value="automotive">Automotive</SelectItem>
                <SelectItem value="travel">Travel & Hospitality</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Campaign Goal *</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">What is your primary objective? This determines how we optimize your campaign performance.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <RadioGroup
              value={formData.campaignGoal}
              onValueChange={(value) =>
                setFormData({ ...formData, campaignGoal: value })
              }
              required
            >
              <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover-elevate active-elevate-2 cursor-pointer"
                data-testid="radio-brand-awareness">
                <RadioGroupItem value="brand-awareness" id="brand-awareness" />
                <Label htmlFor="brand-awareness" className="cursor-pointer flex-1">
                  <div className="font-semibold">Brand Awareness</div>
                  <div className="text-sm text-muted-foreground">
                    Reach more people and increase visibility
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover-elevate active-elevate-2 cursor-pointer"
                data-testid="radio-lead-generation">
                <RadioGroupItem value="lead-generation" id="lead-generation" />
                <Label htmlFor="lead-generation" className="cursor-pointer flex-1">
                  <div className="font-semibold">Lead Generation</div>
                  <div className="text-sm text-muted-foreground">
                    Collect leads and grow your customer base
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border-2 rounded-lg hover-elevate active-elevate-2 cursor-pointer"
                data-testid="radio-sales">
                <RadioGroupItem value="sales" id="sales" />
                <Label htmlFor="sales" className="cursor-pointer flex-1">
                  <div className="font-semibold">Sales & Conversions</div>
                  <div className="text-sm text-muted-foreground">
                    Drive sales and increase revenue
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end pt-6 border-t">
            <Button type="submit" size="lg" data-testid="button-next">
              Next: Targeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
