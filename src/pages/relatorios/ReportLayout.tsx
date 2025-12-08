import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReportLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export const ReportLayout = ({ title, subtitle, children }: ReportLayoutProps) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Link
                    to="/dashboard"
                    className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">{title}</h1>
                    <p className="text-muted-foreground">{subtitle}</p>
                </div>
            </div>

            <div className="grid gap-6">
                {children}
            </div>
        </div>
    );
};
