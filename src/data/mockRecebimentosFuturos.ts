export type PipelinePeriodKey = 'next7' | 'next30' | 'next60';

export interface RecebimentoFuturoResumo {
    period: PipelinePeriodKey;
    label: string;
    totalAmount: number;
    count: number;
}

export interface RecebimentoFuturoDetalhe {
    id: string;
    period: PipelinePeriodKey;
    dataPrevista: string;
    cliente: string;
    contrato: string;
    valor: number;
}

export const mockRecebimentosFuturos: RecebimentoFuturoResumo[] = [
    { period: 'next7', label: 'Próximos 7 dias', totalAmount: 12430, count: 8 },
    { period: 'next30', label: 'Próximos 30 dias', totalAmount: 47320, count: 21 },
    { period: 'next60', label: 'Próximos 60 dias', totalAmount: 82900, count: 37 },
];

export const mockRecebimentosDetalhes: RecebimentoFuturoDetalhe[] = [
    // Next 7 days
    { id: '1', period: 'next7', dataPrevista: '2025-11-26', cliente: 'Tech Solutions Ltda', contrato: 'Consultoria Mensal', valor: 2500 },
    { id: '2', period: 'next7', dataPrevista: '2025-11-28', cliente: 'Grupo Alpha', contrato: 'Licença Software', valor: 5000 },
    { id: '3', period: 'next7', dataPrevista: '2025-11-29', cliente: 'Marta Silva', contrato: 'Assessoria Jurídica', valor: 1500 },

    // Next 30 days
    { id: '4', period: 'next30', dataPrevista: '2025-12-05', cliente: 'Construtora Beta', contrato: 'Projeto Estrutural', valor: 12000 },
    { id: '5', period: 'next30', dataPrevista: '2025-12-10', cliente: 'Eduardo Santos', contrato: 'Mentoria', valor: 3000 },
    { id: '6', period: 'next30', dataPrevista: '2025-12-15', cliente: 'StartUp Inovação', contrato: 'Desenvolvimento App', valor: 8500 },

    // Next 60 days
    { id: '7', period: 'next60', dataPrevista: '2026-01-10', cliente: 'Hospital Central', contrato: 'Manutenção Equipamentos', valor: 25000 },
    { id: '8', period: 'next60', dataPrevista: '2026-01-20', cliente: 'Escola Futuro', contrato: 'Treinamento Equipe', valor: 6000 },
];
