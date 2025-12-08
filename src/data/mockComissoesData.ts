export type CommissionStatus = 'paga' | 'em_aberto' | 'atrasada';

export interface Vendedor {
    id: string;
    nome: string;
    email?: string;
    avatar?: string;
    totalComissoes?: number;
}

export interface Comissao {
    id: string;
    vendedorId: string;
    cliente: string;
    contrato: string;
    tipoContrato: string;
    valorContrato: number;
    percentual: number;
    valorComissao: number;
    status: CommissionStatus;
    dataPrevistaPagamento: string; // ISO
    dataPagamento?: string; // ISO opcional
    criadoEm: string; // ISO
    observacoes?: string;
}

export interface KpiCardData {
    id: string;
    label: string;
    value: number | string;
    changePercent?: number;
    trend?: 'up' | 'down' | 'neutral';
    prefix?: string;
    suffix?: string;
}

export interface ChartDataPoint {
    name: string;
    value: number;
    value2?: number;
}

// --- MOCK DATA ---

export const mockVendedores: Vendedor[] = [
    { id: '1', nome: 'Dr. Lucas Raymondi', email: 'lucas@invicta.com', totalComissoes: 45000 },
    { id: '2', nome: 'Dra. Ana Silva', email: 'ana@invicta.com', totalComissoes: 32000 },
    { id: '3', nome: 'Consultor A', email: 'consultor.a@parceiro.com', totalComissoes: 15000 },
    { id: '4', nome: 'Consultor B', email: 'consultor.b@parceiro.com', totalComissoes: 8500 },
    { id: '5', nome: 'Parceiro Externo X', email: 'contato@parceirox.com', totalComissoes: 12000 },
];

export const mockComissoes: Comissao[] = [
    {
        id: '101',
        vendedorId: '1',
        cliente: 'João Silva',
        contrato: 'CTR-2024-001',
        tipoContrato: 'EB-2 NIW',
        valorContrato: 25000,
        percentual: 10,
        valorComissao: 2500,
        status: 'paga',
        dataPrevistaPagamento: '2024-02-15',
        dataPagamento: '2024-02-14',
        criadoEm: '2024-01-15'
    },
    {
        id: '102',
        vendedorId: '2',
        cliente: 'Maria Oliveira',
        contrato: 'CTR-2024-002',
        tipoContrato: 'Visto Estudante',
        valorContrato: 5000,
        percentual: 15,
        valorComissao: 750,
        status: 'paga',
        dataPrevistaPagamento: '2024-03-10',
        dataPagamento: '2024-03-10',
        criadoEm: '2024-02-10'
    },
    {
        id: '103',
        vendedorId: '3',
        cliente: 'Carlos Souza',
        contrato: 'CTR-2024-003',
        tipoContrato: 'EB-3',
        valorContrato: 30000,
        percentual: 10,
        valorComissao: 3000,
        status: 'em_aberto',
        dataPrevistaPagamento: '2024-07-15',
        criadoEm: '2024-03-05'
    },
    {
        id: '104',
        vendedorId: '1',
        cliente: 'Ana Costa',
        contrato: 'CTR-2024-004',
        tipoContrato: 'Turismo',
        valorContrato: 2000,
        percentual: 20,
        valorComissao: 400,
        status: 'atrasada',
        dataPrevistaPagamento: '2024-06-20',
        criadoEm: '2024-05-20'
    },
    {
        id: '105',
        vendedorId: '4',
        cliente: 'Pedro Santos',
        contrato: 'CTR-2024-005',
        tipoContrato: 'EB-2 NIW',
        valorContrato: 25000,
        percentual: 10,
        valorComissao: 2500,
        status: 'em_aberto',
        dataPrevistaPagamento: '2024-08-01',
        criadoEm: '2024-06-01'
    },
    {
        id: '106',
        vendedorId: '5',
        cliente: 'Fernanda Lima',
        contrato: 'CTR-2024-006',
        tipoContrato: 'EB-1A',
        valorContrato: 40000,
        percentual: 12,
        valorComissao: 4800,
        status: 'em_aberto',
        dataPrevistaPagamento: '2024-08-15',
        criadoEm: '2024-06-15'
    }
];

// Mock Data for Charts
export const mockComissoesPorMes: ChartDataPoint[] = [
    { name: 'Jan', value: 12000 },
    { name: 'Fev', value: 15000 },
    { name: 'Mar', value: 18000 },
    { name: 'Abr', value: 14000 },
    { name: 'Mai', value: 22000 },
    { name: 'Jun', value: 28000 },
];

export const mockComissoesPorVendedorChart: ChartDataPoint[] = [
    { name: 'Dr. Lucas', value: 45000 },
    { name: 'Dra. Ana', value: 32000 },
    { name: 'Consultor A', value: 15000 },
    { name: 'Parceiro X', value: 12000 },
    { name: 'Consultor B', value: 8500 },
];
