import { Check, RefreshCw, Save, AlertTriangle } from 'lucide-react';
import { type Role, type PermissionModule, type PermissionAction } from '../../data/mockRoles';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RolePermissionsMatrixProps {
    role: Role | null;
    onSave: (roleId: string, permissions: Record<string, PermissionAction[]>) => void;
}

// Mock modules structure for the matrix
const MODULES: { id: PermissionModule; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'crm', label: 'CRM & Vendas' },
    { id: 'financeiro', label: 'Financeiro' },
    { id: 'usuarios', label: 'Usuários & Permissões' },
    { id: 'configuracoes', label: 'Configurações' },
    { id: 'relatorios', label: 'Relatórios' },
];

const ACTIONS: { id: PermissionAction; label: string }[] = [
    { id: 'visualizar', label: 'Visualizar' },
    { id: 'criar', label: 'Criar' },
    { id: 'editar', label: 'Editar' },
    { id: 'excluir', label: 'Excluir' },
    { id: 'exportar', label: 'Exportar' },
];

export const RolePermissionsMatrix = ({ role, onSave }: RolePermissionsMatrixProps) => {
    const [localPermissions, setLocalPermissions] = useState<Record<string, PermissionAction[]>>({});
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (role) {
            setLocalPermissions(role.permissoes);
            setIsDirty(false);
        }
    }, [role]);

    const handleTogglePermission = (moduleId: string, actionId: PermissionAction) => {
        if (!role) return;
        if (role.isSystem && role.nome === 'Admin') return; // Admin always has full access

        setLocalPermissions(prev => {
            const modulePerms = prev[moduleId] || [];
            const hasPerm = modulePerms.includes(actionId);

            let newModulePerms;
            if (hasPerm) {
                newModulePerms = modulePerms.filter(p => p !== actionId);
            } else {
                newModulePerms = [...modulePerms, actionId];
            }

            return {
                ...prev,
                [moduleId]: newModulePerms
            };
        });
        setIsDirty(true);
    };

    const handleToggleRow = (moduleId: string) => {
        if (!role || (role.isSystem && role.nome === 'Admin')) return;

        setLocalPermissions(prev => {
            const currentPerms = prev[moduleId] || [];
            const allActions = ACTIONS.map(a => a.id);

            // If has all, remove all. Otherwise, add all.
            const newPerms = currentPerms.length === allActions.length ? [] : allActions;

            return {
                ...prev,
                [moduleId]: newPerms
            };
        });
        setIsDirty(true);
    };

    const handleSave = () => {
        if (role) {
            onSave(role.id, localPermissions);
            setIsDirty(false);
        }
    };

    const handleReset = () => {
        if (role) {
            setLocalPermissions(role.permissoes);
            setIsDirty(false);
        }
    };

    if (!role) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground bg-card border border-border rounded-xl p-8 text-center">
                <div>
                    <AlertTriangle size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Selecione um papel à esquerda para visualizar e editar suas permissões.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/10">
                <div>
                    <h3 className="font-bold text-lg text-foreground">{role.nome}</h3>
                    <p className="text-sm text-muted-foreground">{role.descricao}</p>
                </div>

                <div className="flex items-center gap-2">
                    {isDirty && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2"
                        >
                            <button
                                onClick={handleReset}
                                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <RefreshCw size={14} /> Restaurar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 shadow-sm"
                            >
                                <Save size={14} /> Salvar Alterações
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Matrix */}
            <div className="flex-1 overflow-auto p-6">
                {role.isSystem && role.nome === 'Admin' && (
                    <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 text-sm flex items-center gap-2">
                        <AlertTriangle size={16} />
                        O papel de Administrador possui acesso total ao sistema e não pode ser modificado.
                    </div>
                )}

                <div className="border border-border rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/30 text-muted-foreground font-semibold text-xs uppercase tracking-wider border-b border-border">
                            <tr>
                                <th className="p-4 w-1/4">Módulo</th>
                                {ACTIONS.map(action => (
                                    <th key={action.id} className="p-4 text-center w-[15%]">{action.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {MODULES.map(module => {
                                const modulePerms = localPermissions[module.id] || [];
                                const isAllSelected = ACTIONS.every(a => modulePerms.includes(a.id));

                                return (
                                    <tr key={module.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleToggleRow(module.id)}
                                                    className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isAllSelected
                                                        ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                                                        : 'bg-background border-muted-foreground/30 hover:border-primary text-transparent'
                                                        }`}
                                                    disabled={role.isSystem && role.nome === 'Admin'}
                                                    title="Selecionar todos"
                                                >
                                                    <Check size={12} strokeWidth={3} />
                                                </button>
                                                {module.label}
                                            </div>
                                        </td>
                                        {ACTIONS.map(action => {
                                            const isSelected = modulePerms.includes(action.id);
                                            return (
                                                <td key={action.id} className="p-4 text-center">
                                                    <button
                                                        onClick={() => handleTogglePermission(module.id, action.id)}
                                                        disabled={role.isSystem && role.nome === 'Admin'}
                                                        className={`
                              w-5 h-5 rounded border inline-flex items-center justify-center transition-all duration-200
                              ${isSelected
                                                                ? 'bg-primary border-primary text-primary-foreground shadow-sm scale-100'
                                                                : 'bg-background border-muted-foreground/30 text-transparent hover:border-primary scale-90 hover:scale-100'
                                                            }
                              ${(role.isSystem && role.nome === 'Admin') ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                                                    >
                                                        <Check size={12} strokeWidth={3} />
                                                    </button>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
