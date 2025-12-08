import { Plus, Shield, Users, Edit2, Trash2 } from 'lucide-react';
import type { Role } from '../../data/mockRoles';
import { motion } from 'framer-motion';

interface RolesListProps {
    roles: Role[];
    selectedRole: Role | null;
    onSelectRole: (role: Role) => void;
    onNewRole: () => void;
    onEditRole: (role: Role) => void;
    onDeleteRole: (roleId: string) => void;
}

export const RolesList = ({ roles, selectedRole, onSelectRole, onNewRole, onEditRole, onDeleteRole }: RolesListProps) => {
    return (
        <div className="h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/10">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Shield size={18} className="text-primary" />
                    Papéis
                </h3>
                <button
                    onClick={onNewRole}
                    className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    title="Novo Papel"
                >
                    <Plus size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {roles.map((role) => (
                    <motion.div
                        key={role.id}
                        layoutId={role.id}
                        onClick={() => onSelectRole(role)}
                        className={`
              group relative p-4 rounded-xl cursor-pointer transition-all border
              ${selectedRole?.id === role.id
                                ? 'bg-primary/5 border-primary/30 shadow-md'
                                : 'bg-card border-transparent hover:bg-muted/50 hover:border-border/50'
                            }
            `}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className={`font-bold text-sm tracking-tight ${selectedRole?.id === role.id ? 'text-primary' : 'text-foreground'}`}>
                                {role.nome}
                            </span>
                            {role.isSystem ? (
                                <span className="text-[10px] font-bold tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                                    SISTEMA
                                </span>
                            ) : (
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onEditRole(role); }}
                                        className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDeleteRole(role.id); }}
                                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                            {role.descricao}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                                <Users size={12} />
                                <span>{role.userCount || 0} usuários</span>
                            </div>
                        </div>

                        {selectedRole?.id === role.id && (
                            <motion.div
                                layoutId="active-indicator"
                                className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
