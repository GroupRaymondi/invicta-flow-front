import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import type { CategoryValue } from '../../../data/mockReportsData';

interface CrmChartsProps {
    sourceData: CategoryValue[];
}

export const CrmCharts = ({ sourceData }: CrmChartsProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Origem dos Leads */}
            <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-6">Leads por Origem</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sourceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                            <XAxis
                                dataKey="category"
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
                                cursor={{ fill: '#334155', opacity: 0.1 }}
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                                {sourceData.map((entry, index) => (
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
