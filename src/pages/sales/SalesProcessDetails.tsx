import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, Shield, Download, ExternalLink } from 'lucide-react';
import { mockSalesProcesses, mockTimelineSteps, mockDocuments } from '../../data/mockSales';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ProcessTimeline } from '../../components/process/ProcessTimeline';

export const SalesProcessDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'info'>('timeline');

    const process = mockSalesProcesses.find(p => p.id === id);

    if (!process) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <h2 className="text-xl font-bold text-foreground mb-2">Processo não encontrado</h2>
                <button onClick={() => navigate('/sales/processes')} className="text-primary hover:underline">
                    Voltar para lista
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-7xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => navigate('/sales/processes')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft size={16} />
                Voltar para Processos
            </button>

            {/* Header Card */}
            <div className="bg-white dark:bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-foreground">{process.clientName}</h1>
                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-200 dark:border-slate-700">
                                {process.processType.name}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span>{process.clientEmail}</span>
                            {process.clientPhone && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span>{process.clientPhone}</span>
                                </>
                            )}
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="font-mono">{process.internalProcessNumber}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={process.status} type="process" />
                        <span className="text-xs text-muted-foreground">
                            Atualizado em {new Date(process.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Status USCIS</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-foreground">
                                    {process.uscisStatus ? (
                                        <StatusBadge status={process.uscisStatus} type="uscis" />
                                    ) : 'Não protocolado'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Contrato</p>
                            <div className="flex items-center gap-2">
                                <StatusBadge status={process.contractStatus} type="contract" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Pagamento</p>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <StatusBadge status={process.paymentStatus} type="payment" />
                                    <span className="text-xs text-muted-foreground">
                                        ({process.installments}x)
                                    </span>
                                </div>
                                <span className="text-sm font-semibold mt-1">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(process.totalAmount)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-border">
                <button
                    onClick={() => setActiveTab('timeline')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'timeline'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Linha do Tempo
                </button>
                <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'documents'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Documentos
                </button>
                <button
                    onClick={() => setActiveTab('info')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'info'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Informações Adicionais
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'timeline' && (
                    <div className="bg-white dark:bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-foreground mb-4">Progresso do Caso</h3>
                        <ProcessTimeline steps={mockTimelineSteps} />
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="bg-white dark:bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                                <tr>
                                    <th className="px-6 py-3">Nome do Arquivo</th>
                                    <th className="px-6 py-3">Tipo</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Data Upload</th>
                                    <th className="px-6 py-3 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {mockDocuments.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                                            <FileText size={16} className="text-muted-foreground" />
                                            {doc.fileName}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{doc.documentType}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={doc.status} />
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground text-xs">
                                            {new Date(doc.uploadedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:text-primary/80 p-2 hover:bg-primary/10 rounded-lg transition-colors" title="Download">
                                                <Download size={16} />
                                            </button>
                                            <button className="text-muted-foreground hover:text-foreground p-2 hover:bg-muted rounded-lg transition-colors" title="Abrir">
                                                <ExternalLink size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'info' && (
                    <div className="bg-white dark:bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-foreground mb-4">Informações USCIS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Receipt Number</label>
                                <div className="p-3 bg-muted/30 border border-border rounded-lg font-mono text-foreground">
                                    {process.uscisReceiptNumber || 'Não disponível'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Status Atual</label>
                                <div className="p-3 bg-muted/30 border border-border rounded-lg text-foreground">
                                    {process.uscisStatus || 'Não protocolado'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
