export type ClienteStatus = 'ativo' | 'pendente' | 'em_analise' | 'arquivado';

export interface Cliente {
    id: string;
    nome: string;
    email?: string;
    telefone?: string;
    tipoProcesso: string;
    status: ClienteStatus;
    responsavel?: string;
    origem?: string;
    valorTotalVendas: number;
    comissaoAReceber: number;
    dataCriacao: string; // ISO
    observacoes?: string;
    // Mock arrays for details
    processos?: { tipo: string; status: string; dataInicio: string }[];
    vendas?: { tipo: string; valor: number; data: string }[];
}

export const mockClientes: Cliente[] = [
    {
        id: '1',
        nome: 'Ana Silva',
        email: 'ana.silva@email.com',
        telefone: '+55 11 99999-9999',
        tipoProcesso: 'Visto de Trabalho',
        status: 'ativo',
        responsavel: 'Dr. Lucas Raymondi',
        origem: 'Instagram',
        valorTotalVendas: 15000,
        comissaoAReceber: 1500,
        dataCriacao: '2024-01-10T10:00:00Z',
        processos: [
            { tipo: 'Visto de Trabalho', status: 'Em Andamento', dataInicio: '2024-01-10' }
        ],
        vendas: [
            { tipo: 'Contrato Inicial', valor: 15000, data: '2024-01-10' }
        ]
    },
    {
        id: '2',
        nome: 'Carlos Oliveira',
        email: 'carlos.o@email.com',
        telefone: '+55 11 98888-8888',
        tipoProcesso: 'Cidadania',
        status: 'pendente',
        responsavel: 'Dra. Ana Silva',
        origem: 'Indicação',
        valorTotalVendas: 5000,
        comissaoAReceber: 500,
        dataCriacao: '2024-02-15T14:30:00Z',
        processos: [
            { tipo: 'Cidadania Italiana', status: 'Análise de Documentos', dataInicio: '2024-02-15' }
        ],
        vendas: [
            { tipo: 'Assessoria', valor: 5000, data: '2024-02-15' }
        ]
    },
    {
        id: '3',
        nome: 'Mariana Santos',
        email: 'mari.santos@email.com',
        telefone: '+55 11 97777-7777',
        tipoProcesso: 'Green Card',
        status: 'ativo',
        responsavel: 'Dr. Lucas Raymondi',
        origem: 'Site',
        valorTotalVendas: 25000,
        comissaoAReceber: 2500,
        dataCriacao: '2024-03-05T09:15:00Z',
        processos: [
            { tipo: 'EB-2 NIW', status: 'Protocolado', dataInicio: '2024-03-05' }
        ],
        vendas: [
            { tipo: 'Contrato EB-2', valor: 25000, data: '2024-03-05' }
        ]
    },
    {
        id: '4',
        nome: 'Roberto Costa',
        email: 'roberto.c@email.com',
        telefone: '+55 11 96666-6666',
        tipoProcesso: 'Visto de Turista',
        status: 'arquivado',
        responsavel: 'Consultor A',
        origem: 'Google Ads',
        valorTotalVendas: 2000,
        comissaoAReceber: 200,
        dataCriacao: '2023-11-20T16:45:00Z',
        processos: [
            { tipo: 'B1/B2', status: 'Concluído', dataInicio: '2023-11-20' }
        ],
        vendas: [
            { tipo: 'Assessoria Visto', valor: 2000, data: '2023-11-20' }
        ]
    },
    {
        id: '5',
        nome: 'Julia Lima',
        email: 'julia.lima@email.com',
        telefone: '+55 11 95555-5555',
        tipoProcesso: 'Visto de Estudante',
        status: 'ativo',
        responsavel: 'Consultor B',
        origem: 'Instagram',
        valorTotalVendas: 4500,
        comissaoAReceber: 450,
        dataCriacao: '2024-04-01T11:20:00Z',
        processos: [
            { tipo: 'F-1', status: 'Aguardando Entrevista', dataInicio: '2024-04-01' }
        ],
        vendas: [
            { tipo: 'Assessoria Estudante', valor: 4500, data: '2024-04-01' }
        ]
    }
];

export const mockTiposProcesso = [
    'Visto de Trabalho',
    'Cidadania',
    'Green Card',
    'Visto de Turista',
    'Visto de Estudante',
    'Outros'
];

export const mockOrigens = [
    'Instagram',
    'Indicação',
    'Site',
    'Google Ads',
    'Facebook Ads',
    'Outros'
];
