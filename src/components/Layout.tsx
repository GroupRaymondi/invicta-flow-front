import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    DollarSign,
    Menu,
    Briefcase,
    FileCheck,
    Wallet,
    PieChart,
    Shield,
    ClipboardList,
    X,
    ChevronDown,
    ChevronRight,
    Megaphone,
    BriefcaseBusiness
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => (
    <>
        {/* Mobile Backdrop */}
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={onClose}
        />

        {/* Sidebar */}
        <aside
            className={`fixed left-0 top-0 z-50 h-screen border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col ${isOpen
                ? 'w-64 translate-x-0'
                : 'w-64 -translate-x-full md:translate-x-0 md:w-12'
                }`}
        >
            {/* Logo Section */}
            <div className={`h-16 flex items-center border-b border-border/50 ${isOpen ? 'px-6 gap-3' : 'px-0 justify-center'} transition-all duration-300`}>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield size={18} className="text-primary-foreground" />
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'}`}>
                    <h1 className="text-lg font-bold leading-tight whitespace-nowrap">Sistema<br />Invicta</h1>
                </div>
                {/* Mobile Close Button */}
                <button onClick={onClose} className="md:hidden absolute right-4 text-muted-foreground hover:text-foreground">
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
                <NavItem to="/community" icon={<Megaphone size={20} />} label="Comunidade" isCollapsed={!isOpen} />
                <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" isCollapsed={!isOpen} />
                <NavItem to="/crm" icon={<Users size={20} />} label="CRM" isCollapsed={!isOpen} />

                <NavGroup to="/sales" icon={<BriefcaseBusiness size={20} />} label="Vendas" isCollapsed={!isOpen}>
                    <NavItem to="/sales/dashboard" icon={<div className="w-1 h-1 rounded-full bg-current" />} label="Dashboard" isCollapsed={!isOpen} />
                    <NavItem to="/sales/processes" icon={<div className="w-1 h-1 rounded-full bg-current" />} label="Processos" isCollapsed={!isOpen} />
                </NavGroup>

                <NavGroup to="/financial" icon={<DollarSign size={20} />} label="Financeiro" isCollapsed={!isOpen}>
                    <NavItem to="/financial" icon={<div className="w-1 h-1 rounded-full bg-current" />} label="Visão Geral" isCollapsed={!isOpen} end />
                    <NavItem to="/financial/receivables" icon={<div className="w-1 h-1 rounded-full bg-current" />} label="Contas a Receber" isCollapsed={!isOpen} />
                    <NavItem to="/financial/payables" icon={<div className="w-1 h-1 rounded-full bg-current" />} label="Contas a Pagar" isCollapsed={!isOpen} />
                    <NavItem to="/financial/statement" icon={<div className="w-1 h-1 rounded-full bg-current" />} label="Extrato de Conta" isCollapsed={!isOpen} />
                </NavGroup>
                <NavItem to="/contratos" icon={<FileText size={20} />} label="Contratos" isCollapsed={!isOpen} />
                <NavItem to="/processes" icon={<FileCheck size={20} />} label="Processos" isCollapsed={!isOpen} />
                <NavItem to="/clients" icon={<Wallet size={20} />} label="Carteira" isCollapsed={!isOpen} />
                <NavItem to="/commissions" icon={<Briefcase size={20} />} label="Comissões" isCollapsed={!isOpen} />

                <NavItem to="/reports" icon={<PieChart size={20} />} label="Relatórios" isCollapsed={!isOpen} />
                <NavItem to="/permissions" icon={<Shield size={20} />} label="Permissões" isCollapsed={!isOpen} />
                <NavItem to="/audit" icon={<ClipboardList size={20} />} label="Auditoria" isCollapsed={!isOpen} />
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-border">
                <NavLink to="/settings" className={`flex items-center ${isOpen ? 'gap-3 px-2' : 'justify-center px-0'} transition-all duration-300 hover:bg-accent rounded-lg p-2 group`}>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0 ring-2 ring-background group-hover:ring-primary transition-all">
                        LR
                    </div>
                    <div className={`flex-1 overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'}`}>
                        <p className="text-sm font-medium truncate">Lucas Raymondi</p>
                        <p className="text-xs text-muted-foreground truncate">Admin</p>
                    </div>
                </NavLink>
            </div>
        </aside>
    </>
);

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    to: string;
    isCollapsed: boolean;
    end?: boolean;
}

const NavItem = ({ icon, label, to, isCollapsed, end }: NavItemProps) => (
    <NavLink
        to={to}
        end={end}
        title={isCollapsed ? label : undefined}
        className={({ isActive }) => `
            flex items-center gap-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group relative
            ${isActive
                ? 'bg-sidebar-accent text-sidebar-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'}
            ${isCollapsed ? 'justify-center px-2' : 'px-3'}
        `}
    >
        <span className="flex-shrink-0">{icon}</span>
        <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
            {label}
        </span>

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-border">
                {label}
            </div>
        )}
    </NavLink>
);

interface NavGroupProps {
    icon: React.ReactNode;
    label: string;
    to: string; // Base path for checking active state
    isCollapsed: boolean;
    children: React.ReactNode;
}

const NavGroup = ({ icon, label, to, isCollapsed, children }: NavGroupProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    // Check if any child route is active
    const isActive = location.pathname.startsWith(to);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (isActive) setIsOpen(true);
    }, [isActive]);

    if (isCollapsed) {
        return <NavItem icon={icon} label={label} to={to} isCollapsed={true} />;
    }

    return (
        <div className="mb-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 text-sm font-medium group relative
                    ${isActive ? 'text-sidebar-foreground' : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'}
                `}
            >
                <span className="flex-shrink-0">{icon}</span>
                <span className="flex-1 text-left">{label}</span>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="ml-4 pl-2 border-l border-border/40 space-y-1 mt-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => (
    <header
        className={`h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-12'
            }`}
    >
        <div className="flex items-center gap-4">
            <button
                onClick={toggleSidebar}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                title={isSidebarOpen ? "Recolher menu" : "Expandir menu"}
            >
                <Menu size={24} />
            </button>
        </div>
        <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
        </div>
    </header>
);

export const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    // Handle initial responsive state
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                // On mobile, start closed
                setIsSidebarOpen(false);
            } else {
                // On desktop, start open
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on mobile navigation
    useEffect(() => {
        if (window.innerWidth < 768) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsSidebarOpen(false);
        }
    }, [location]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <main
                className={`p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-12'
                    }`}
            >
                <div className="max-w-[1600px] mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
