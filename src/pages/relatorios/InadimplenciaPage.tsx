import { ReportLayout } from './ReportLayout';
import { AlertCircle, TrendingDown, PieChart } from 'lucide-react';

export const InadimplenciaPage = () => {
    return (
        <ReportLayout
            title="Controle de Inadimplência"
            subtitle="Monitoramento de pagamentos em atraso e riscos."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-muted-foreground">Taxa de Inadimplência</p>
                        <AlertCircle className="text-red-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold">2.4%</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                        <TrendingDown size={12} />
                        -0.5% vs mês anterior
                    </p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 h-96 flex items-center justify-center bg-muted/5">
                <div className="text-center text-muted-foreground">
                    <PieChart size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Distribuição por Tempo de Atraso</p>
                    <p className="text-sm opacity-70">(Placeholder)</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Clientes em Atraso</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Lista de clientes com pagamentos pendentes.</p>
                </div>
            </div>
        </ReportLayout>
    );
};
