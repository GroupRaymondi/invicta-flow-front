export type ContratoStatus =
    | 'rascunho'
    | 'em_analise'
    | 'assinado'
    | 'em_andamento'
    | 'concluido'
    | 'cancelado';

export interface Contrato {
    id: string;
    numero: string;
    clienteNome: string;
    clienteEmail?: string;
    clienteTelefone?: string;
    clientePais?: string;
    clienteCidade?: string;
    tipo: string;
    status: ContratoStatus;
    responsavel: string;
    valorTotal: number;
    valorPago: number;
    dataCriacao: string; // ISO
    dataPrevistaConclusao?: string; // ISO
    origem?: string;
    observacoes?: string;
}

export const mockContratos: Contrato[] = [
    {
        id: '1',
        numero: 'CTR-2024-001',
        clienteNome: 'João Silva',
        clienteEmail: 'joao.silva@email.com',
        clienteTelefone: '+55 11 99999-9999',
        clientePais: 'Brasil',
        clienteCidade: 'São Paulo',
        tipo: 'EB-2 NIW',
        status: 'em_andamento',
        responsavel: 'Dr. Lucas Raymondi',
        valorTotal: 25000,
        valorPago: 12500,
        dataCriacao: '2024-01-15T10:00:00Z',
        dataPrevistaConclusao: '2024-12-15T10:00:00Z',
        origem: 'Instagram'
    },
    {
        id: '2',
        numero: 'CTR-2024-002',
        clienteNome: 'Maria Oliveira',
        clienteEmail: 'maria.oliveira@email.com',
        clienteTelefone: '+55 21 98888-8888',
        clientePais: 'Brasil',
        clienteCidade: 'Rio de Janeiro',
        tipo: 'Visto Estudante',
        status: 'concluido',
        responsavel: 'Dra. Ana Silva',
        valorTotal: 5000,
        valorPago: 5000,
        dataCriacao: '2024-02-10T14:30:00Z',
        dataPrevistaConclusao: '2024-05-10T14:30:00Z',
        origem: 'Site'
    },
    {
        id: '3',
        numero: 'CTR-2024-003',
        clienteNome: 'Carlos Souza',
        clienteEmail: 'carlos.souza@email.com',
        clienteTelefone: '+1 305 555-0123',
        clientePais: 'EUA',
        clienteCidade: 'Miami',
        tipo: 'EB-3',
        status: 'em_analise',
        responsavel: 'Dr. Lucas Raymondi',
        valorTotal: 30000,
        valorPago: 0,
        dataCriacao: '2024-03-05T09:15:00Z',
        dataPrevistaConclusao: '2025-03-05T09:15:00Z',
        origem: 'Indicação'
    },
    {
        id: '4',
        numero: 'CTR-2024-004',
        clienteNome: 'Ana Costa',
        clienteEmail: 'ana.costa@email.com',
        clienteTelefone: '+55 31 97777-7777',
        clientePais: 'Brasil',
        clienteCidade: 'Belo Horizonte',
        tipo: 'Turismo',
        status: 'rascunho',
        responsavel: 'Consultor A',
        valorTotal: 2000,
        valorPago: 0,
        dataCriacao: '2024-05-20T16:45:00Z',
        dataPrevistaConclusao: '2024-06-20T16:45:00Z',
        origem: 'Google Ads'
    },
    {
        id: '5',
        numero: 'CTR-2024-005',
        clienteNome: 'Pedro Santos',
        clienteEmail: 'pedro.santos@email.com',
        clienteTelefone: '+351 91 234 5678',
        clientePais: 'Portugal',
        clienteCidade: 'Lisboa',
        tipo: 'EB-2 NIW',
        status: 'assinado',
        responsavel: 'Consultor B',
        valorTotal: 25000,
        valorPago: 5000,
        dataCriacao: '2024-06-01T11:20:00Z',
        dataPrevistaConclusao: '2024-08-01T11:20:00Z',
        origem: 'Instagram'
    },
    {
        id: '6',
        numero: 'CTR-2024-006',
        clienteNome: 'Fernanda Lima',
        clienteEmail: 'fernanda.lima@email.com',
        clienteTelefone: '+55 41 99988-7766',
        clientePais: 'Brasil',
        clienteCidade: 'Curitiba',
        tipo: 'EB-1A',
        status: 'cancelado',
        responsavel: 'Parceiro X',
        valorTotal: 40000,
        valorPago: 0,
        dataCriacao: '2024-06-15T13:00:00Z',
        dataPrevistaConclusao: '2024-08-15T13:00:00Z',
        origem: 'Indicação'
    }
];

export const mockConsultores = [
    'Dr. Lucas Raymondi',
    'Dra. Ana Silva',
    'Consultor A',
    'Consultor B',
    'Parceiro X'
];

export const mockTiposContrato = [
    'EB-2 NIW',
    'EB-3',
    'Visto Estudante',
    'Turismo',
    'EB-1A',
    'Trabalho'
];
