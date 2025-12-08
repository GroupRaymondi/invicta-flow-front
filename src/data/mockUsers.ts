export type RoleId = 'admin' | 'gestor' | 'financeiro' | 'vendas' | 'operacional' | 'readOnly' | string;

export interface User {
    id: string;
    nome: string;
    email: string;
    roleId: RoleId;
    status: 'ativo' | 'inativo' | 'convite_pendente';
    ultimoAcesso?: string; // ISO string
    criadoEm: string; // ISO string
}

export const mockUsers: User[] = [
    {
        id: 'usr-1',
        nome: 'Lucas Raymondi',
        email: 'lucas@invicta.com',
        roleId: 'admin',
        status: 'ativo',
        ultimoAcesso: '2024-11-21T14:30:00Z',
        criadoEm: '2024-01-15T09:00:00Z'
    },
    {
        id: 'usr-2',
        nome: 'Fernanda Costa',
        email: 'fernanda@invicta.com',
        roleId: 'gestor',
        status: 'ativo',
        ultimoAcesso: '2024-11-21T10:15:00Z',
        criadoEm: '2024-02-20T11:00:00Z'
    },
    {
        id: 'usr-3',
        nome: 'Roberto Almeida',
        email: 'roberto@invicta.com',
        roleId: 'vendas',
        status: 'ativo',
        ultimoAcesso: '2024-11-20T16:45:00Z',
        criadoEm: '2024-03-10T14:30:00Z'
    },
    {
        id: 'usr-4',
        nome: 'Julia Pereira',
        email: 'julia@invicta.com',
        roleId: 'operacional',
        status: 'inativo',
        ultimoAcesso: '2024-10-15T09:00:00Z',
        criadoEm: '2024-04-05T10:00:00Z'
    },
    {
        id: 'usr-5',
        nome: 'Novo Usuário',
        email: 'novo@invicta.com',
        roleId: 'readOnly',
        status: 'convite_pendente',
        criadoEm: '2024-11-21T15:00:00Z'
    }
];
