import { X, Briefcase } from 'lucide-react';
import type { Cliente } from '../../data/mockClientes';

interface ComissaoDetalhesModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientes: Cliente[];
    totalComissao: number;
}

export const ComissaoDetalhesModal = ({ isOpen, onClose, clientes, totalComissao }: ComissaoDetalhesModalProps) => {
    if (!isOpen) return null;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-background border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-border bg-background">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <Briefcase size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-foreground">Detalhamento de Comissão</h2>
                                <p className="text-sm text-muted-foreground">Comissões a receber dos clientes listados.</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 border-b border-border bg-muted/10">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total a Receber</p>
                        <h3 className="text-3xl font-bold text-foreground">{formatCurrency(totalComissao)}</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-0">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-muted-foreground font-medium sticky top-0">
                                <tr>
                                    <th className="px-6 py-3">Cliente</th>
                                    <th className="px-6 py-3">Responsável</th>
                                    <th className="px-6 py-3 text-right">Comissão</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {clientes.map((client) => (
                                    <tr key={client.id} className="hover:bg-muted/30">
                                        <td className="px-6 py-3 font-medium">{client.nome}</td>
                                        <td className="px-6 py-3 text-muted-foreground">{client.responsavel}</td>
                                        <td className="px-6 py-3 text-right font-medium">{formatCurrency(client.comissaoAReceber)}</td>
                                        <td className="px-6 py-3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-500">
                                                Pendente
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-border bg-background flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-background border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
