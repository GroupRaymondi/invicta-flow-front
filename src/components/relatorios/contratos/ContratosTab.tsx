import { ContratosCharts } from './ContratosCharts';
import { ContratosTable } from './ContratosTable';
import { EmptyState } from '../common/EmptyState';
import { mockContractsFunnel, mockContractsList } from '../../../data/mockReportsData';

interface ContratosTabProps {
    isLoading: boolean;
    hasData: boolean;
}

export const ContratosTab = ({ hasData }: ContratosTabProps) => {
    if (!hasData) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ContratosCharts funnelData={mockContractsFunnel} />
            <ContratosTable data={mockContractsList} />
        </div>
    );
};
