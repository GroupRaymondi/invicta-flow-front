import type { ProcessStatus, PaymentStatus, ContractStatus, UscisStatus } from '../../types/sales';

interface StatusBadgeProps {
    status: ProcessStatus | PaymentStatus | ContractStatus | UscisStatus | string;
    type?: 'process' | 'payment' | 'contract' | 'uscis' | 'default';
}

export const StatusBadge = ({ status, type = 'default' }: StatusBadgeProps) => {
    const getStyles = () => {
        // Payment Status
        if (type === 'payment') {
            switch (status) {
                case 'PAID': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
                case 'PARTIALLY_PAID': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
                case 'WAITING_PAYMENT': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30';
                default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
            }
        }

        // Process Status
        if (type === 'process') {
            switch (status) {
                case 'APPROVED': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
                case 'FILED_USCIS': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
                case 'IN_PROGRESS': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30';
                case 'WAITING_PAYMENT': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
                case 'ON_HOLD': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
                case 'DENIED':
                case 'CANCELLED': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30';
                default: return 'bg-slate-100 text-slate-700';
            }
        }

        // Contract Status
        if (type === 'contract') {
            switch (status) {
                case 'SIGNED': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
                case 'WAITING_SIGNATURE': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
                default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
            }
        }

        // USCIS Status
        if (type === 'uscis') {
            switch (status) {
                case 'APPROVED': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
                case 'RECEIPT_NOTICE': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
                case 'RFE': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
                case 'DENIED': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30';
                default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
            }
        }

        // Default
        switch (status) {
            case 'UPLOADED': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
            case 'UNDER_REVIEW': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
            case 'APPROVED': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
            case 'REJECTED': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
        }
    };

    const getLabel = () => {
        const s = status as string;
        // Map technical status to readable labels if needed, or just format
        return s.replace(/_/g, ' ');
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStyles()}`}>
            {getLabel()}
        </span>
    );
};
