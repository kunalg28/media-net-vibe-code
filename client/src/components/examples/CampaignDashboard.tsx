import CampaignDashboard from '../CampaignDashboard';

export default function CampaignDashboardExample() {
  // Mock data for the last 7 days
  const mockClicksData = [
    { date: 'Jan 20', clicks: 245 },
    { date: 'Jan 21', clicks: 312 },
    { date: 'Jan 22', clicks: 289 },
    { date: 'Jan 23', clicks: 356 },
    { date: 'Jan 24', clicks: 421 },
    { date: 'Jan 25', clicks: 398 },
    { date: 'Jan 26', clicks: 467 },
  ];

  return (
    <CampaignDashboard
      campaignName="Summer Sale Campaign"
      status="active"
      dailySpend={3500}
      totalClicks={2488}
      clickThroughRate={4.2}
      costPerClick={1.41}
      clicksData={mockClicksData}
      onOptimize={() => console.log('Optimize campaign clicked')}
    />
  );
}
