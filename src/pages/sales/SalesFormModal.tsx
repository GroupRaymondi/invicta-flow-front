import { useState } from 'react';
import { X, Save } from 'lucide-react';
import type { ClientProcess } from '../../types/sales';

interface SalesFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<ClientProcess>) => void;
}

export const SalesFormModal = ({ isOpen, onClose, onSubmit }: SalesFormModalProps) => {
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        processName: 'EB-2 National Interest Waiver',
        paymentTotal: '',
        paymentDown: '',
        paymentInstallments: '1',
        paymentInstallmentValue: '',
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Auto-calculation logic
            if (name === 'paymentTotal' || name === 'paymentDown' || name === 'paymentInstallments') {
                const total = parseFloat(name === 'paymentTotal' ? value : prev.paymentTotal) || 0;
                const down = parseFloat(name === 'paymentDown' ? value : prev.paymentDown) || 0;
                const installments = parseInt(name === 'paymentInstallments' ? value : prev.paymentInstallments) || 1;

                if (installments > 0) {
                    const calculatedInstallment = (total - down) / installments;
                    newData.paymentInstallmentValue = calculatedInstallment.toFixed(2);
                }
            }

            return newData;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate internal process number
        const year = new Date().getFullYear();
        const randomId = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const internalProcessNumber = `PROC-${year}-${randomId}`;

        const newProcess: Partial<ClientProcess> = {
            clientName: formData.clientName,
            clientEmail: formData.clientEmail,
            clientPhone: formData.clientPhone,
            internalProcessNumber,
            totalAmount: parseFloat(formData.paymentTotal),
            installments: parseInt(formData.paymentInstallments),
            // Map other fields as needed for the mock/type
            status: 'WAITING_PAYMENT',
            paymentStatus: 'WAITING_PAYMENT',
            contractStatus: 'PENDING_GENERATION',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            processType: {
                id: 'custom',
                code: formData.processName.split(' ')[0],
                name: formData.processName
            }
        };

        onSubmit(newProcess);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-card w-full max-w-2xl rounded-xl shadow-xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground">Gerar Venda</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Client Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Informações do Cliente</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Nome Completo</label>
                                <input
                                    required
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Ex: João Silva"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">E-mail</label>
                                <input
                                    required
                                    type="email"
                                    name="clientEmail"
                                    value={formData.clientEmail}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Ex: joao@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Telefone</label>
                                <input
                                    required
                                    name="clientPhone"
                                    value={formData.clientPhone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Ex: (11) 99999-9999"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Process Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Dados do Processo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Nome do Processo</label>
                                <select
                                    name="processName"
                                    value={formData.processName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                >
                                    <option value="EB-2 National Interest Waiver">EB-2 National Interest Waiver</option>
                                    <option value="O-1 Visa">O-1 Visa</option>
                                    <option value="L-1 Intracompany Transferee">L-1 Intracompany Transferee</option>
                                    <option value="EB-1A Extraordinary Ability">EB-1A Extraordinary Ability</option>
                                    <option value="Family Based Petition">Family Based Petition</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Pagamento</h3>

                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Valor Total (USD)</label>
                                <input
                                    required
                                    type="number"
                                    name="paymentTotal"
                                    value={formData.paymentTotal}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Entrada (USD)</label>
                                <input
                                    type="number"
                                    name="paymentDown"
                                    value={formData.paymentDown}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Qtd. Parcelas</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    name="paymentInstallments"
                                    value={formData.paymentInstallments}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Valor Parcela (USD)</label>
                                <input
                                    readOnly
                                    name="paymentInstallmentValue"
                                    value={formData.paymentInstallmentValue}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-muted/50 text-muted-foreground cursor-not-allowed"
                                    placeholder="Calculado automaticamente"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Save size={16} />
                            Gerar Venda
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
