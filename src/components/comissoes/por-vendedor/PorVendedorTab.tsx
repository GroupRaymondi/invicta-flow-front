import { useState } from 'react';
import { VendedorSelector } from './VendedorSelector';
import { VendedorKpis } from './VendedorKpis';
import { VendedorCommissionsTable } from './VendedorCommissionsTable';
import { CommissionDetailsDrawer } from './CommissionDetailsDrawer';
import { mockComissoes, mockVendedores } from '../../../data/mockComissoesData';
import type { Comissao } from '../../../data/mockComissoesData';

interface PorVendedorTabProps {
    hasData: boolean;
}

export const PorVendedorTab = ({ }: PorVendedorTabProps) => {
    const [selectedSellerId, setSelectedSellerId] = useState<string>(mockVendedores[0]?.id || '');
    const [selectedCommission, setSelectedCommission] = useState<Comissao | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Filter commissions by selected seller
    const sellerCommissions = mockComissoes.filter(c => c.vendedorId === selectedSellerId);

    // Calculate KPIs dynamically
    const kpis = {
        total: sellerCommissions.reduce((acc, curr) => acc + curr.valorComissao, 0),
        paid: sellerCommissions.filter(c => c.status === 'paga').reduce((acc, curr) => acc + curr.valorComissao, 0),
        open: sellerCommissions.filter(c => c.status === 'em_aberto').reduce((acc, curr) => acc + curr.valorComissao, 0),
        contracts: sellerCommissions.length
    };

    const handleViewDetails = (commission: Comissao) => {
        setSelectedCommission(commission);
        setIsDrawerOpen(true);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Sidebar / Selector */}
            <div className="w-full lg:w-80 flex-shrink-0">
                <VendedorSelector
                    selectedSellerId={selectedSellerId}
                    onSelectSeller={setSelectedSellerId}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                <VendedorKpis data={kpis} />

                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Histórico de Comissões</h3>
                    <span className="text-sm text-muted-foreground">{sellerCommissions.length} registros encontrados</span>
                </div>

                <VendedorCommissionsTable
                    commissions={sellerCommissions}
                    onViewDetails={handleViewDetails}
                />
            </div>

            {/* Drawer */}
            <CommissionDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                commission={selectedCommission}
            />
        </div>
    );
};
