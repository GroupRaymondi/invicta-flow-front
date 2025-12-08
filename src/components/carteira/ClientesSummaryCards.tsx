import { DollarSign, Briefcase, ArrowUpRight } from 'lucide-react';

interface ClientesSummaryCardsProps {
    totalVendas: number;
    totalComissao: number;
    onViewVendasDetails: () => void;
    onViewComissaoDetails: () => void;
}

export const ClientesSummaryCards = ({
    totalVendas,
    totalComissao,
    onViewVendasDetails,
    onViewComissaoDetails
}: ClientesSummaryCardsProps) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <button
                onClick={onViewVendasDetails}
                className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between relative overflow-hidden text-left hover:shadow-lg transition-all group cursor-pointer"
            >
                <div className="flex justify-between items-start z-10 w-full">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Saldo Total de Vendas</p>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {formatCurrency(totalVendas)}
                        </h3>
                        <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                            <ArrowUpRight size={12} />
                            +15% vs mês anterior
                        </p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                        <DollarSign size={20} />
                    </div>
                </div>
                <DollarSign className="absolute -bottom-4 -right-4 text-green-500/5 w-32 h-32 group-hover:scale-110 transition-transform duration-500" />
            </button>

            <button
                onClick={onViewComissaoDetails}
                className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between relative overflow-hidden text-left hover:shadow-lg transition-all group cursor-pointer"
            >
                <div className="flex justify-between items-start z-10 w-full">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Comissão a Receber</p>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {formatCurrency(totalComissao)}
                        </h3>
                        <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                            <ArrowUpRight size={12} />
                            10% do total de vendas
                        </p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                        <Briefcase size={20} />
                    </div>
                </div>
                <Briefcase className="absolute -bottom-4 -right-4 text-blue-500/5 w-32 h-32 group-hover:scale-110 transition-transform duration-500" />
            </button>
        </div>
    );
};
