import { ReportLayout } from './ReportLayout';
import { FileText, CheckCircle2, Clock } from 'lucide-react';

export const ContratosPage = () => {
    return (
        <ReportLayout
            title="Contratos Ativos"
            subtitle="Visão geral dos contratos vigentes e renovações."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-muted-foreground">Contratos Vigentes</p>
                        <FileText className="text-orange-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold">85</p>
                    <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Todos em dia
                    </p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 h-96 flex items-center justify-center bg-muted/5">
                <div className="text-center text-muted-foreground">
                    <Clock size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Timeline de Renovações</p>
                    <p className="text-sm opacity-70">(Placeholder)</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Próximos Vencimentos</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Lista de contratos próximos do vencimento.</p>
                </div>
            </div>
        </ReportLayout>
    );
};
