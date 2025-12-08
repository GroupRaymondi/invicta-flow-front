import { useState } from 'react';
import { Plus } from 'lucide-react';
import { LancamentosTable } from './LancamentosTable';
import { CommissionFormModal } from './CommissionFormModal';
import { mockComissoes } from '../../../data/mockComissoesData';
import type { Comissao } from '../../../data/mockComissoesData';

interface LancamentosTabProps {
    hasData: boolean;
}

export const LancamentosTab = ({ }: LancamentosTabProps) => {
    const [commissions, setCommissions] = useState<Comissao[]>(mockComissoes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCommission, setEditingCommission] = useState<Comissao | null>(null);

    const handleNewEntry = () => {
        setEditingCommission(null);
        setIsModalOpen(true);
    };

    const handleEditEntry = (commission: Comissao) => {
        setEditingCommission(commission);
        setIsModalOpen(true);
    };

    const handleSaveEntry = (data: Partial<Comissao>) => {
        if (editingCommission) {
            // Update existing
            setCommissions(prev => prev.map(c => c.id === editingCommission.id ? { ...c, ...data } as Comissao : c));
        } else {
            // Create new
            const newCommission: Comissao = {
                ...data as Comissao,
                id: Math.random().toString(36).substr(2, 9),
                criadoEm: new Date().toISOString()
            };
            setCommissions(prev => [newCommission, ...prev]);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Lançamentos de Comissão</h3>
                    <p className="text-sm text-muted-foreground">Gerencie todos os lançamentos de comissões do sistema.</p>
                </div>
                <button
                    onClick={handleNewEntry}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow active:scale-95"
                >
                    <Plus size={16} />
                    Novo Lançamento
                </button>
            </div>

            <LancamentosTable
                commissions={commissions}
                onEdit={handleEditEntry}
            />

            <CommissionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEntry}
                initialData={editingCommission}
            />
        </div>
    );
};
