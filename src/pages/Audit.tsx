import { useState, useEffect } from 'react';
import { AuditHeader } from '../components/auditoria/AuditHeader';
import { AuditFilters } from '../components/auditoria/AuditFilters';
import { AuditTable } from '../components/auditoria/AuditTable';
import { AuditDetailsDrawer } from '../components/auditoria/AuditDetailsDrawer';
import { AuditEmptyState } from '../components/auditoria/AuditEmptyState';
import { AuditLoadingSkeleton } from '../components/auditoria/AuditLoadingSkeleton';
import { mockAuditLogs, type AuditLogEntry } from '../data/mockAuditLogs';

export const Audit = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [logs, setLogs] = useState<AuditLogEntry[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>([]);
    const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Filters State
    const [filters, setFilters] = useState({
        usuario: '',
        acao: '',
        entidade: '',
        entidadeId: '',
        dataInicio: '',
        dataFim: ''
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            setLogs(mockAuditLogs);
            setFilteredLogs(mockAuditLogs);
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleApplyFilters = () => {
        setIsLoading(true);

        // Simulate processing time
        setTimeout(() => {
            let result = [...logs];

            if (filters.usuario) {
                result = result.filter(log => log.usuarioNome === filters.usuario);
            }
            if (filters.acao) {
                result = result.filter(log => log.acao.includes(filters.acao));
            }
            if (filters.entidade) {
                result = result.filter(log => log.entidade === filters.entidade);
            }
            if (filters.entidadeId) {
                result = result.filter(log => log.entidadeId.toLowerCase().includes(filters.entidadeId.toLowerCase()));
            }
            if (filters.dataInicio) {
                result = result.filter(log => new Date(log.criadoEm) >= new Date(filters.dataInicio));
            }
            if (filters.dataFim) {
                result = result.filter(log => new Date(log.criadoEm) <= new Date(filters.dataFim));
            }

            setFilteredLogs(result);
            setCurrentPage(1);
            setIsLoading(false);
        }, 500);
    };

    const handleClearFilters = () => {
        setFilters({
            usuario: '',
            acao: '',
            entidade: '',
            entidadeId: '',
            dataInicio: '',
            dataFim: ''
        });
        setFilteredLogs(logs);
        setCurrentPage(1);
    };

    const handleSortToggle = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);

        const sorted = [...filteredLogs].sort((a, b) => {
            const dateA = new Date(a.criadoEm).getTime();
            const dateB = new Date(b.criadoEm).getTime();
            return newOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setFilteredLogs(sorted);
    };

    const handleViewDetails = (log: AuditLogEntry) => {
        setSelectedLog(log);
        setIsDrawerOpen(true);
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

    return (
        <div className="animate-in fade-in duration-500 pb-10">
            <AuditHeader />

            {isLoading ? (
                <AuditLoadingSkeleton />
            ) : (
                <>
                    <AuditFilters
                        filters={filters}
                        setFilters={setFilters}
                        onApply={handleApplyFilters}
                        onClear={handleClearFilters}
                    />

                    {filteredLogs.length === 0 ? (
                        <AuditEmptyState />
                    ) : (
                        <>
                            <AuditTable
                                logs={currentItems}
                                onViewDetails={handleViewDetails}
                                sortOrder={sortOrder}
                                onSortToggle={handleSortToggle}
                            />

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                                <span>
                                    Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredLogs.length)} de {filteredLogs.length} registros
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Anterior
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 border border-border rounded hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Próximo
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}

            <AuditDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                log={selectedLog}
            />
        </div>
    );
};
