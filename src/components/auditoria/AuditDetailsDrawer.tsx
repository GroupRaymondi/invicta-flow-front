import { X, Clock, User, Globe, Monitor, Database, FileJson } from 'lucide-react';
import type { AuditLogEntry } from '../../data/mockAuditLogs';
import { motion, AnimatePresence } from 'framer-motion';

interface AuditDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    log: AuditLogEntry | null;
}

export const AuditDetailsDrawer = ({ isOpen, onClose, log }: AuditDetailsDrawerProps) => {
    if (!log) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-background border-l border-border shadow-2xl z-[70] overflow-y-auto custom-scrollbar"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="p-6 border-b border-border flex items-start justify-between bg-muted/10">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground mb-1">Detalhes do Log</h2>
                                    <p className="text-sm text-muted-foreground font-mono">{log.id}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6 space-y-8">

                                {/* Main Info */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-primary">
                                        <Database size={20} />
                                        <h3 className="font-semibold text-lg">Informações Principais</h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 bg-card border border-border rounded-xl p-4">
                                        <div>
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Ação Executada</label>
                                            <p className="text-base font-medium text-foreground mt-1">{log.acao}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Descrição</label>
                                            <p className="text-sm text-foreground mt-1">{log.descricao}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Entidade</label>
                                                <p className="text-sm font-medium text-foreground mt-1 capitalize">{log.entidade}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">ID Entidade</label>
                                                <p className="text-sm font-mono text-muted-foreground mt-1">{log.entidadeId}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Context Info */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-primary">
                                        <User size={20} />
                                        <h3 className="font-semibold text-lg">Contexto da Ação</h3>
                                    </div>

                                    <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
                                        <div className="p-4 flex items-center gap-4">
                                            <div className="p-2 bg-muted/50 rounded-full">
                                                <User size={18} className="text-muted-foreground" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-muted-foreground">Usuário Responsável</label>
                                                <p className="text-sm font-medium text-foreground">{log.usuarioNome}</p>
                                                <p className="text-xs text-muted-foreground">{log.usuarioEmail} • {log.usuarioRole}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 flex items-center gap-4">
                                            <div className="p-2 bg-muted/50 rounded-full">
                                                <Clock size={18} className="text-muted-foreground" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-muted-foreground">Data e Hora</label>
                                                <p className="text-sm font-medium text-foreground">{formatDate(log.criadoEm)}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 flex items-center gap-4">
                                            <div className="p-2 bg-muted/50 rounded-full">
                                                <Globe size={18} className="text-muted-foreground" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-muted-foreground">Endereço IP</label>
                                                <p className="text-sm font-mono text-foreground">{log.ip}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 flex items-center gap-4">
                                            <div className="p-2 bg-muted/50 rounded-full">
                                                <Monitor size={18} className="text-muted-foreground" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-muted-foreground">Dispositivo</label>
                                                <p className="text-sm text-foreground">{log.device}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Data Changes */}
                                {(log.dadosAntes || log.dadosDepois) && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-primary">
                                            <FileJson size={20} />
                                            <h3 className="font-semibold text-lg">Alterações de Dados</h3>
                                        </div>

                                        <div className="space-y-4">
                                            {log.dadosAntes && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Dados Antes</span>
                                                    </div>
                                                    <pre className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto custom-scrollbar">
                                                        {JSON.stringify(log.dadosAntes, null, 2)}
                                                    </pre>
                                                </div>
                                            )}

                                            {log.dadosDepois && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-green-500 uppercase tracking-wider">Dados Depois</span>
                                                    </div>
                                                    <pre className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto custom-scrollbar">
                                                        {JSON.stringify(log.dadosDepois, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
