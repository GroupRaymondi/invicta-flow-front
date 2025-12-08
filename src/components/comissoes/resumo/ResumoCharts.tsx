import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import type { ChartDataPoint } from '../../../data/mockComissoesData';

interface ResumoChartsProps {
    timeData: ChartDataPoint[];
    sellerData: ChartDataPoint[];
}

export const ResumoCharts = ({ timeData, sellerData }: ResumoChartsProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Commissions Over Time */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Comissões por Mês</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                tickFormatter={(value) => `U$${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '8px',
                                    color: 'hsl(var(--foreground))',
                                }}
                                itemStyle={{ color: 'hsl(var(--primary))' }}
                                formatter={(value: number) => [`U$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Commissions by Seller */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Top Vendedores (Comissões)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={sellerData} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                width={100}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted) / 0.2)' }}
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: '8px',
                                    color: 'hsl(var(--foreground))',
                                }}
                                itemStyle={{ color: 'hsl(var(--primary))' }}
                                formatter={(value: number) => [`U$ ${value.toLocaleString('pt-BR')}`, 'Comissão']}
                            />
                            <Bar
                                dataKey="value"
                                fill="#3b82f6"
                                radius={[0, 4, 4, 0]}
                                barSize={32}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
