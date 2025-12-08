import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { mockConsultores, mockTiposContrato, type Contrato, type ContratoStatus } from '../../data/mockContratos';

interface ContratoFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (contrato: Partial<Contrato>) => void;
    initialData?: Contrato | null;
}

export const ContratoFormModal = ({ isOpen, onClose, onSave, initialData }: ContratoFormModalProps) => {
    const [formData, setFormData] = useState<Partial<Contrato>>({
        clienteNome: '',
        tipo: '',
        responsavel: '',
        valorTotal: 0,
        status: 'rascunho',
        dataCriacao: new Date().toISOString().split('T')[0],
        dataPrevistaConclusao: '',
        observacoes: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                dataCriacao: initialData.dataCriacao.split('T')[0],
                dataPrevistaConclusao: initialData.dataPrevistaConclusao ? initialData.dataPrevistaConclusao.split('T')[0] : ''
            });
        } else {
            setFormData({
                clienteNome: '',
                tipo: mockTiposContrato[0],
                responsavel: mockConsultores[0],
                valorTotal: 0,
                status: 'rascunho',
                dataCriacao: new Date().toISOString().split('T')[0],
                dataPrevistaConclusao: '',
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
                            {initialData ? 'Editar Contrato' : 'Novo Contrato'}
                        </h2>
                        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Cliente */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Cliente</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.clienteNome}
                                    onChange={(e) => setFormData({ ...formData, clienteNome: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Nome do cliente"
                                />
                            </div>

                            {/* Tipo de Contrato */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Tipo de Contrato</label>
                                <select
                                    required
                                    value={formData.tipo}
                                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    <option value="" disabled>Selecione...</option>
                                    {mockTiposContrato.map((tipo) => (
                                        <option key={tipo} value={tipo}>{tipo}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Responsável */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Responsável</label>
                                <select
                                    required
                                    value={formData.responsavel}
                                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    <option value="" disabled>Selecione...</option>
                                    {mockConsultores.map((consultor) => (
                                        <option key={consultor} value={consultor}>{consultor}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Valor Total */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Valor Total (U$)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.valorTotal}
                                    onChange={(e) => setFormData({ ...formData, valorTotal: parseFloat(e.target.value) })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Status Inicial</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ContratoStatus })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    <option value="rascunho">Rascunho</option>
                                    <option value="em_analise">Em Análise</option>
                                    <option value="assinado">Assinado</option>
                                    <option value="em_andamento">Em Andamento</option>
                                    <option value="concluido">Concluído</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                            </div>

                            {/* Data Início */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Data de Início</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.dataCriacao}
                                    onChange={(e) => setFormData({ ...formData, dataCriacao: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            {/* Data Previsão */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Previsão de Conclusão</label>
                                <input
                                    type="date"
                                    value={formData.dataPrevistaConclusao}
                                    onChange={(e) => setFormData({ ...formData, dataPrevistaConclusao: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
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
                                Salvar Contrato
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
