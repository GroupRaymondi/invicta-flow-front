import { X, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Seller } from '../../data/mockCommunity';

interface SellerDetailModalProps {
    seller: Seller | null;
    onClose: () => void;
}

export const SellerDetailModal = ({ seller, onClose }: SellerDetailModalProps) => {
    if (!seller) return null;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    };

    const chartData = seller.salesHistory.map((value, index) => ({
        month: ['Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'][index],
        sales: value
    }));

    const progressToGoal = Math.min((seller.totalSales / seller.monthlyGoal) * 100, 100);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl bg-white dark:bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/40 bg-muted/20">
                    <div className="flex items-center gap-4">
                        <div className={`
                            w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl shadow-lg
                            ${seller.rank === 1 ? 'bg-amber-500 text-white shadow-amber-500/20' :
                                seller.rank === 2 ? 'bg-slate-400 text-white' :
                                    seller.rank === 3 ? 'bg-orange-400 text-white' :
                                        'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}
                        `}>
                            {seller.rank}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">{seller.name}</h2>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {seller.trend === 'up' ? (
                                    <span className="flex items-center text-emerald-500 font-medium">
                                        <TrendingUp size={14} className="mr-1" /> Em alta
                                    </span>
                                ) : seller.trend === 'down' ? (
                                    <span className="flex items-center text-rose-500 font-medium">
                                        <TrendingDown size={14} className="mr-1" /> Em queda
                                    </span>
                                ) : (
                                    <span className="flex items-center text-muted-foreground font-medium">
                                        Estável
                                    </span>
                                )}
                                <span>•</span>
                                <span>{seller.dealsClosed} fechamentos</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Main Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                            <p className="text-sm text-muted-foreground mb-1">Vendas Totais</p>
                            <p className="text-2xl font-bold text-primary">{formatCurrency(seller.totalSales)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                            <p className="text-sm text-muted-foreground mb-1">Meta Mensal</p>
                            <div className="flex items-end justify-between">
                                <p className="text-2xl font-bold text-foreground">{formatCurrency(seller.monthlyGoal)}</p>
                                <span className="text-xs font-medium text-muted-foreground mb-1">{progressToGoal.toFixed(0)}%</span>
                            </div>
                            <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${progressToGoal}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-primary" />
                            Histórico de Vendas
                        </h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                        formatter={(value: number) => [formatCurrency(value), 'Vendas']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorSales)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Products */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Target size={18} className="text-primary" />
                            Produtos Mais Vendidos
                        </h3>
                        <div className="space-y-4">
                            {seller.topProducts.map((product, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-foreground">{product.name}</span>
                                        <span className="text-muted-foreground">{formatCurrency(product.value)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary/80 rounded-full"
                                            style={{ width: `${(product.value / seller.topProducts[0].value) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
