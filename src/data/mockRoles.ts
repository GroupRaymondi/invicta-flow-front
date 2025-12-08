// import type { RoleId } from './mockUsers';

export type PermissionModule = 'dashboard' | 'crm' | 'financeiro' | 'usuarios' | 'configuracoes' | 'relatorios';
export type PermissionAction = 'visualizar' | 'criar' | 'editar' | 'excluir' | 'exportar';

export interface Role {
    id: string;
    nome: string;
    descricao?: string;
    isSystem?: boolean;
    userCount?: number;
    permissoes: Record<string, PermissionAction[]>;
}

export const mockRoles: Role[] = [
    {
        id: 'admin',
        nome: 'Administrador',
        descricao: 'Acesso total a todas as funcionalidades do sistema.',
        isSystem: true,
        userCount: 1,
        permissoes: {
            'dashboard': ['visualizar', 'criar', 'editar', 'excluir', 'exportar'],
            'crm': ['visualizar', 'criar', 'editar', 'excluir', 'exportar'],
            'financeiro': ['visualizar', 'criar', 'editar', 'excluir', 'exportar'],
            'usuarios': ['visualizar', 'criar', 'editar', 'excluir', 'exportar'],
            'configuracoes': ['visualizar', 'criar', 'editar', 'excluir', 'exportar'],
            'relatorios': ['visualizar', 'criar', 'editar', 'excluir', 'exportar']
        }
    },
    {
        id: 'gestor',
        nome: 'Gestor',
        descricao: 'Gerencia equipes e visualiza relatórios gerenciais.',
        isSystem: false,
        userCount: 1,
        permissoes: {
            'dashboard': ['visualizar', 'exportar'],
            'crm': ['visualizar', 'criar', 'editar', 'exportar'],
            'financeiro': ['visualizar', 'exportar'],
            'relatorios': ['visualizar', 'exportar']
        }
    },
    {
        id: 'financeiro',
        nome: 'Financeiro',
        descricao: 'Acesso aos módulos financeiros e de comissões.',
        isSystem: false,
        userCount: 0,
        permissoes: {
            'dashboard': ['visualizar'],
            'financeiro': ['visualizar', 'criar', 'editar', 'exportar'],
            'relatorios': ['visualizar', 'exportar']
        }
    },
    {
        id: 'vendas',
        nome: 'Vendas',
        descricao: 'Focado em CRM e gestão de clientes.',
        isSystem: false,
        userCount: 1,
        permissoes: {
            'dashboard': ['visualizar'],
            'crm': ['visualizar', 'criar', 'editar']
        }
    },
    {
        id: 'operacional',
        nome: 'Operacional',
        descricao: 'Executa processos e atualiza status de contratos.',
        isSystem: false,
        userCount: 1,
        permissoes: {
            'dashboard': ['visualizar'],
            'crm': ['visualizar', 'editar']
        }
    },
    {
        id: 'readOnly',
        nome: 'Somente Leitura',
        descricao: 'Apenas visualização de dados, sem permissão de edição.',
        isSystem: false,
        userCount: 1,
        permissoes: {
            'dashboard': ['visualizar'],
            'crm': ['visualizar'],
            'financeiro': ['visualizar'],
            'relatorios': ['visualizar']
        }
    }
];
