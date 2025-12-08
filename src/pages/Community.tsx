import { CommunityHeader } from '../components/community/CommunityHeader';
import { CreatePostBlock } from '../components/community/CreatePostBlock';
import { AnnouncementsList } from '../components/community/AnnouncementsList';
import { TopSellersLeaderboard } from '../components/community/TopSellersLeaderboard';
import { mockAnnouncements, mockTopSellers } from '../data/mockCommunity';

export const Community = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-7xl mx-auto">
            <CommunityHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Create Post & Announcements (2/3 width) */}
                <div className="lg:col-span-2 space-y-8">
                    <CreatePostBlock />
                    <AnnouncementsList announcements={mockAnnouncements} />
                </div>

                {/* Right Column: Top Sellers (1/3 width) */}
                <div className="lg:col-span-1">
                    <TopSellersLeaderboard sellers={mockTopSellers} />
                </div>
            </div>
        </div>
    );
};
