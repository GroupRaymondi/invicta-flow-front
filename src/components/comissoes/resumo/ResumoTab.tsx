import { ResumoKpis } from './ResumoKpis';
import { ResumoCharts } from './ResumoCharts';
import { mockComissoesPorMes, mockComissoesPorVendedorChart } from '../../../data/mockComissoesData';

interface ResumoTabProps {
    hasData: boolean;
}

export const ResumoTab = ({ hasData }: ResumoTabProps) => {
    // In a real app, we would calculate these based on the filtered data
    // For now, we use static mock data or derived simple stats
    const kpiData = {
        total: 125000,
        paid: 85000,
        open: 35000,
        overdue: 5000,
        count: 42
    };

    if (!hasData) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <p>Nenhum dado disponível para o período selecionado.</p>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResumoKpis data={kpiData} />
            <ResumoCharts
                timeData={mockComissoesPorMes}
                sellerData={mockComissoesPorVendedorChart}
            />
        </div>
    );
};
