import { useState, useEffect } from 'react';
import { ReportsHeader } from '../components/relatorios/ReportsHeader';
import { ReportsFilters } from '../components/relatorios/ReportsFilters';
import { ReportsTabs } from '../components/relatorios/ReportsTabs';
import { VisaoGeralTab } from '../components/relatorios/visao-geral/VisaoGeralTab';
import { FinanceiroTab } from '../components/relatorios/financeiro/FinanceiroTab';
import { ContratosTab } from '../components/relatorios/contratos/ContratosTab';
import { CrmTab } from '../components/relatorios/crm/CrmTab';
import { ComissoesTab } from '../components/relatorios/comissoes/ComissoesTab';
import { LoadingSkeleton } from '../components/relatorios/common/LoadingSkeleton';
import type { PeriodPreset } from '../data/mockReportsData';

export const Reports = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [period, setPeriod] = useState<PeriodPreset>('last30');
    const [responsible, setResponsible] = useState('');
    const [status, setStatus] = useState('');

    // Simulate initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleApplyFilters = () => {
        setIsLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    };

    const handleClearFilters = () => {
        setPeriod('last30');
        setResponsible('');
        setStatus('');
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const renderTabContent = () => {
        if (isLoading) {
            return <LoadingSkeleton />;
        }

        switch (activeTab) {
            case 'overview':
                return <VisaoGeralTab isLoading={isLoading} hasData={true} />;
            case 'financial':
                return <FinanceiroTab isLoading={isLoading} hasData={true} />;
            case 'contracts':
                return <ContratosTab isLoading={isLoading} hasData={true} />;
            case 'crm':
                return <CrmTab isLoading={isLoading} hasData={true} />;
            case 'commissions':
                return <ComissoesTab isLoading={isLoading} hasData={true} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <ReportsHeader />

            <ReportsFilters
                period={period}
                setPeriod={setPeriod}
                responsible={responsible}
                setResponsible={setResponsible}
                status={status}
                setStatus={setStatus}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />

            <ReportsTabs activeTab={activeTab} onTabChange={setActiveTab}>
                <div className="mt-6 min-h-[500px]">
                    {renderTabContent()}
                </div>
            </ReportsTabs>
        </div>
    );
};
