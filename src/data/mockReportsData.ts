export type PeriodPreset = 'last7' | 'last30' | 'last90' | 'year' | 'custom';

export interface KpiCardData {
    id: string;
    label: string;
    value: number | string;
    changePercent?: number; // variation vs previous period
    trend?: 'up' | 'down' | 'neutral';
    prefix?: string;
    suffix?: string;
}

export interface TimeSeriesPoint {
    date: string; // ISO or 'YYYY-MM-DD'
    value: number;
    value2?: number; // Secondary value for comparison or multi-line charts
}

export interface CategoryValue {
    category: string;
    value: number;
    color?: string;
}

export interface FinanceRecord {
    id: string;
    date: string;
    cliente: string;
    contratoTipo: string;
    valor: number;
    status: 'pago' | 'pendente' | 'atrasado';
    meioPagamento: string;
}

export interface ContratoReport {
    id: string;
    numero: string;
    cliente: string;
    tipo: string;
    status: string;
    responsavel: string;
    dataInicio: string;
    dataEstimativaConclusao?: string;
}

export interface LeadReport {
    id: string;
    nome: string;
    email: string;
    origem: string;
    etapaFunil: string;
    responsavel: string;
    ultimaAtividade: string;
}

export interface ComissaoReport {
    id: string;
    vendedor: string;
    cliente: string;
    contrato: string;
    valorContrato: number;
    percentual: number;
    valorComissao: number;
    status: 'paga' | 'em_aberto';
    dataPrevistaPagamento: string;
}

// --- MOCK DATA ---

// Overview KPIs
export const mockOverviewKpis: KpiCardData[] = [
    { id: 'clients', label: 'Clientes Ativos', value: 124, changePercent: 12, trend: 'up' },
    { id: 'contracts', label: 'Contratos em Andamento', value: 45, changePercent: 5, trend: 'up' },
    { id: 'revenue', label: 'Receita Prevista', value: 158000, changePercent: 8, trend: 'up', prefix: 'U$ ' },
    { id: 'completed', label: 'Processos Concluídos', value: 12, changePercent: -2, trend: 'down' },
    { id: 'conversion', label: 'Taxa de Conversão', value: 18.5, changePercent: 1.5, trend: 'up', suffix: '%' },
];

// Overview Charts
export const mockOverviewTrend: TimeSeriesPoint[] = [
    { date: '2024-01', value: 12 },
    { date: '2024-02', value: 15 },
    { date: '2024-03', value: 18 },
    { date: '2024-04', value: 14 },
    { date: '2024-05', value: 22 },
    { date: '2024-06', value: 28 },
];

export const mockOverviewStatus: CategoryValue[] = [
    { category: 'Em Análise', value: 15, color: '#3b82f6' },
    { category: 'Aprovado', value: 45, color: '#10b981' },
    { category: 'Reprovado', value: 5, color: '#ef4444' },
    { category: 'Concluído', value: 30, color: '#8b5cf6' },
    { category: 'Cancelado', value: 8, color: '#6b7280' },
];

// Finance KPIs
export const mockFinanceKpis: KpiCardData[] = [
    { id: 'total_billed', label: 'Total Faturado', value: 450000, changePercent: 15, trend: 'up', prefix: 'U$ ' },
    { id: 'open_revenue', label: 'Receita em Aberto', value: 120000, changePercent: 5, trend: 'neutral', prefix: 'U$ ' },
    { id: 'overdue', label: 'Pagamentos Atrasados', value: 15000, changePercent: -10, trend: 'down', prefix: 'U$ ' },
    { id: 'avg_ticket', label: 'Ticket Médio', value: 12500, changePercent: 2, trend: 'up', prefix: 'U$ ' },
];

// Finance Charts
export const mockFinanceRevenue: TimeSeriesPoint[] = [
    { date: 'Jan', value: 45000 },
    { date: 'Fev', value: 52000 },
    { date: 'Mar', value: 48000 },
    { date: 'Abr', value: 61000 },
    { date: 'Mai', value: 55000 },
    { date: 'Jun', value: 75000 },
];

// Finance Table
export const mockFinanceRecords: FinanceRecord[] = [
    { id: '1', date: '2024-06-15', cliente: 'João Silva', contratoTipo: 'EB-2 NIW', valor: 5000, status: 'pago', meioPagamento: 'Pix' },
    { id: '2', date: '2024-06-16', cliente: 'Maria Oliveira', contratoTipo: 'Estudante', valor: 2500, status: 'pendente', meioPagamento: 'Cartão' },
    { id: '3', date: '2024-06-14', cliente: 'Carlos Souza', contratoTipo: 'EB-3', valor: 8000, status: 'atrasado', meioPagamento: 'Boleto' },
    { id: '4', date: '2024-06-18', cliente: 'Ana Costa', contratoTipo: 'Turismo', valor: 1500, status: 'pago', meioPagamento: 'Pix' },
    { id: '5', date: '2024-06-20', cliente: 'Pedro Santos', contratoTipo: 'EB-2 NIW', valor: 5000, status: 'pendente', meioPagamento: 'Cartão' },
];

// Contracts Funnel
export const mockContractsFunnel: CategoryValue[] = [
    { category: 'Lead', value: 150, color: '#94a3b8' },
    { category: 'Proposta', value: 80, color: '#60a5fa' },
    { category: 'Contrato Assinado', value: 45, color: '#3b82f6' },
    { category: 'Processo Iniciado', value: 40, color: '#2563eb' },
    { category: 'Concluído', value: 12, color: '#10b981' },
];

// Contracts Table
export const mockContractsList: ContratoReport[] = [
    { id: '101', numero: 'CTR-2024-001', cliente: 'João Silva', tipo: 'EB-2 NIW', status: 'Em Andamento', responsavel: 'Dr. Lucas', dataInicio: '2024-01-15', dataEstimativaConclusao: '2024-12-15' },
    { id: '102', numero: 'CTR-2024-002', cliente: 'Maria Oliveira', tipo: 'Visto Estudante', status: 'Aprovado', responsavel: 'Dra. Ana', dataInicio: '2024-02-10', dataEstimativaConclusao: '2024-05-10' },
    { id: '103', numero: 'CTR-2024-003', cliente: 'Carlos Souza', tipo: 'EB-3', status: 'RFE', responsavel: 'Dr. Lucas', dataInicio: '2024-03-05', dataEstimativaConclusao: '2025-03-05' },
];

// CRM KPIs
export const mockCrmKpis: KpiCardData[] = [
    { id: 'new_leads', label: 'Novos Leads', value: 350, changePercent: 20, trend: 'up' },
    { id: 'qualified', label: 'Leads Qualificados', value: 120, changePercent: 15, trend: 'up' },
    { id: 'active_clients', label: 'Clientes Ativos', value: 85, changePercent: 5, trend: 'up' },
    { id: 'lost', label: 'Leads Perdidos', value: 45, changePercent: -5, trend: 'down' },
];

// CRM Charts
export const mockCrmSources: CategoryValue[] = [
    { category: 'Instagram', value: 45, color: '#E1306C' },
    { category: 'Google Ads', value: 30, color: '#4285F4' },
    { category: 'Indicação', value: 15, color: '#10b981' },
    { category: 'Site Orgânico', value: 10, color: '#3b82f6' },
];

// CRM Table
export const mockLeadsList: LeadReport[] = [
    { id: '1', nome: 'Roberto Alves', email: 'roberto@email.com', origem: 'Instagram', etapaFunil: 'Contato Inicial', responsavel: 'Consultor A', ultimaAtividade: '2024-06-20' },
    { id: '2', nome: 'Julia Lima', email: 'julia@email.com', origem: 'Google Ads', etapaFunil: 'Proposta Enviada', responsavel: 'Consultor B', ultimaAtividade: '2024-06-19' },
    { id: '3', nome: 'Marcos Dias', email: 'marcos@email.com', origem: 'Indicação', etapaFunil: 'Reunião Agendada', responsavel: 'Consultor A', ultimaAtividade: '2024-06-18' },
];

// Commissions KPIs
export const mockCommissionsKpis: KpiCardData[] = [
    { id: 'total_comm', label: 'Total Comissões', value: 45000, changePercent: 10, trend: 'up', prefix: 'U$ ' },
    { id: 'paid_comm', label: 'Comissões Pagas', value: 32000, changePercent: 5, trend: 'up', prefix: 'U$ ' },
    { id: 'open_comm', label: 'Em Aberto', value: 13000, changePercent: 25, trend: 'up', prefix: 'U$ ' },
    { id: 'contracts_comm', label: 'Contratos Comissionados', value: 28, changePercent: 0, trend: 'neutral' },
];

// Commissions Table
export const mockCommissionsList: ComissaoReport[] = [
    { id: '1', vendedor: 'Consultor A', cliente: 'João Silva', contrato: 'CTR-2024-001', valorContrato: 25000, percentual: 10, valorComissao: 2500, status: 'paga', dataPrevistaPagamento: '2024-02-15' },
    { id: '2', vendedor: 'Parceiro X', cliente: 'Maria Oliveira', contrato: 'CTR-2024-002', valorContrato: 15000, percentual: 15, valorComissao: 2250, status: 'em_aberto', dataPrevistaPagamento: '2024-07-10' },
    { id: '3', vendedor: 'Consultor B', cliente: 'Carlos Souza', contrato: 'CTR-2024-003', valorContrato: 30000, percentual: 10, valorComissao: 3000, status: 'em_aberto', dataPrevistaPagamento: '2024-07-15' },
];
