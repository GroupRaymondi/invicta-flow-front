import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { mockConsultores } from '../../data/mockContratos'; // Reusing consultants
import { mockTiposProcesso, mockOrigens, type Cliente, type ClienteStatus } from '../../data/mockClientes';

interface ClienteFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (cliente: Partial<Cliente>) => void;
    initialData?: Cliente | null;
}

export const ClienteFormModal = ({ isOpen, onClose, onSave, initialData }: ClienteFormModalProps) => {
    const [formData, setFormData] = useState<Partial<Cliente>>({
        nome: '',
        email: '',
        telefone: '',
        tipoProcesso: '',
        status: 'ativo',
        responsavel: '',
        origem: '',
        observacoes: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                nome: '',
                email: '',
                telefone: '',
                tipoProcesso: mockTiposProcesso[0],
                status: 'ativo',
                responsavel: mockConsultores[0],
                origem: mockOrigens[0],
                observacoes: ''
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-background border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background z-10">
                        <h2 className="text-xl font-bold text-foreground">
                            {initialData ? 'Editar Cliente' : 'Novo Cliente'}
                        </h2>
                        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nome */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-foreground">Nome Completo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Ex: João Silva"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="email@exemplo.com"
                                />
                            </div>

                            {/* Telefone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Telefone</label>
                                <input
                                    type="tel"
                                    value={formData.telefone}
                                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="+55 11 99999-9999"
                                />
                            </div>

                            {/* Tipo de Processo */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Tipo de Processo</label>
                                <select
                                    value={formData.tipoProcesso}
                                    onChange={(e) => setFormData({ ...formData, tipoProcesso: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    {mockTiposProcesso.map((tipo) => (
                                        <option key={tipo} value={tipo}>{tipo}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ClienteStatus })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    <option value="ativo">Ativo</option>
                                    <option value="pendente">Pendente</option>
                                    <option value="em_analise">Em Análise</option>
                                    <option value="arquivado">Arquivado</option>
                                </select>
                            </div>

                            {/* Responsável */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Responsável</label>
                                <select
                                    value={formData.responsavel}
                                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    {mockConsultores.map((consultor) => (
                                        <option key={consultor} value={consultor}>{consultor}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Origem */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Origem</label>
                                <select
                                    value={formData.origem}
                                    onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    {mockOrigens.map((origem) => (
                                        <option key={origem} value={origem}>{origem}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Observações */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Observações</label>
                            <textarea
                                rows={3}
                                value={formData.observacoes || ''}
                                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                placeholder="Detalhes adicionais..."
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2"
                            >
                                <Save size={16} />
                                Salvar Cliente
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
