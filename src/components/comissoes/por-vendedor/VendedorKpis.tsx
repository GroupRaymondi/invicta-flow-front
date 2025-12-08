import { KpiCard } from '../common/KpiCard';
import type { KpiCardData } from '../../../data/mockComissoesData';

interface VendedorKpisProps {
    data: {
        total: number;
        paid: number;
        open: number;
        contracts: number;
    };
}

export const VendedorKpis = ({ data }: VendedorKpisProps) => {
    const kpis: KpiCardData[] = [
        {
            id: 'total',
            label: 'Total Comissões',
            value: data.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            trend: 'up',
            changePercent: 5.2
        },
        {
            id: 'paid',
            label: 'Pagas',
            value: data.paid.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            trend: 'up',
            changePercent: 8.1
        },
        {
            id: 'open',
            label: 'Em Aberto',
            value: data.open.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            trend: 'neutral',
            changePercent: 1.5
        },
        {
            id: 'contracts',
            label: 'Contratos',
            value: data.contracts,
            trend: 'up',
            changePercent: 12.0
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpis.map((kpi) => (
                <KpiCard key={kpi.id} data={kpi} />
            ))}
        </div>
    );
};
