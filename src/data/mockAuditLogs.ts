export interface AuditLogEntry {
    id: string;
    usuarioId: string;
    usuarioNome: string;
    usuarioEmail: string;
    usuarioRole: string;
    acao: string;
    entidade: 'cliente' | 'contrato' | 'processo' | 'financeiro' | 'configuracoes' | 'outro';
    entidadeId: string;
    descricao: string;
    dadosAntes?: Record<string, unknown> | null;
    dadosDepois?: Record<string, unknown> | null;
    ip: string;
    device: string;
    criadoEm: string;
}

export const mockAuditLogs: AuditLogEntry[] = [
    {
        id: 'log-001',
        usuarioId: 'usr-101',
        usuarioNome: 'Lucas Raymondi',
        usuarioEmail: 'lucas@invicta.com',
        usuarioRole: 'Admin',
        acao: 'Criação de Cliente',
        entidade: 'cliente',
        entidadeId: 'cli-554',
        descricao: 'Novo cliente cadastrado: Ana Silva',
        dadosAntes: null,
        dadosDepois: { nome: 'Ana Silva', email: 'ana.silva@email.com', status: 'lead' },
        ip: '192.168.1.10',
        device: 'Chrome / macOS',
        criadoEm: '2024-11-21T14:30:00Z'
    },
    {
        id: 'log-002',
        usuarioId: 'usr-102',
        usuarioNome: 'Fernanda Costa',
        usuarioEmail: 'fernanda@invicta.com',
        usuarioRole: 'Manager',
        acao: 'Atualização de Status',
        entidade: 'processo',
        entidadeId: 'proc-998',
        descricao: 'Status do processo alterado para "Em Análise"',
        dadosAntes: { status: 'triagem' },
        dadosDepois: { status: 'em_analise' },
        ip: '201.55.44.33',
        device: 'Safari / iOS',
        criadoEm: '2024-11-21T13:15:00Z'
    },
    {
        id: 'log-003',
        usuarioId: 'usr-101',
        usuarioNome: 'Lucas Raymondi',
        usuarioEmail: 'lucas@invicta.com',
        usuarioRole: 'Admin',
        acao: 'Exclusão de Contrato',
        entidade: 'contrato',
        entidadeId: 'ctr-221',
        descricao: 'Contrato removido permanentemente',
        dadosAntes: { id: 'ctr-221', valor: 5000, cliente: 'Carlos Oliveira' },
        dadosDepois: null,
        ip: '192.168.1.10',
        device: 'Chrome / macOS',
        criadoEm: '2024-11-20T16:45:00Z'
    },
    {
        id: 'log-004',
        usuarioId: 'usr-103',
        usuarioNome: 'Roberto Almeida',
        usuarioEmail: 'roberto@invicta.com',
        usuarioRole: 'Sales',
        acao: 'Envio de Proposta',
        entidade: 'financeiro',
        entidadeId: 'prop-776',
        descricao: 'Proposta comercial enviada para Mariana Santos',
        dadosAntes: null,
        dadosDepois: { id: 'prop-776', valor: 12000, status: 'enviada' },
        ip: '177.22.11.55',
        device: 'Firefox / Windows',
        criadoEm: '2024-11-20T10:00:00Z'
    },
    {
        id: 'log-005',
        usuarioId: 'usr-101',
        usuarioNome: 'Lucas Raymondi',
        usuarioEmail: 'lucas@invicta.com',
        usuarioRole: 'Admin',
        acao: 'Alteração de Configuração',
        entidade: 'configuracoes',
        entidadeId: 'sys-conf',
        descricao: 'Alteração na taxa de juros padrão',
        dadosAntes: { taxa_juros: 2.5 },
        dadosDepois: { taxa_juros: 3.0 },
        ip: '192.168.1.10',
        device: 'Chrome / macOS',
        criadoEm: '2024-11-19T18:20:00Z'
    },
    {
        id: 'log-006',
        usuarioId: 'usr-102',
        usuarioNome: 'Fernanda Costa',
        usuarioEmail: 'fernanda@invicta.com',
        usuarioRole: 'Manager',
        acao: 'Login no Sistema',
        entidade: 'outro',
        entidadeId: 'session-885',
        descricao: 'Login realizado com sucesso',
        dadosAntes: null,
        dadosDepois: null,
        ip: '201.55.44.33',
        device: 'Safari / iOS',
        criadoEm: '2024-11-19T09:00:00Z'
    },
    {
        id: 'log-007',
        usuarioId: 'usr-104',
        usuarioNome: 'Julia Pereira',
        usuarioEmail: 'julia@invicta.com',
        usuarioRole: 'Support',
        acao: 'Edição de Cliente',
        entidade: 'cliente',
        entidadeId: 'cli-554',
        descricao: 'Atualização de telefone de contato',
        dadosAntes: { telefone: '(11) 9999-8888' },
        dadosDepois: { telefone: '(11) 9777-6666' },
        ip: '189.33.22.11',
        device: 'Edge / Windows',
        criadoEm: '2024-11-18T15:30:00Z'
    },
    {
        id: 'log-008',
        usuarioId: 'usr-101',
        usuarioNome: 'Lucas Raymondi',
        usuarioEmail: 'lucas@invicta.com',
        usuarioRole: 'Admin',
        acao: 'Exportação de Relatório',
        entidade: 'financeiro',
        entidadeId: 'rep-fin-nov',
        descricao: 'Exportação do relatório financeiro de Novembro',
        dadosAntes: null,
        dadosDepois: null,
        ip: '192.168.1.10',
        device: 'Chrome / macOS',
        criadoEm: '2024-11-18T11:00:00Z'
    }
];
