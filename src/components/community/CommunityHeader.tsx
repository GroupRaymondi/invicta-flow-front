import { Megaphone } from 'lucide-react';

export const CommunityHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <Megaphone className="text-primary" size={32} strokeWidth={1.5} />
                    Comunidade
                </h1>
                <p className="text-muted-foreground">
                    Acompanhe as novidades, recados importantes e comunicações internas da equipe.
                </p>
            </div>
        </div>
    );
};
