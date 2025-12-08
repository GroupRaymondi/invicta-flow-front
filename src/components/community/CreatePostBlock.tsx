import { Send, X } from 'lucide-react';

export const CreatePostBlock = () => {
    return (
        <div className="bg-white dark:bg-card border border-black/5 dark:border-border rounded-xl p-4 shadow-sm mb-8">
            <h2 className="text-[15px] font-bold text-foreground mb-4">Nova Publicação</h2>
            <div className="space-y-4">
                <textarea
                    placeholder="Escreva aqui uma atualização, aviso ou comunicado..."
                    className="w-full min-h-[100px] p-4 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
                <div className="flex items-center justify-end gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
                        <X size={16} strokeWidth={1.5} />
                        Cancelar
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                        <Send size={16} strokeWidth={1.5} />
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
};
