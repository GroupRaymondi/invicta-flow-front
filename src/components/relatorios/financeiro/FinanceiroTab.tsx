import { FinanceiroKpis } from './FinanceiroKpis';
import { FinanceiroTable } from './FinanceiroTable';
import { EmptyState } from '../common/EmptyState';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { mockFinanceKpis, mockFinanceRevenue, mockFinanceRecords } from '../../../data/mockReportsData';

interface FinanceiroTabProps {
    isLoading: boolean;
    hasData: boolean;
}

export const FinanceiroTab = ({ hasData }: FinanceiroTabProps) => {
    if (!hasData) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FinanceiroKpis data={mockFinanceKpis} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico de Receita */}
                <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-foreground mb-6">Receita Mensal</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockFinanceRevenue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dx={-10}
                                    tickFormatter={(value) => `U$ ${value / 1000}k`}
                                />
                                <Tooltip
                                    cursor={{ fill: '#334155', opacity: 0.1 }}
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                    formatter={(value: number) => [`U$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <FinanceiroTable data={mockFinanceRecords} />
        </div>
    );
};
