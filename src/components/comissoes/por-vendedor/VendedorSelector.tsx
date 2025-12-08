import { User } from 'lucide-react';
import { mockVendedores } from '../../../data/mockComissoesData';

interface VendedorSelectorProps {
    selectedSellerId: string;
    onSelectSeller: (id: string) => void;
}

export const VendedorSelector = ({ selectedSellerId, onSelectSeller }: VendedorSelectorProps) => {
    return (
        <div className="bg-card border border-border rounded-xl p-4 h-full">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Vendedores</h3>
            <div className="space-y-2">
                {mockVendedores.map((vendedor) => (
                    <button
                        key={vendedor.id}
                        onClick={() => onSelectSeller(vendedor.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${selectedSellerId === vendedor.id
                                ? 'bg-primary text-primary-foreground shadow-md'
                                : 'hover:bg-accent text-foreground'
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedSellerId === vendedor.id ? 'bg-primary-foreground/20' : 'bg-muted'
                            }`}>
                            <User size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{vendedor.nome}</p>
                            <p className={`text-xs truncate ${selectedSellerId === vendedor.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                                }`}>
                                {vendedor.email}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
