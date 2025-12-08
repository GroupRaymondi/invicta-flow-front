import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import {
    mockRecebimentosFuturos,
    mockRecebimentosDetalhes,
    type PipelinePeriodKey
} from '../../data/mockRecebimentosFuturos';
import { Calendar, DollarSign, FileText } from 'lucide-react';

export const PipelineRecebimentosFuturos = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<PipelinePeriodKey>('next30');

    const filteredDetails = mockRecebimentosDetalhes.filter(item => item.period === selectedPeriod);

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground">Pipeline de Recebimentos Futuros</h2>
                <p className="text-sm text-muted-foreground">Projeção de recebimentos para os próximos períodos.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {mockRecebimentosFuturos.map((item) => (
                    <div
                        key={item.period}
                        onClick={() => setSelectedPeriod(item.period)}
                        className={`
                            p-4 rounded-xl border cursor-pointer transition-all duration-200
                            ${selectedPeriod === item.period
                                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                : 'border-border hover:bg-muted/50 hover:border-primary/50'}
                        `}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-background border border-border font-medium">
                                {item.count} recebimentos
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign size={18} className="text-primary" />
                            <span className="text-2xl font-bold text-foreground">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.totalAmount)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockRecebimentosFuturos}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis
                                dataKey="label"
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
                                cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                                formatter={(value: number) => [new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value), 'Valor Previsto']}
                            />
                            <Bar dataKey="totalAmount" radius={[4, 4, 0, 0]}>
                                {mockRecebimentosFuturos.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.period === selectedPeriod ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.3)'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Details List */}
                <div className="bg-muted/10 rounded-xl p-4 border border-border h-80 overflow-y-auto">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <FileText size={16} />
                        Detalhamento ({mockRecebimentosFuturos.find(p => p.period === selectedPeriod)?.label})
                    </h3>
                    <div className="space-y-3">
                        {filteredDetails.length > 0 ? (
                            filteredDetails.map((detail) => (
                                <div key={detail.id} className="bg-card p-3 rounded-lg border border-border text-sm">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium text-foreground">{detail.cliente}</span>
                                        <span className="font-bold text-primary">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(detail.valor)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2">{detail.contrato}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Calendar size={12} />
                                        <span>Previsto: {new Date(detail.dataPrevista).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                Nenhum detalhe disponível para este período no mock.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
