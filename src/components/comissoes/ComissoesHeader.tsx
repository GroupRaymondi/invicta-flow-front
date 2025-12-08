import { Briefcase } from 'lucide-react';

export const ComissoesHeader = () => {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Briefcase size={24} />
            </div>
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Comissões</h1>
                <p className="text-muted-foreground">Gerencie e acompanhe as comissões de vendedores e parceiros.</p>
            </div>
        </div>
    );
};
