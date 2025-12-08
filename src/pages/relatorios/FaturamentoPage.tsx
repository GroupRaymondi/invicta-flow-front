import { ReportLayout } from './ReportLayout';
import { LineChart, TrendingUp, CreditCard } from 'lucide-react';

export const FaturamentoPage = () => {
    return (
        <ReportLayout
            title="Faturamento (YTD)"
            subtitle="Análise acumulada do faturamento anual."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-muted-foreground">Faturamento Anual</p>
                        <CreditCard className="text-blue-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold">U$ 542.300,00</p>
                    <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                        <TrendingUp size={12} />
                        +12% vs ano anterior
                    </p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 h-96 flex items-center justify-center bg-muted/5">
                <div className="text-center text-muted-foreground">
                    <LineChart size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Gráfico de Faturamento Mensal</p>
                    <p className="text-sm opacity-70">(Placeholder)</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Histórico de Notas Fiscais</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Lista de notas fiscais emitidas.</p>
                </div>
            </div>
        </ReportLayout>
    );
};
