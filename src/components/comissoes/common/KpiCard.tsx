import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import type { KpiCardData } from '../../../data/mockComissoesData';

interface KpiCardProps {
    data: KpiCardData;
}

export const KpiCard = ({ data }: KpiCardProps) => {
    const { label, value, changePercent, trend, prefix, suffix } = data;

    const getTrendColor = () => {
        switch (trend) {
            case 'up': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'down': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
            default: return 'text-muted-foreground bg-muted/50 border-border';
        }
    };

    const getTrendIcon = () => {
        switch (trend) {
            case 'up': return <ArrowUpRight size={14} />;
            case 'down': return <ArrowDownRight size={14} />;
            default: return <Minus size={14} />;
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
                {changePercent !== undefined && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getTrendColor()}`}>
                        {getTrendIcon()}
                        <span>{Math.abs(changePercent)}%</span>
                    </div>
                )}
            </div>
            <div className="flex items-baseline gap-1">
                {prefix && <span className="text-lg text-muted-foreground font-medium">{prefix}</span>}
                <span className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
                </span>
                {suffix && <span className="text-sm text-muted-foreground font-medium">{suffix}</span>}
            </div>
        </div>
    );
};
