import { FileText, DollarSign, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { PipelineRecebimentosFuturos } from '../components/dashboard/PipelineRecebimentosFuturos';

const StatCard = ({ title, value, change, icon: Icon, trend, color = "blue", to }: { title: string, value: string, change?: string, icon: any, trend?: 'up' | 'down', color?: string, to?: string }) => {
    const Content = () => (
        <div className={`
            relative overflow-hidden bg-card border border-border rounded-xl p-6 
            hover:shadow-md hover:border-primary/50 transition-all duration-300 group h-full
            ${to ? 'cursor-pointer' : ''}
        `}>
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground tracking-tight">{title}</p>
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
                </div>
                <div className={`
                    p-2.5 rounded-xl transition-colors duration-300
                    ${color === 'green' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20' :
                        color === 'red' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500/20' :
                            'bg-primary/10 text-primary group-hover:bg-primary/20'}
                `}>
                    <Icon size={20} strokeWidth={2} />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                {change && (
                    <div className={`
                        flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full
                        ${trend === 'up'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}
                    `}>
                        {trend === 'up' ? '↑' : '↓'} {change}
                    </div>
                )}
                <span className="text-xs text-muted-foreground">vs. mês anterior</span>
            </div>

            {/* Decorative background element */}
            <div className="absolute -right-6 -bottom-6 opacity-[0.03] text-foreground transform rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Icon size={100} />
            </div>
        </div>
    );

    if (to) {
        return <Link to={to} className="block h-full"><Content /></Link>;
    }

    return <div className="h-full"><Content /></div>;
};

const monthlyRevenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Fev', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Abr', value: 61000 },
    { name: 'Mai', value: 55000 },
    { name: 'Jun', value: 67000 },
    { name: 'Jul', value: 72000 },
    { name: 'Ago', value: 69000 },
    { name: 'Set', value: 78000 },
    { name: 'Out', value: 85000 },
    { name: 'Nov', value: 92000 },
    { name: 'Dez', value: 125430 },
];

const agingData = [
    { name: '0-30 dias', value: 15, color: '#22c55e' },
    { name: '31-60 dias', value: 8, color: '#eab308' },
    { name: '61-90 dias', value: 4, color: '#f97316' },
    { name: '90+ dias', value: 2, color: '#ef4444' },
];

const funnelData = [
    { name: 'Leads', value: 120 },
    { name: 'Qualificados', value: 85 },
    { name: 'Proposta', value: 60 },
    { name: 'Negociação', value: 45 },
    { name: 'Fechado', value: 32 },
];

export const Dashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Visão geral do sistema - dados atualizados em tempo real</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <StatCard
                    title="Receita Total (MTD)"
                    value="U$ 125,430"
                    change="12.5%"
                    icon={DollarSign}
                    trend="up"
                    color="green"
                    to="/relatorios/receita"
                />
                <StatCard
                    title="Faturamento (YTD)"
                    value="U$ 1,245,890"
                    change="8.2%"
                    icon={TrendingUp}
                    trend="up"
                    to="/relatorios/faturamento"
                />
                <StatCard
                    title="Inadimplência"
                    value="U$ 12,450"
                    change="3.1%"
                    icon={AlertCircle}
                    trend="down"
                    color="red"
                    to="/relatorios/inadimplencia"
                />
                <StatCard
                    title="Assinaturas Ativas"
                    value="48"
                    change="4"
                    icon={RefreshCw}
                    trend="up"
                    color="green"
                    to="/relatorios/assinaturas"
                />
                <StatCard
                    title="Contratos Ativos"
                    value="127"
                    icon={FileText}
                    to="/relatorios/contratos"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-xl p-6 h-96 flex flex-col">
                    <h3 className="text-lg font-bold mb-2">Faturamento Mensal</h3>
                    <p className="text-sm text-muted-foreground mb-6">Últimos 12 meses</p>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyRevenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `U$ ${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="hsl(var(--primary))"
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 h-96 flex flex-col">
                    <h3 className="text-lg font-bold mb-2">Aging de Inadimplência</h3>
                    <p className="text-sm text-muted-foreground mb-6">Distribuição por período de atraso</p>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={agingData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    width={80}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {agingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Pipeline de Recebimentos Futuros */}
            <PipelineRecebimentosFuturos />

            <div className="bg-card border border-border rounded-xl p-6 h-80 flex flex-col">
                <h3 className="text-lg font-bold mb-2">Funil de Contratos</h3>
                <p className="text-sm text-muted-foreground mb-6">Status do processo de contratação</p>
                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={funnelData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis hide />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
