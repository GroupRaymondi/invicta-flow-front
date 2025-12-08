import { KpiCard } from '../common/KpiCard';
import type { KpiCardData } from '../../../data/mockComissoesData';

interface ResumoKpisProps {
    data: {
        total: number;
        paid: number;
        open: number;
        overdue: number;
        count: number;
    };
}

export const ResumoKpis = ({ data }: ResumoKpisProps) => {
    const kpis: KpiCardData[] = [
        {
            id: 'total',
            label: 'Total de Comissões',
            value: data.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            changePercent: 12.5,
            trend: 'up',
        },
        {
            id: 'paid',
            label: 'Comissões Pagas',
            value: data.paid.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            changePercent: 8.2,
            trend: 'up',
        },
        {
            id: 'open',
            label: 'Em Aberto',
            value: data.open.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            changePercent: 2.1,
            trend: 'neutral',
        },
        {
            id: 'overdue',
            label: 'Atrasadas',
            value: data.overdue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            changePercent: 5.4,
            trend: 'down',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpis.map((kpi) => (
                <KpiCard key={kpi.id} data={kpi} />
            ))}
        </div>
    );
};
