import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { mockVendedores } from '../../../data/mockComissoesData';
import type { Comissao, CommissionStatus } from '../../../data/mockComissoesData';

interface CommissionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (commission: Partial<Comissao>) => void;
    initialData?: Comissao | null;
}

export const CommissionFormModal = ({ isOpen, onClose, onSave, initialData }: CommissionFormModalProps) => {
    const [formData, setFormData] = useState<Partial<Comissao>>({
        vendedorId: '',
        cliente: '',
        contrato: '',
        tipoContrato: '',
        valorContrato: 0,
        percentual: 0,
        valorComissao: 0,
        status: 'em_aberto',
        dataPrevistaPagamento: new Date().toISOString().split('T')[0],
        observacoes: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                dataPrevistaPagamento: initialData.dataPrevistaPagamento.split('T')[0],
                dataPagamento: initialData.dataPagamento ? initialData.dataPagamento.split('T')[0] : undefined
            });
        } else {
            // Reset form for new entry
            setFormData({
                vendedorId: mockVendedores[0]?.id || '',
                cliente: '',
                contrato: '',
                tipoContrato: '',
                valorContrato: 0,
                percentual: 0,
                valorComissao: 0,
                status: 'em_aberto',
                dataPrevistaPagamento: new Date().toISOString().split('T')[0],
                observacoes: ''
            });
        }
    }, [initialData, isOpen]);

    // Auto-calculate commission value
    useEffect(() => {
        if (formData.valorContrato && formData.percentual) {
            const calculated = (formData.valorContrato * formData.percentual) / 100;
            setFormData(prev => ({ ...prev, valorComissao: calculated }));
        }
    }, [formData.valorContrato, formData.percentual]);

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
                            {initialData ? 'Editar Lançamento' : 'Novo Lançamento de Comissão'}
                        </h2>
                        <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Vendedor */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Vendedor / Parceiro</label>
                                <select
                                    required
                                    value={formData.vendedorId}
                                    onChange={(e) => setFormData({ ...formData, vendedorId: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    <option value="" disabled>Selecione...</option>
                                    {mockVendedores.map((v) => (
                                        <option key={v.id} value={v.id}>{v.nome}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Cliente */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Cliente</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.cliente}
                                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Nome do cliente"
                                />
                            </div>

                            {/* Contrato */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Nº Contrato</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.contrato}
                                    onChange={(e) => setFormData({ ...formData, contrato: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Ex: CTR-2024-001"
                                />
                            </div>

                            {/* Tipo Contrato */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Tipo de Contrato</label>
                                <input
                                    type="text"
                                    value={formData.tipoContrato}
                                    onChange={(e) => setFormData({ ...formData, tipoContrato: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Ex: EB-2 NIW"
                                />
                            </div>

                            {/* Valor Contrato */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Valor do Contrato (U$)</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.valorContrato}
                                    onChange={(e) => setFormData({ ...formData, valorContrato: parseFloat(e.target.value) })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            {/* Percentual */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">% Comissão</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={formData.percentual}
                                    onChange={(e) => setFormData({ ...formData, percentual: parseFloat(e.target.value) })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            {/* Valor Comissão (Read only) */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Valor Comissão (Calculado)</label>
                                <div className="w-full px-3 py-2 bg-muted/30 border border-border rounded-lg font-medium text-foreground">
                                    {formData.valorComissao?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CommissionStatus })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                >
                                    <option value="em_aberto">Em Aberto</option>
                                    <option value="paga">Paga</option>
                                    <option value="atrasada">Atrasada</option>
                                </select>
                            </div>

                            {/* Data Previsão */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Data Prevista Pagamento</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.dataPrevistaPagamento}
                                    onChange={(e) => setFormData({ ...formData, dataPrevistaPagamento: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            {/* Data Pagamento (Opcional) */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Data Pagamento (Se realizado)</label>
                                <input
                                    type="date"
                                    value={formData.dataPagamento || ''}
                                    onChange={(e) => setFormData({ ...formData, dataPagamento: e.target.value })}
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
                                Salvar Lançamento
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
