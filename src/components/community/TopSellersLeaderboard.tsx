import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { Seller } from '../../data/mockCommunity';
import { SellerDetailModal } from './SellerDetailModal';

interface TopSellersLeaderboardProps {
    sellers: Seller[];
}

export const TopSellersLeaderboard = ({ sellers }: TopSellersLeaderboardProps) => {
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return <TrendingUp size={14} className="text-emerald-500" strokeWidth={1.5} />;
            case 'down': return <TrendingDown size={14} className="text-rose-500" strokeWidth={1.5} />;
            default: return <Minus size={14} className="text-muted-foreground" strokeWidth={1.5} />;
        }
    };

    const getMedal = (rank: number) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return null;
        }
    };

    return (
        <>
            <div className="bg-white dark:bg-card border border-black/5 dark:border-border rounded-[18px] overflow-hidden shadow-sm h-fit sticky top-6">
                <div className="p-4 border-b border-border/50 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-500/5">
                    <h2 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                        <Trophy size={20} className="text-amber-500" strokeWidth={1.5} />
                        Top Vendedores
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Ranking mensal de performance</p>
                </div>

                <div className="divide-y divide-border/50">
                    {sellers.map((seller, index) => (
                        <div
                            key={seller.id}
                            onClick={() => setSelectedSeller(seller)}
                            className="p-5 hover:bg-muted/20 transition-colors group cursor-pointer relative"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`
                                    w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm flex-shrink-0 relative
                                    ${index === 0 ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' :
                                        index === 1 ? 'bg-slate-400 text-white' :
                                            index === 2 ? 'bg-orange-400 text-white' :
                                                'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}
                                `}>
                                    {seller.rank}
                                    {index < 3 && (
                                        <span className="absolute -top-1 -right-1 text-xs drop-shadow-sm">
                                            {getMedal(seller.rank)}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                                            {seller.name}
                                        </h3>
                                        {getTrendIcon(seller.trend)}
                                    </div>

                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-xs text-muted-foreground">{seller.dealsClosed} vendas</span>
                                        <span className="font-bold text-primary">{formatCurrency(seller.totalSales)}</span>
                                    </div>

                                    {/* Sparkline & Progress */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-500 ease-out group-hover:bg-primary/90"
                                                style={{ width: `${(seller.totalSales / sellers[0].totalSales) * 100}%` }}
                                            />
                                        </div>
                                        {seller.salesHistory && (
                                            <div className="w-12 h-6 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={seller.salesHistory.map((v, i) => ({ val: v, i }))}>
                                                        <Line
                                                            type="monotone"
                                                            dataKey="val"
                                                            stroke="hsl(var(--primary))"
                                                            strokeWidth={2}
                                                            dot={false}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <SellerDetailModal
                seller={selectedSeller}
                onClose={() => setSelectedSeller(null)}
            />
        </>
    );
};
