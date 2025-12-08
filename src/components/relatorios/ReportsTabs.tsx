import { LayoutDashboard, Wallet, FileText, Users, DollarSign } from 'lucide-react';
// Tabs component wrapper
// If not, I will use standard HTML/Tailwind for tabs to avoid dependency issues if the UI component doesn't exist yet.
// Checking previous files, Tabs were used from Shadcn/UI in Permissions.tsx. I'll stick to that pattern but inline the styles if needed or use the standard Radix/Shadcn structure.
// Actually, to be safe and consistent with the Permissions module, I will implement the Tabs structure directly in the parent component or here if it wraps the content.
// For this component, I'll make it just the navigation list to keep it pure, or a wrapper. 
// Let's make it a wrapper that accepts children for content to keep it clean.

interface ReportsTabsProps {
    activeTab: string;
    onTabChange: (value: string) => void;
    children: React.ReactNode;
}

export const ReportsTabs = ({ activeTab, onTabChange, children }: ReportsTabsProps) => {
    return (
        <div className="w-full">
            <div className="border-b border-border mb-6">
                <div className="flex overflow-x-auto no-scrollbar gap-6">
                    <button
                        onClick={() => onTabChange('overview')}
                        className={`
                            flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === 'overview'
                                ? 'border-primary text-primary font-medium'
                                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                            }
                        `}
                    >
                        <LayoutDashboard size={18} />
                        Visão Geral
                    </button>
                    <button
                        onClick={() => onTabChange('financial')}
                        className={`
                            flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === 'financial'
                                ? 'border-primary text-primary font-medium'
                                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                            }
                        `}
                    >
                        <Wallet size={18} />
                        Financeiro
                    </button>
                    <button
                        onClick={() => onTabChange('contracts')}
                        className={`
                            flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === 'contracts'
                                ? 'border-primary text-primary font-medium'
                                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                            }
                        `}
                    >
                        <FileText size={18} />
                        Contratos & Processos
                    </button>
                    <button
                        onClick={() => onTabChange('crm')}
                        className={`
                            flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === 'crm'
                                ? 'border-primary text-primary font-medium'
                                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                            }
                        `}
                    >
                        <Users size={18} />
                        CRM & Carteira
                    </button>
                    <button
                        onClick={() => onTabChange('commissions')}
                        className={`
                            flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === 'commissions'
                                ? 'border-primary text-primary font-medium'
                                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                            }
                        `}
                    >
                        <DollarSign size={18} />
                        Comissões
                    </button>
                </div>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {children}
            </div>
        </div>
    );
};
