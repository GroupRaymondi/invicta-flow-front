import { X, User, Mail, Phone, MapPin, Briefcase, DollarSign, Edit } from 'lucide-react';
import type { Cliente } from '../../data/mockClientes';

interface ClienteDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cliente: Cliente | null;
    onEdit: (cliente: Cliente) => void;
}

export const ClienteDetailsDrawer = ({ isOpen, onClose, cliente, onEdit }: ClienteDetailsDrawerProps) => {
    if (!cliente) return null;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

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
                                <h2 className="text-xl font-bold text-foreground">{cliente.nome}</h2>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${cliente.status === 'ativo' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                    cliente.status === 'pendente' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                        cliente.status === 'em_analise' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                            'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                    }`}>
                                    {cliente.status === 'ativo' ? 'Ativo' :
                                        cliente.status === 'pendente' ? 'Pendente' :
                                            cliente.status === 'em_analise' ? 'Em Análise' :
                                                'Arquivado'}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{cliente.tipoProcesso}</p>
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
                        {/* Informações Gerais */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                                <User size={16} /> Informações Gerais
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                    <Mail className="text-muted-foreground" size={16} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="text-sm font-medium">{cliente.email || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                    <Phone className="text-muted-foreground" size={16} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Telefone</p>
                                        <p className="text-sm font-medium">{cliente.telefone || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                    <User className="text-muted-foreground" size={16} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Responsável</p>
                                        <p className="text-sm font-medium">{cliente.responsavel || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                    <MapPin className="text-muted-foreground" size={16} />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Origem</p>
                                        <p className="text-sm font-medium">{cliente.origem || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Processos */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                                <Briefcase size={16} /> Processos
                            </h3>
                            <div className="space-y-2">
                                {cliente.processos && cliente.processos.length > 0 ? (
                                    cliente.processos.map((proc, index) => (
                                        <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-sm font-medium">{proc.tipo}</p>
                                                <span className="text-xs px-2 py-0.5 bg-background rounded border border-border text-muted-foreground">
                                                    {proc.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Início: {new Date(proc.dataInicio).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">Nenhum processo registrado.</p>
                                )}
                            </div>
                        </section>

                        {/* Resumo Financeiro */}
                        <section className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                                <DollarSign size={16} /> Resumo Financeiro
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-card border border-border rounded-lg shadow-sm">
                                    <p className="text-xs text-muted-foreground mb-1">Valor Total em Contratos</p>
                                    <p className="text-sm font-bold text-foreground">{formatCurrency(cliente.valorTotalVendas)}</p>
                                </div>
                                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                                    <p className="text-xs text-blue-600 mb-1">Comissão Associada</p>
                                    <p className="text-sm font-bold text-blue-700 dark:text-blue-400">{formatCurrency(cliente.comissaoAReceber)}</p>
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
                            onClick={() => onEdit(cliente)}
                            className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            <Edit size={16} />
                            Editar Cliente
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
