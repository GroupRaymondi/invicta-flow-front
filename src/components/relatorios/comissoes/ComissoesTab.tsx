import { ComissoesKpis } from './ComissoesKpis';
import { ComissoesTable } from './ComissoesTable';
import { EmptyState } from '../common/EmptyState';
import { mockCommissionsKpis, mockCommissionsList } from '../../../data/mockReportsData';

interface ComissoesTabProps {
    isLoading: boolean;
    hasData: boolean;
}

export const ComissoesTab = ({ hasData }: ComissoesTabProps) => {
    if (!hasData) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ComissoesKpis data={mockCommissionsKpis} />
            <ComissoesTable data={mockCommissionsList} />
        </div>
    );
};
