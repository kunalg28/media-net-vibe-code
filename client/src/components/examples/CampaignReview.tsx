import CampaignReview from '../CampaignReview';

export default function CampaignReviewExample() {
  const mockBusinessInfo = {
    businessName: "Acme Coffee Shop",
    websiteUrl: "https://www.acmecoffee.com",
    category: "food",
    campaignGoal: "brand-awareness",
  };

  const mockTargeting = {
    location: "Mumbai, Maharashtra",
    audienceTemplate: "local-shoppers",
  };

  const mockBudget = {
    dailyBudget: 5000,
  };

  return (
    <CampaignReview 
      businessInfo={mockBusinessInfo}
      targeting={mockTargeting}
      budget={mockBudget}
      onEdit={(step) => console.log('Edit step:', step)}
      onLaunch={() => console.log('Launch campaign')}
    />
  );
}
