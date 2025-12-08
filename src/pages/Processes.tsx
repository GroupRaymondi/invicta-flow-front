
import { Plus, MoreHorizontal, Calendar, Clock } from 'lucide-react';


const stages = ['Triagem', 'Documentação', 'Protocolo', 'Acompanhamento', 'Concluído'];

export const Processes = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Processos</h1>
                    <p className="text-muted-foreground">Acompanhe o andamento dos casos.</p>
                </div>
                <button className="bg-primary text-black font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Plus size={20} />
                    Novo Processo
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
                {stages.map((stage) => (
                    <div key={stage} className="min-w-[300px] flex-1">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="font-medium text-foreground">{stage}</h3>
                            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                                {Math.floor(Math.random() * 5)}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {/* Mock items for each column */}
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-card border border-border p-4 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                            Visto EB-2 NIW
                                        </span>
                                        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                    <h4 className="font-medium text-foreground mb-1">Ana Silva</h4>
                                    <p className="text-xs text-muted-foreground mb-4">Protocolo: #2024-{Math.floor(Math.random() * 1000)}</p>

                                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>20 Nov</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>2 dias</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
