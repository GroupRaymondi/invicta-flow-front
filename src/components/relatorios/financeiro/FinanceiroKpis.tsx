import { KpiCard } from '../common/KpiCard';
import type { KpiCardData } from '../../../data/mockReportsData';

interface FinanceiroKpisProps {
    data: KpiCardData[];
}

export const FinanceiroKpis = ({ data }: FinanceiroKpisProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {data.map((kpi) => (
                <KpiCard key={kpi.id} data={kpi} />
            ))}
        </div>
    );
};
