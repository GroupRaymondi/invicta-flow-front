import { Bell } from 'lucide-react';
import { useState } from 'react';
import type { Announcement } from '../../data/mockCommunity';
import { NoticeCard } from './NoticeCard';
import { NoticeDetailModal } from './NoticeDetailModal';

interface AnnouncementsListProps {
    announcements: Announcement[];
}

export const AnnouncementsList = ({ announcements }: AnnouncementsListProps) => {
    const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                        <Bell size={20} className="text-primary" strokeWidth={1.5} />
                        Mural de Avisos
                    </h2>
                    <span className="text-xs font-medium px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-md">
                        {announcements.length} novos
                    </span>
                </div>

                <div className="space-y-4">
                    {announcements.map((item) => (
                        <NoticeCard
                            key={item.id}
                            notice={item}
                            onClick={setSelectedNotice}
                        />
                    ))}
                </div>
            </div>

            <NoticeDetailModal
                notice={selectedNotice}
                onClose={() => setSelectedNotice(null)}
            />
        </>
    );
};
