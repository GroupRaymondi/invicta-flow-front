import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';
import type { TimeSeriesPoint, CategoryValue } from '../../../data/mockReportsData';

interface VisaoGeralChartsProps {
    trendData: TimeSeriesPoint[];
    statusData: CategoryValue[];
}

export const VisaoGeralCharts = ({ trendData, statusData }: VisaoGeralChartsProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de Tendência */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Evolução de Novos Clientes</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                                cursor={{ stroke: '#334155', strokeWidth: 1 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#1e293b' }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Gráfico de Distribuição */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Contratos por Status</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statusData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} horizontal={true} vertical={false} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="category"
                                type="category"
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                width={80}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                cursor={{ fill: '#334155', opacity: 0.2 }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
