import { X } from 'lucide-react';
import type { Role } from '../../data/mockRoles';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (role: Partial<Role>) => void;
    role: Role | null;
}

export const RoleFormModal = ({ isOpen, onClose, onSave, role }: RoleFormModalProps) => {
    const [formData, setFormData] = useState<Partial<Role>>({
        nome: '',
        descricao: '',
        isSystem: false
    });

    useEffect(() => {
        if (role) {
            setFormData(role);
        } else {
            setFormData({
                nome: '',
                descricao: '',
                isSystem: false
            });
        }
    }, [role, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-background border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    <div className="p-6 border-b border-border flex items-center justify-between bg-muted/10">
                        <h2 className="text-lg font-bold text-foreground">
                            {role ? 'Editar Papel' : 'Novo Papel'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nome do Papel</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                placeholder="Ex: Gerente de Vendas"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Descrição</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm resize-none"
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                placeholder="Ex: Acesso total ao módulo de CRM e relatórios de vendas."
                            />
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
