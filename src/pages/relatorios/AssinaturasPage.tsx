import { ReportLayout } from './ReportLayout';
import { Users, UserPlus, Activity } from 'lucide-react';

export const AssinaturasPage = () => {
    return (
        <ReportLayout
            title="Assinaturas Ativas"
            subtitle="Gestão da base de assinantes e churn."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-muted-foreground">Total de Assinantes</p>
                        <Users className="text-purple-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold">1,234</p>
                    <p className="text-xs text-purple-500 mt-1 flex items-center gap-1">
                        <UserPlus size={12} />
                        +45 novos este mês
                    </p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 h-96 flex items-center justify-center bg-muted/5">
                <div className="text-center text-muted-foreground">
                    <Activity size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Gráfico de Crescimento da Base</p>
                    <p className="text-sm opacity-70">(Placeholder)</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Últimas Assinaturas</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Tabela de assinantes recentes.</p>
                </div>
            </div>
        </ReportLayout>
    );
};
