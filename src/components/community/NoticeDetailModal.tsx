import { X, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Announcement, Comment } from '../../data/mockCommunity';

interface NoticeDetailModalProps {
    notice: Announcement | null;
    onClose: () => void;
}

export const NoticeDetailModal = ({ notice, onClose }: NoticeDetailModalProps) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (notice?.comments) {
            setComments(notice.comments);
        } else {
            setComments([]);
        }
        setCommentText('');
    }, [notice]);

    if (!notice) return null;

    const handleAddComment = () => {
        if (!commentText.trim()) return;

        const newComment: Comment = {
            id: Math.random().toString(36).substr(2, 9),
            author: 'Você', // In a real app, this would come from auth context
            date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
            message: commentText
        };

        setComments([newComment, ...comments]);
        setCommentText('');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl bg-white dark:bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        {notice.priority === 'high' && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-md border border-rose-100 dark:border-rose-500/20">
                                Importante
                            </span>
                        )}
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md capitalize">
                            {notice.type === 'news' ? 'Novidade' : notice.type === 'alert' ? 'Alerta' : 'Atualização'}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{notice.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <span className="font-medium text-foreground">{notice.author}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40"></span>
                        <span>{formatDate(notice.date)}</span>
                    </div>

                    <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
                        {notice.content}
                    </div>

                    {/* Comments Section */}
                    <div className="border-t border-border/40 pt-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Comentários da Equipe</h3>

                        <div className="flex gap-3 mb-6">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="flex-1 min-h-[80px] p-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                placeholder="Escreva um comentário..."
                            />
                            <button
                                onClick={handleAddComment}
                                disabled={!commentText.trim()}
                                className="self-end p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="bg-muted/30 rounded-xl p-4 border border-border/40">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-sm text-foreground">{comment.author}</span>
                                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{comment.message}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-sm text-muted-foreground py-4">
                                    Nenhum comentário ainda. Seja o primeiro a comentar!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
