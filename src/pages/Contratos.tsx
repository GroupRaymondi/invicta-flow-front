import { useState, useMemo } from 'react';
import { ContratosHeader } from '../components/contratos/ContratosHeader';
import { ContratosSummaryCards } from '../components/contratos/ContratosSummaryCards';
import { ContratosFilters } from '../components/contratos/ContratosFilters';
import { ContratosTable } from '../components/contratos/ContratosTable';
import { ContratosEmptyState } from '../components/contratos/ContratosEmptyState';
import { ContratoDetailsDrawer } from '../components/contratos/ContratoDetailsDrawer';
import { ContratoFormModal } from '../components/contratos/ContratoFormModal';
import { mockContratos, type Contrato, type ContratoStatus } from '../data/mockContratos';

export const Contratos = () => {
    // State
    const [contratos, setContratos] = useState<Contrato[]>(mockContratos);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all' as ContratoStatus | 'all',
        tipo: '',
        responsavel: '',
        dateStart: '',
        dateEnd: ''
    });
    const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContrato, setEditingContrato] = useState<Contrato | null>(null);

    // Derived State
    const filteredContratos = useMemo(() => {
        return contratos.filter((contrato) => {
            // Search
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
                contrato.clienteNome.toLowerCase().includes(searchLower) ||
                contrato.numero.toLowerCase().includes(searchLower) ||
                (contrato.clienteEmail && contrato.clienteEmail.toLowerCase().includes(searchLower));

            // Status
            const matchesStatus = filters.status === 'all' || contrato.status === filters.status;

            // Tipo
            const matchesTipo = filters.tipo === '' || contrato.tipo === filters.tipo;

            // Responsável
            const matchesResponsavel = filters.responsavel === '' || contrato.responsavel === filters.responsavel;

            // Date Range (Creation Date)
            let matchesDate = true;
            if (filters.dateStart) {
                matchesDate = matchesDate && new Date(contrato.dataCriacao) >= new Date(filters.dateStart);
            }
            if (filters.dateEnd) {
                matchesDate = matchesDate && new Date(contrato.dataCriacao) <= new Date(filters.dateEnd);
            }

            return matchesSearch && matchesStatus && matchesTipo && matchesResponsavel && matchesDate;
        });
    }, [contratos, filters]);

    const summaryCounts = useMemo(() => {
        return {
            active: contratos.filter(c => ['em_analise', 'assinado', 'em_andamento'].includes(c.status)).length,
            inProgress: contratos.filter(c => c.status === 'em_andamento').length,
            completed: contratos.filter(c => c.status === 'concluido').length
        };
    }, [contratos]);

    // Handlers
    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleClearFilters = () => {
        setFilters({
            search: '',
            status: 'all',
            tipo: '',
            responsavel: '',
            dateStart: '',
            dateEnd: ''
        });
    };

    const handleNewContract = () => {
        setEditingContrato(null);
        setIsModalOpen(true);
    };

    const handleViewDetails = (contrato: Contrato) => {
        setSelectedContrato(contrato);
        setIsDrawerOpen(true);
    };

    const handleEditContract = (contrato: Contrato) => {
        setEditingContrato(contrato);
        setIsDrawerOpen(false); // Close drawer if open
        setIsModalOpen(true);
    };

    const handleSaveContract = (contratoData: Partial<Contrato>) => {
        if (editingContrato) {
            // Update existing
            setContratos(prev => prev.map(c => c.id === editingContrato.id ? { ...c, ...contratoData } as Contrato : c));
        } else {
            // Create new
            const newContrato: Contrato = {
                ...contratoData,
                id: Math.random().toString(36).substr(2, 9),
                numero: `CTR-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                valorPago: 0 // Default for new contracts
            } as Contrato;
            setContratos(prev => [newContrato, ...prev]);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <ContratosHeader onNewContract={handleNewContract} />

            <ContratosSummaryCards
                activeCount={summaryCounts.active}
                inProgressCount={summaryCounts.inProgress}
                completedCount={summaryCounts.completed}
            />

            <ContratosFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            {filteredContratos.length > 0 ? (
                <ContratosTable
                    contratos={filteredContratos}
                    onViewDetails={handleViewDetails}
                />
            ) : (
                <ContratosEmptyState onClearFilters={handleClearFilters} />
            )}

            {/* Drawers & Modals */}
            <ContratoDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                contrato={selectedContrato}
                onEdit={handleEditContract}
            />

            <ContratoFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveContract}
                initialData={editingContrato}
            />
        </div>
    );
};
