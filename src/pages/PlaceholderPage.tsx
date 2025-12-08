import { Construction } from 'lucide-react';

export const PlaceholderPage = ({ title }: { title: string }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in duration-500">
            <div className="p-6 rounded-full bg-primary/10 text-primary mb-6">
                <Construction size={48} />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            <p className="text-muted-foreground max-w-md">
                Esta página está em desenvolvimento. Em breve você terá acesso a todas as funcionalidades do módulo de {title}.
            </p>
        </div>
    );
};
