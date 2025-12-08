import { CrmKpis } from './CrmKpis';
import { CrmCharts } from './CrmCharts';
import { CrmTable } from './CrmTable';
import { EmptyState } from '../common/EmptyState';
import { mockCrmKpis, mockCrmSources, mockLeadsList } from '../../../data/mockReportsData';

interface CrmTabProps {
    isLoading: boolean;
    hasData: boolean;
}

export const CrmTab = ({ hasData }: CrmTabProps) => {
    if (!hasData) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CrmKpis data={mockCrmKpis} />
            <CrmCharts sourceData={mockCrmSources} />
            <CrmTable data={mockLeadsList} />
        </div>
    );
};
