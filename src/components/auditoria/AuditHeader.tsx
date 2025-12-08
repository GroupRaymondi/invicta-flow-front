import { ClipboardList } from 'lucide-react';

export const AuditHeader = () => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <ClipboardList size={24} />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-foreground">Auditoria</h1>
                <p className="text-muted-foreground">Acompanhe todas as ações realizadas no sistema.</p>
            </div>
        </div>
    );
};
