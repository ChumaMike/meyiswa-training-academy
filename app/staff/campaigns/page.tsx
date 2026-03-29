// Marketing — Campaigns
const CAMPAIGNS = [
  { id: 'CA1', name: 'April 2026 Intake', platforms: 'All', status: 'active', posts: 6, startDate: '2026-03-20', endDate: '2026-04-30' },
  { id: 'CA2', name: 'Faculty Spotlight Week', platforms: 'Instagram, Facebook', status: 'planning', posts: 8, startDate: '2026-04-15', endDate: '2026-04-22' },
  { id: 'CA3', name: 'Success Stories Series', platforms: 'All', status: 'active', posts: 3, startDate: '2026-03-15', endDate: '2026-05-15' },
];

export default function MarketingCampaignsPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading font-bold text-white text-2xl mb-2">Campaigns</h1>
      <p className="text-gray-400 text-sm mb-6">{CAMPAIGNS.length} campaigns · {CAMPAIGNS.filter(c => c.status === 'active').length} active</p>

      <div className="space-y-4">
        {CAMPAIGNS.map((campaign) => (
          <div key={campaign.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-white font-semibold">{campaign.name}</h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                campaign.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'
              }`}>
                {campaign.status}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Platforms</p>
                <p className="text-gray-300">{campaign.platforms}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Posts</p>
                <p className="text-gray-300">{campaign.posts} total</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Start</p>
                <p className="text-gray-300">{campaign.startDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">End</p>
                <p className="text-gray-300">{campaign.endDate}</p>
              </div>
            </div>
            <button className="text-mta-gold text-sm hover:underline">View Campaign →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
