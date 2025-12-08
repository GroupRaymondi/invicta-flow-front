import { VisaoGeralKpis } from './VisaoGeralKpis';
import { VisaoGeralCharts } from './VisaoGeralCharts';
import { EmptyState } from '../common/EmptyState';
import { mockOverviewKpis, mockOverviewTrend, mockOverviewStatus } from '../../../data/mockReportsData';

interface VisaoGeralTabProps {
    isLoading: boolean;
    hasData: boolean;
}

export const VisaoGeralTab = ({ hasData }: VisaoGeralTabProps) => {
    if (!hasData) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <VisaoGeralKpis data={mockOverviewKpis} />
            <VisaoGeralCharts trendData={mockOverviewTrend} statusData={mockOverviewStatus} />
        </div>
    );
};
