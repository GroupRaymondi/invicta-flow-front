import { useState } from 'react';
import { Shield, Users, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { UsersTab } from '../components/permissoes-usuarios/UsersTab';
import { RolesTab } from '../components/permissoes-usuarios/RolesTab';

export default function PermissionsPage() {
    const [activeTab, setActiveTab] = useState('usuarios');

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
                    <Lock className="w-8 h-8 text-primary" />
                    Permissões & Usuários
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Gerencie quem tem acesso ao sistema e o que cada um pode fazer. Controle total sobre sua equipe.
                </p>
            </div>

            {/* Main Content */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b border-border bg-muted/30 px-6 pt-4">
                        <TabsList className="bg-transparent p-0 gap-6">
                            <TabsTrigger
                                value="usuarios"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-2 pb-4 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                            >
                                <Users size={18} />
                                Usuários
                            </TabsTrigger>
                            <TabsTrigger
                                value="papeis"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-2 pb-4 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                            >
                                <Shield size={18} />
                                Papéis & Permissões
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6 bg-background min-h-[600px]">
                        <TabsContent value="usuarios" className="mt-0 focus-visible:outline-none">
                            <UsersTab />
                        </TabsContent>

                        <TabsContent value="papeis" className="mt-0 focus-visible:outline-none">
                            <RolesTab />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
