import { LayoutDashboard, Users, FilePlus } from 'lucide-react';

export type ComissoesTabType = 'summary' | 'by-seller' | 'entries';

interface ComissoesTabsProps {
    activeTab: ComissoesTabType;
    onTabChange: (tab: ComissoesTabType) => void;
    children: React.ReactNode;
}

export const ComissoesTabs = ({ activeTab, onTabChange, children }: ComissoesTabsProps) => {
    return (
        <div className="w-full">
            <div className="border-b border-border mb-6">
                <div className="flex overflow-x-auto no-scrollbar gap-6">
                    <button
                        onClick={() => onTabChange('summary')}
                        className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === 'summary'
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <LayoutDashboard size={18} />
                        Resumo
                        {activeTab === 'summary' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                        )}
                    </button>

                    <button
                        onClick={() => onTabChange('by-seller')}
                        className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === 'by-seller'
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Users size={18} />
                        Por Vendedor
                        {activeTab === 'by-seller' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                        )}
                    </button>

                    <button
                        onClick={() => onTabChange('entries')}
                        className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === 'entries'
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <FilePlus size={18} />
                        Lançamentos de Comissão
                        {activeTab === 'entries' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                        )}
                    </button>
                </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {children}
            </div>
        </div>
    );
};
