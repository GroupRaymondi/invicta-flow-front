export interface Comment {
    id: string;
    author: string;
    date: string;
    message: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    priority: 'high' | 'medium' | 'low';
    type: 'news' | 'alert' | 'update';
    comments?: Comment[];
    views: number;
    isNew?: boolean;
}

export interface Seller {
    id: string;
    name: string;
    avatar?: string;
    totalSales: number;
    dealsClosed: number;
    trend: 'up' | 'down' | 'stable';
    rank: number;
    monthlyGoal: number;
    salesHistory: number[]; // Last 6 months
    topProducts: { name: string; value: number }[];
}

export const mockAnnouncements: Announcement[] = [
    {
        id: '1',
        title: 'Nova Política de Comissões',
        content: 'A partir do próximo mês, teremos uma nova estrutura de comissões para vendas acima de U$ 50.000. Confiram o documento atualizado na base de conhecimento.',
        date: '2024-03-15T10:00:00Z',
        author: 'Diretoria Comercial',
        priority: 'high',
        type: 'alert',
        views: 145,
        isNew: true,
        comments: [
            {
                id: 'c1',
                author: 'Carlos Oliveira',
                date: '15 de março de 2024',
                message: 'Excelente notícia! Vai motivar muito o time.'
            },
            {
                id: 'c2',
                author: 'Ana Silva',
                date: '15 de março de 2024',
                message: 'Onde encontro o documento detalhado?'
            }
        ]
    },
    {
        id: '2',
        title: 'Recorde de Vendas em Fevereiro!',
        content: 'Parabéns a todos! Batemos nossa meta mensal com 120% de aproveitamento. O time de vendas está de parabéns pelo esforço e dedicação.',
        date: '2024-03-01T09:00:00Z',
        author: 'Lucas Raymondi',
        priority: 'medium',
        type: 'news',
        views: 320,
        isNew: false,
        comments: []
    },
    {
        id: '3',
        title: 'Atualização no Sistema CRM',
        content: 'O sistema passará por uma manutenção programada neste sábado às 22h. O tempo estimado de inatividade é de 2 horas.',
        date: '2024-03-10T14:30:00Z',
        author: 'Equipe de TI',
        priority: 'low',
        type: 'update',
        views: 89,
        isNew: false,
        comments: []
    },
    {
        id: '4',
        title: 'Treinamento de Vendas: Técnicas de Negociação',
        content: 'Não percam o treinamento presencial na próxima sexta-feira. Focaremos em técnicas avançadas de fechamento e contorno de objeções.',
        date: '2024-03-20T11:00:00Z',
        author: 'RH',
        priority: 'medium',
        type: 'news',
        views: 56,
        isNew: true,
        comments: [
            {
                id: 'c3',
                author: 'Roberto Costa',
                date: '20 de março de 2024',
                message: 'Já confirmei minha presença!'
            }
        ]
    }
];

export const mockTopSellers: Seller[] = [
    {
        id: '1',
        name: 'Ana Silva',
        totalSales: 150000,
        dealsClosed: 12,
        trend: 'up',
        rank: 1,
        monthlyGoal: 120000,
        salesHistory: [98000, 110000, 105000, 125000, 140000, 150000],
        topProducts: [
            { name: 'Consultoria Premium', value: 80000 },
            { name: 'Licença Enterprise', value: 50000 },
            { name: 'Treinamento', value: 20000 }
        ]
    },
    {
        id: '2',
        name: 'Carlos Oliveira',
        totalSales: 125000,
        dealsClosed: 10,
        trend: 'up',
        rank: 2,
        monthlyGoal: 120000,
        salesHistory: [115000, 110000, 118000, 120000, 122000, 125000],
        topProducts: [
            { name: 'Licença Enterprise', value: 75000 },
            { name: 'Consultoria Standard', value: 50000 }
        ]
    },
    {
        id: '3',
        name: 'Mariana Santos',
        totalSales: 98000,
        dealsClosed: 8,
        trend: 'stable',
        rank: 3,
        monthlyGoal: 100000,
        salesHistory: [95000, 92000, 98000, 96000, 97000, 98000],
        topProducts: [
            { name: 'Consultoria Standard', value: 60000 },
            { name: 'Suporte VIP', value: 38000 }
        ]
    },
    {
        id: '4',
        name: 'Roberto Costa',
        totalSales: 85000,
        dealsClosed: 7,
        trend: 'down',
        rank: 4,
        monthlyGoal: 100000,
        salesHistory: [110000, 105000, 100000, 95000, 90000, 85000],
        topProducts: [
            { name: 'Licença Basic', value: 45000 },
            { name: 'Treinamento', value: 40000 }
        ]
    },
    {
        id: '5',
        name: 'Julia Lima',
        totalSales: 72000,
        dealsClosed: 6,
        trend: 'up',
        rank: 5,
        monthlyGoal: 80000,
        salesHistory: [50000, 55000, 60000, 65000, 68000, 72000],
        topProducts: [
            { name: 'Consultoria Basic', value: 40000 },
            { name: 'Suporte', value: 32000 }
        ]
    }
];
