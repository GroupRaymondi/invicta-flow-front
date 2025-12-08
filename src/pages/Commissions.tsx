import { useState, useEffect } from 'react';
import { ComissoesHeader } from '../components/comissoes/ComissoesHeader';
import { ComissoesFilters, type PeriodPreset, type CommissionStatusFilter } from '../components/comissoes/ComissoesFilters';
import { ComissoesTabs, type ComissoesTabType } from '../components/comissoes/ComissoesTabs';
import { ResumoTab } from '../components/comissoes/resumo/ResumoTab';
import { PorVendedorTab } from '../components/comissoes/por-vendedor/PorVendedorTab';
import { LancamentosTab } from '../components/comissoes/lancamentos/LancamentosTab';
import { LoadingSkeleton } from '../components/comissoes/common/LoadingSkeleton';

export const Commissions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<ComissoesTabType>('summary');

    // Global Filters State
    const [period, setPeriod] = useState<PeriodPreset>('last30');
    const [selectedSeller, setSelectedSeller] = useState<string>('all');
    const [status, setStatus] = useState<CommissionStatusFilter>('all');

    // Simulate initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleApplyFilters = () => {
        setIsLoading(true);
        // Simulate data refetching/filtering
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    const handleClearFilters = () => {
        setPeriod('last30');
        setSelectedSeller('all');
        setStatus('all');
        handleApplyFilters();
    };

    return (
        <div className="min-h-screen pb-10 animate-in fade-in duration-500">
            <ComissoesHeader />

            <ComissoesFilters
                period={period}
                setPeriod={setPeriod}
                selectedSeller={selectedSeller}
                setSelectedSeller={setSelectedSeller}
                status={status}
                setStatus={setStatus}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />

            <ComissoesTabs activeTab={activeTab} onTabChange={setActiveTab}>
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        {activeTab === 'summary' && <ResumoTab hasData={true} />}
                        {activeTab === 'by-seller' && <PorVendedorTab hasData={true} />}
                        {activeTab === 'entries' && <LancamentosTab hasData={true} />}
                    </>
                )}
            </ComissoesTabs>
        </div>
    );
};
