import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import type { CategoryValue } from '../../../data/mockReportsData';

interface ContratosChartsProps {
    funnelData: CategoryValue[];
}

export const ContratosCharts = ({ funnelData }: ContratosChartsProps) => {
    // Mock data for pie chart
    const pieData = [
        { name: 'Em Preparação', value: 35, color: '#3b82f6' },
        { name: 'Enviado', value: 25, color: '#8b5cf6' },
        { name: 'RFE', value: 10, color: '#f59e0b' },
        { name: 'Aprovado', value: 20, color: '#10b981' },
        { name: 'Negado', value: 5, color: '#ef4444' },
        { name: 'Withdrawn', value: 5, color: '#6b7280' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Funil de Contratos */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Funil de Contratos</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} horizontal={true} vertical={false} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="category"
                                type="category"
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                width={100}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                cursor={{ fill: '#334155', opacity: 0.2 }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                {funnelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Processos por Status */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Status dos Processos</h3>
                <div className="h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value: string) => <span className="text-muted-foreground text-xs ml-1">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
