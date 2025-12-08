import { Bell, Info, AlertTriangle, CheckCircle, MessageSquare, Eye } from 'lucide-react';
import type { Announcement } from '../../data/mockCommunity';

interface NoticeCardProps {
    notice: Announcement;
    onClick: (notice: Announcement) => void;
}

export const NoticeCard = ({ notice, onClick }: NoticeCardProps) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'alert': return <AlertTriangle size={18} strokeWidth={1.5} />;
            case 'update': return <Info size={18} strokeWidth={1.5} />;
            case 'news': return <CheckCircle size={18} strokeWidth={1.5} />;
            default: return <Bell size={18} strokeWidth={1.5} />;
        }
    };

    const getColorClass = (type: string) => {
        switch (type) {
            case 'alert': return 'text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10';
            case 'update': return 'text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10';
            case 'news': return 'text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10';
            default: return 'text-primary bg-primary/10';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div
            onClick={() => onClick(notice)}
            className="group bg-white dark:bg-card border border-black/5 dark:border-border/60 rounded-xl p-4 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200 cursor-pointer relative overflow-hidden"
        >
            {notice.isNew && (
                <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm">
                        NOVO
                    </div>
                </div>
            )}

            <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${getColorClass(notice.type)} flex-shrink-0 transition-colors`}>
                    {getIcon(notice.type)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 pr-8">
                        <h3 className="font-bold text-foreground text-base truncate group-hover:text-primary transition-colors">
                            {notice.title}
                        </h3>
                        {notice.priority === 'high' && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-100 dark:border-rose-500/20 flex-shrink-0">
                                Importante
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                        {notice.content}
                    </p>

                    <div className="flex items-center justify-between mt-4 border-t border-border/40 pt-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <span className="text-foreground">{notice.author}</span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/40"></span>
                            <span>{formatDate(notice.date)}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5" title="Visualizações">
                                <Eye size={14} strokeWidth={1.5} />
                                <span>{notice.views}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Comentários">
                                <MessageSquare size={14} strokeWidth={1.5} />
                                <span>{notice.comments?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
