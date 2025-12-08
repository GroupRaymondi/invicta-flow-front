import { FileText, CheckCircle, Clock } from 'lucide-react';

interface ContratosSummaryCardsProps {
    activeCount: number;
    inProgressCount: number;
    completedCount: number;
}

export const ContratosSummaryCards = ({ activeCount, inProgressCount, completedCount }: ContratosSummaryCardsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                    <FileText size={24} />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground font-medium">Contratos Ativos</p>
                    <h3 className="text-2xl font-bold text-foreground">{activeCount}</h3>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground font-medium">Em Andamento</p>
                    <h3 className="text-2xl font-bold text-foreground">{inProgressCount}</h3>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground font-medium">Concluídos</p>
                    <h3 className="text-2xl font-bold text-foreground">{completedCount}</h3>
                </div>
            </div>
        </div>
    );
};
