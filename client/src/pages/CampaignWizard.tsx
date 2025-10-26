import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import WizardProgress from "@/components/WizardProgress";
import BusinessInfoForm, { type BusinessInfoData } from "@/components/BusinessInfoForm";
import TargetingForm, { type TargetingData } from "@/components/TargetingForm";
import BudgetForm, { type BudgetData } from "@/components/BudgetForm";

export default function CampaignWizard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoData | null>(null);
  const [targeting, setTargeting] = useState<TargetingData | null>(null);

  const steps = ["Business Info", "Targeting", "Budget"];

  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: BusinessInfoData & TargetingData & BudgetData) => {
      const res = await apiRequest("POST", "/api/campaigns", campaignData);
      return res.json();
    },
    onSuccess: () => {
      // Invalidate campaigns cache so dashboard shows the new campaign
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      
      toast({
        title: "Campaign Created Successfully!",
        description: "Your campaign is now live and running.",
      });
      setTimeout(() => {
        setLocation("/dashboard");
      }, 1500);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Create Campaign",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleBusinessInfoNext = (data: BusinessInfoData) => {
    setBusinessInfo(data);
    setCurrentStep(2);
  };

  const handleTargetingNext = (data: TargetingData) => {
    setTargeting(data);
    setCurrentStep(3);
  };

  const handleBudgetNext = (data: BudgetData) => {
    if (businessInfo && targeting) {
      const campaignData = {
        ...businessInfo,
        ...targeting,
        ...data,
      };
      createCampaignMutation.mutate(campaignData);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <WizardProgress currentStep={currentStep} steps={steps} />
      
      {currentStep === 1 && (
        <BusinessInfoForm 
          onNext={handleBusinessInfoNext} 
          initialData={businessInfo || undefined}
        />
      )}
      
      {currentStep === 2 && (
        <TargetingForm
          onNext={handleTargetingNext}
          onBack={() => setCurrentStep(1)}
          initialData={targeting || undefined}
        />
      )}
      
      {currentStep === 3 && (
        <BudgetForm
          onNext={handleBudgetNext}
          onBack={() => setCurrentStep(2)}
          initialData={undefined}
        />
      )}
    </div>
  );
}
