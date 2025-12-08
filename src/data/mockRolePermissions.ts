import type { RoleId } from './mockUsers';

export type ModuleKey =
    | 'dashboard'
    | 'crm'
    | 'financeiro'
    | 'contratos'
    | 'processos_contrato'
    | 'carteira_clientes'
    | 'comissoes'
    | 'relatorios'
    | 'permissoes_usuarios'
    | 'configuracoes'
    | 'auditoria';

export type PermissionAction =
    | 'visualizar'
    | 'criar'
    | 'editar'
    | 'excluir'
    | 'exportar'
    | 'aprovar'
    | 'gerenciar_permissoes';

export interface RolePermission {
    roleId: RoleId;
    module: ModuleKey;
    action: PermissionAction;
    allowed: boolean;
}

// Helper to generate default permissions
const generatePermissions = (roleId: RoleId, isAdmin: boolean = false): RolePermission[] => {
    const modules: ModuleKey[] = [
        'dashboard', 'crm', 'financeiro', 'contratos', 'processos_contrato',
        'carteira_clientes', 'comissoes', 'relatorios', 'permissoes_usuarios',
        'configuracoes', 'auditoria'
    ];

    const actions: PermissionAction[] = [
        'visualizar', 'criar', 'editar', 'excluir', 'exportar', 'aprovar', 'gerenciar_permissoes'
    ];

    const permissions: RolePermission[] = [];

    modules.forEach(module => {
        actions.forEach(action => {
            // Logic to determine if allowed based on role (simplified for mock)
            let allowed = isAdmin;

            if (!isAdmin) {
                if (roleId === 'readOnly' && action === 'visualizar') allowed = true;
                if (roleId === 'vendas' && (module === 'crm' || module === 'carteira_clientes') && action !== 'excluir') allowed = true;
                if (roleId === 'financeiro' && (module === 'financeiro' || module === 'comissoes')) allowed = true;
                if (roleId === 'gestor' && action !== 'excluir') allowed = true;
            }

            permissions.push({
                roleId,
                module,
                action,
                allowed
            });
        });
    });

    return permissions;
};

export const mockRolePermissions: RolePermission[] = [
    ...generatePermissions('admin', true),
    ...generatePermissions('gestor'),
    ...generatePermissions('financeiro'),
    ...generatePermissions('vendas'),
    ...generatePermissions('operacional'),
    ...generatePermissions('readOnly')
];
