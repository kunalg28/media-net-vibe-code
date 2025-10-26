import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, HelpCircle, MapPin, Search, Briefcase } from "lucide-react";

interface TargetingFormProps {
  onNext: (data: TargetingData) => void;
  onBack: () => void;
  initialData?: TargetingData;
}

export interface TargetingData {
  location: string;
  audienceTemplate: string;
}

const audienceTemplates = [
  {
    id: "local-shoppers",
    name: "Local Shoppers",
    description: "Target people in your area who are likely to visit your business",
    details: "Best for retail stores, restaurants, and service businesses",
    icon: MapPin,
  },
  {
    id: "online-searchers",
    name: "Online Searchers",
    description: "Reach people who frequently search online and browse similar products",
    details: "Ideal for e-commerce and online service providers",
    icon: Search,
  },
  {
    id: "industry-professionals",
    name: "Industry Professionals",
    description: "Connect with decision-makers and professionals in your industry",
    details: "Perfect for B2B services and professional solutions",
    icon: Briefcase,
  },
];

export default function TargetingForm({ onNext, onBack, initialData }: TargetingFormProps) {
  const [formData, setFormData] = useState<TargetingData>(
    initialData || {
      location: "",
      audienceTemplate: "",
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
          <CardTitle className="text-2xl">Target Your Audience</CardTitle>
          <CardDescription>Define who you want to reach with your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="location">Target Location *</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Specify the geographic area where your ads will be shown. Can be a city, state, or entire country.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="location"
              data-testid="input-location"
              placeholder="e.g., Mumbai, Maharashtra or India"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
            <p className="text-sm text-muted-foreground">
              Enter a city, state, or country to target your ads
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Audience Template *</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Pre-configured audience groups based on common business needs. Select the one that best matches your customers.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose a pre-built audience that matches your target customers
            </p>
            <RadioGroup
              value={formData.audienceTemplate}
              onValueChange={(value) =>
                setFormData({ ...formData, audienceTemplate: value })
              }
              required
            >
              {audienceTemplates.map((template) => {
                const Icon = template.icon;
                const isSelected = formData.audienceTemplate === template.id;
                
                return (
                  <div
                    key={template.id}
                    className={`relative p-5 border-2 rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border'
                    }`}
                    data-testid={`radio-audience-${template.id}`}
                    onClick={() => setFormData({ ...formData, audienceTemplate: template.id })}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <RadioGroupItem 
                          value={template.id} 
                          id={template.id} 
                          className="sr-only" 
                        />
                        <Label htmlFor={template.id} className="cursor-pointer">
                          <div className="font-semibold text-lg flex items-center gap-2 mb-1">
                            {template.name}
                            {isSelected && (
                              <Check className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {template.description}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {template.details}
                          </div>
                        </Label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
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
            <Button type="submit" size="lg" data-testid="button-next">
              Next: Budget
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
