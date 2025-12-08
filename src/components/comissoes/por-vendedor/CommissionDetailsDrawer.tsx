import { X, Calendar, DollarSign, FileText, User, CheckCircle } from 'lucide-react';
import type { Comissao } from '../../../data/mockComissoesData';

interface CommissionDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    commission: Comissao | null;
}

export const CommissionDetailsDrawer = ({ isOpen, onClose, commission }: CommissionDetailsDrawerProps) => {
    if (!commission) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Detalhes da Comissão</h2>
                            <p className="text-sm text-muted-foreground">ID: #{commission.id}</p>
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
                        {/* Status Banner */}
                        <div className={`p-4 rounded-xl border ${commission.status === 'paga' ? 'bg-emerald-500/10 border-emerald-500/20' :
                            commission.status === 'atrasada' ? 'bg-rose-500/10 border-rose-500/20' :
                                'bg-blue-500/10 border-blue-500/20'
                            }`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${commission.status === 'paga' ? 'bg-emerald-500 text-white' :
                                    commission.status === 'atrasada' ? 'bg-rose-500 text-white' :
                                        'bg-blue-500 text-white'
                                    }`}>
                                    <DollarSign size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium opacity-80">Status Atual</p>
                                    <p className={`text-lg font-bold ${commission.status === 'paga' ? 'text-emerald-600 dark:text-emerald-400' :
                                        commission.status === 'atrasada' ? 'text-rose-600 dark:text-rose-400' :
                                            'text-blue-600 dark:text-blue-400'
                                        }`}>
                                        {commission.status === 'paga' ? 'Comissão Paga' :
                                            commission.status === 'atrasada' ? 'Pagamento Atrasado' :
                                                'Aguardando Pagamento'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Values */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-muted/30 rounded-xl border border-border">
                                <p className="text-sm text-muted-foreground mb-1">Valor da Comissão</p>
                                <p className="text-2xl font-bold text-foreground">
                                    {commission.valorComissao.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                            </div>
                            <div className="p-4 bg-muted/30 rounded-xl border border-border">
                                <p className="text-sm text-muted-foreground mb-1">Percentual</p>
                                <p className="text-2xl font-bold text-foreground">{commission.percentual}%</p>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Informações do Contrato</h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <User className="text-muted-foreground" size={18} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Cliente</p>
                                        <p className="text-sm font-medium">{commission.cliente}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <FileText className="text-muted-foreground" size={18} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Contrato / Tipo</p>
                                        <p className="text-sm font-medium">{commission.contrato} - {commission.tipoContrato}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <DollarSign className="text-muted-foreground" size={18} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Valor do Contrato</p>
                                        <p className="text-sm font-medium">
                                            {commission.valorContrato.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Datas e Prazos</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <Calendar className="text-muted-foreground" size={18} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Data de Criação</p>
                                        <p className="text-sm font-medium">{new Date(commission.criadoEm).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <Calendar className="text-muted-foreground" size={18} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Previsão Pagamento</p>
                                        <p className="text-sm font-medium">{new Date(commission.dataPrevistaPagamento).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {commission.dataPagamento && (
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                                    <CheckCircle size={16} />
                                    <p className="text-sm font-semibold">Pagamento Realizado</p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Pago em: <span className="font-medium text-foreground">{new Date(commission.dataPagamento).toLocaleDateString('pt-BR')}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-border bg-muted/10">
                        <button
                            onClick={onClose}
                            className="w-full py-2.5 bg-background border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
