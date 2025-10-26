import Dashboard from '../Dashboard';

export default function DashboardExample() {
  const mockCampaigns = [
    {
      id: "1",
      name: "Summer Sale Campaign",
      status: "active" as const,
      dailySpend: 3500,
      totalClicks: 1247,
      clickThroughRate: 3.8,
    },
    {
      id: "2",
      name: "Brand Awareness Drive",
      status: "active" as const,
      dailySpend: 5000,
      totalClicks: 2891,
      clickThroughRate: 4.2,
    },
    {
      id: "3",
      name: "Product Launch",
      status: "paused" as const,
      dailySpend: 2000,
      totalClicks: 856,
      clickThroughRate: 2.9,
    },
  ];

  return (
    <Dashboard 
      campaigns={mockCampaigns}
      onCreateCampaign={() => console.log('Create campaign clicked')}
    />
  );
}
