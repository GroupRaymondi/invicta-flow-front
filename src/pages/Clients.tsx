import { useState, useMemo } from 'react';
import { ClientesHeader } from '../components/carteira/ClientesHeader';
import { ClientesSummaryCards } from '../components/carteira/ClientesSummaryCards';
import { ClientesSearchAndFilters } from '../components/carteira/ClientesSearchAndFilters';
import { ClientesTable } from '../components/carteira/ClientesTable';
import { ClientesEmptyState } from '../components/carteira/ClientesEmptyState';
import { ClienteDetailsDrawer } from '../components/carteira/ClienteDetailsDrawer';
import { ClienteFormModal } from '../components/carteira/ClienteFormModal';
import { ComissaoDetalhesModal } from '../components/carteira/ComissaoDetalhesModal';
import { VendasDetalhesModal } from '../components/carteira/VendasDetalhesModal';
import { mockClientes, type Cliente } from '../data/mockClientes';

export const Clients = () => {
    // State
    const [clientes, setClientes] = useState<Cliente[]>(mockClientes);
    const [search, setSearch] = useState('');
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

    // Modals & Drawers State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isComissaoModalOpen, setIsComissaoModalOpen] = useState(false);
    const [isVendasModalOpen, setIsVendasModalOpen] = useState(false);

    // Derived State
    const filteredClientes = useMemo(() => {
        return clientes.filter((cliente) =>
            cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
            (cliente.email && cliente.email.toLowerCase().includes(search.toLowerCase()))
        );
    }, [clientes, search]);

    const totals = useMemo(() => {
        return filteredClientes.reduce((acc, curr) => ({
            vendas: acc.vendas + curr.valorTotalVendas,
            comissao: acc.comissao + curr.comissaoAReceber
        }), { vendas: 0, comissao: 0 });
    }, [filteredClientes]);

    // Handlers
    const handleNewClient = () => {
        setEditingCliente(null);
        setIsFormModalOpen(true);
    };

    const handleViewDetails = (cliente: Cliente) => {
        setSelectedCliente(cliente);
        setIsDrawerOpen(true);
    };

    const handleEditClient = (cliente: Cliente) => {
        setEditingCliente(cliente);
        setIsDrawerOpen(false);
        setIsFormModalOpen(true);
    };

    const handleArchiveClient = (cliente: Cliente) => {
        setClientes(prev => prev.map(c =>
            c.id === cliente.id
                ? { ...c, status: c.status === 'arquivado' ? 'ativo' : 'arquivado' }
                : c
        ));
    };

    const handleSaveClient = (clienteData: Partial<Cliente>) => {
        if (editingCliente) {
            // Update existing
            setClientes(prev => prev.map(c => c.id === editingCliente.id ? { ...c, ...clienteData } as Cliente : c));
        } else {
            // Create new
            const newCliente: Cliente = {
                ...clienteData,
                id: Math.random().toString(36).substr(2, 9),
                valorTotalVendas: 0, // Default
                comissaoAReceber: 0, // Default
                dataCriacao: new Date().toISOString()
            } as Cliente;
            setClientes(prev => [newCliente, ...prev]);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <ClientesHeader onNewClient={handleNewClient} />

            <ClientesSummaryCards
                totalVendas={totals.vendas}
                totalComissao={totals.comissao}
                onViewVendasDetails={() => setIsVendasModalOpen(true)}
                onViewComissaoDetails={() => setIsComissaoModalOpen(true)}
            />

            <ClientesSearchAndFilters
                search={search}
                onSearchChange={setSearch}
                onToggleFilters={() => { }} // Placeholder
            />

            {filteredClientes.length > 0 ? (
                <ClientesTable
                    clientes={filteredClientes}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditClient}
                    onArchive={handleArchiveClient}
                />
            ) : (
                <ClientesEmptyState onClearFilters={() => setSearch('')} />
            )}

            {/* Drawers & Modals */}
            <ClienteDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                cliente={selectedCliente}
                onEdit={handleEditClient}
            />

            <ClienteFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSaveClient}
                initialData={editingCliente}
            />

            <ComissaoDetalhesModal
                isOpen={isComissaoModalOpen}
                onClose={() => setIsComissaoModalOpen(false)}
                clientes={filteredClientes}
                totalComissao={totals.comissao}
            />

            <VendasDetalhesModal
                isOpen={isVendasModalOpen}
                onClose={() => setIsVendasModalOpen(false)}
                clientes={filteredClientes}
                totalVendas={totals.vendas}
            />
        </div>
    );
};
