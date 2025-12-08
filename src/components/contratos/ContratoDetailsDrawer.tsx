import { X, User, FileText, DollarSign, Edit, MapPin, Mail, Phone } from 'lucide-react';
import type { Contrato } from '../../data/mockContratos';

interface ContratoDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    contrato: Contrato | null;
    onEdit: (contrato: Contrato) => void;
}

export const ContratoDetailsDrawer = ({ isOpen, onClose, contrato, onEdit }: ContratoDetailsDrawerProps) => {
    if (!contrato) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'rascunho': return 'bg-slate-500';
            case 'em_analise': return 'bg-blue-500';
            case 'assinado': return 'bg-indigo-500';
            case 'em_andamento': return 'bg-amber-500';
            case 'concluido': return 'bg-emerald-500';
            case 'cancelado': return 'bg-rose-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'rascunho': return 'Rascunho';
            case 'em_analise': return 'Em Análise';
            case 'assinado': return 'Assinado';
            case 'em_andamento': return 'Em Andamento';
            case 'concluido': return 'Concluído';
            case 'cancelado': return 'Cancelado';
            default: return status;
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    // Timeline Mock
    const timelineSteps = [
        { id: 'rascunho', label: 'Rascunho' },
        { id: 'em_analise', label: 'Em Análise' },
        { id: 'assinado', label: 'Assinado' },
        { id: 'em_andamento', label: 'Em Andamento' },
        { id: 'concluido', label: 'Concluído' }
    ];

    const currentStepIndex = timelineSteps.findIndex(step => step.id === contrato.status);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-border flex items-center justify-between bg-muted/10">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-xl font-bold text-foreground">{contrato.numero}</h2>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(contrato.status)}`}>
                                    {getStatusLabel(contrato.status)}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{contrato.clienteNome}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Timeline */}
                        {contrato.status !== 'cancelado' && (
                            <div className="relative flex items-center justify-between px-2">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border -z-10" />
                                {timelineSteps.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;

                                    return (
                                        <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-1">
                                            <div className={`w-3 h-3 rounded-full border-2 ${isCompleted ? 'bg-primary border-primary' : 'bg-background border-muted-foreground'}`} />
                                            <span className={`text-[10px] font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Informações Gerais */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                                <FileText size={16} /> Informações Gerais
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground mb-1">Tipo de Contrato</p>
                                    <p className="text-sm font-medium">{contrato.tipo}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground mb-1">Responsável</p>
                                    <p className="text-sm font-medium">{contrato.responsavel}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground mb-1">Origem</p>
                                    <p className="text-sm font-medium">{contrato.origem || '-'}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground mb-1">Data de Criação</p>
                                    <p className="text-sm font-medium">{formatDate(contrato.dataCriacao)}</p>
                                </div>
                            </div>
                        </section>

                        {/* Dados do Cliente */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                                <User size={16} /> Dados do Cliente
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                    <Mail className="text-muted-foreground" size={16} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="text-sm font-medium">{contrato.clienteEmail || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                    <Phone className="text-muted-foreground" size={16} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Telefone</p>
                                        <p className="text-sm font-medium">{contrato.clienteTelefone || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                    <MapPin className="text-muted-foreground" size={16} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Localização</p>
                                        <p className="text-sm font-medium">
                                            {contrato.clienteCidade && contrato.clientePais
                                                ? `${contrato.clienteCidade}, ${contrato.clientePais}`
                                                : '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Resumo Financeiro */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                                <DollarSign size={16} /> Resumo Financeiro
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 bg-card border border-border rounded-lg shadow-sm">
                                    <p className="text-xs text-muted-foreground mb-1">Valor Total</p>
                                    <p className="text-sm font-bold text-foreground">{formatCurrency(contrato.valorTotal)}</p>
                                </div>
                                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                                    <p className="text-xs text-emerald-600 mb-1">Valor Pago</p>
                                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(contrato.valorPago)}</p>
                                </div>
                                <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                                    <p className="text-xs text-rose-600 mb-1">Em Aberto</p>
                                    <p className="text-sm font-bold text-rose-700 dark:text-rose-400">{formatCurrency(contrato.valorTotal - contrato.valorPago)}</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-border bg-muted/10 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-background border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
                        >
                            Fechar
                        </button>
                        <button
                            onClick={() => onEdit(contrato)}
                            className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            <Edit size={16} />
                            Editar Contrato
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
