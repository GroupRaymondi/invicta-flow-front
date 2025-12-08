import { KpiCard } from '../common/KpiCard';
import type { KpiCardData } from '../../../data/mockReportsData';

interface VisaoGeralKpisProps {
    data: KpiCardData[];
}

export const VisaoGeralKpis = ({ data }: VisaoGeralKpisProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            {data.map((kpi) => (
                <KpiCard key={kpi.id} data={kpi} />
            ))}
        </div>
    );
};
