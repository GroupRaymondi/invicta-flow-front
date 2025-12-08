import { ReportLayout } from './ReportLayout';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';

export const ReceitaPage = () => {
    return (
        <ReportLayout
            title="Receita Detalhada"
            subtitle="Visualização detalhada da receita no período selecionado."
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-muted-foreground">Receita Total (Mês)</p>
                        <DollarSign className="text-green-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold">U$ 45.231,89</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                        <TrendingUp size={12} />
                        +20.1% vs mês anterior
                    </p>
                </div>
                {/* More KPIs can go here */}
            </div>

            <div className="bg-card border border-border rounded-xl p-6 h-96 flex items-center justify-center bg-muted/5">
                <div className="text-center text-muted-foreground">
                    <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Gráfico de Evolução da Receita</p>
                    <p className="text-sm opacity-70">(Placeholder)</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Tabela de transações detalhadas será exibida aqui.</p>
                </div>
            </div>
        </ReportLayout>
    );
};
