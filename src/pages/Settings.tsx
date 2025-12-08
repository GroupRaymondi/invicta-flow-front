import { useState } from 'react';
import {
    User,
    Lock,
    Globe,
    Shield,
    Landmark,
    FileText,
    CheckCircle,
    PenTool
} from 'lucide-react';

export const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');

    // Banking State
    const [bankingInfo, setBankingInfo] = useState({
        companyName: '',
        employeeName: '',
        einNumber: '',
        accountNumber: '',
        routingNumber: '',
        phone: ''
    });
    const [isBankingSaved, setIsBankingSaved] = useState(false);
    const [isEditingBanking, setIsEditingBanking] = useState(true);

    // Contract State
    const [isContractSigned, setIsContractSigned] = useState(false);
    const [contractData, setContractData] = useState<{ date: string; ip: string } | null>(null);

    const handleSaveBanking = () => {
        setIsBankingSaved(true);
        setIsEditingBanking(false);
    };

    const handleEditBanking = () => {
        setIsEditingBanking(true);
    };

    const handleSignContract = () => {
        // Mocking IP capture and signing process
        const mockIp = "192.168.1.105"; // In a real app, this would come from the backend
        const date = new Date().toLocaleString();
        setContractData({ date, ip: mockIp });
        setIsContractSigned(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
                <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-card border border-border rounded-xl overflow-hidden sticky top-24">
                        <nav className="flex flex-col p-2 gap-1">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <User size={18} />
                                Geral
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <Lock size={18} />
                                Segurança
                            </button>
                            <button
                                onClick={() => setActiveTab('banking')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'banking'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <Landmark size={18} />
                                Meu Banco
                            </button>
                            <button
                                onClick={() => setActiveTab('contract')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'contract'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <FileText size={18} />
                                Contrato
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <User size={20} className="text-primary" />
                                    Perfil do Usuário
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                                            LR
                                        </div>
                                        <div>
                                            <button className="text-sm font-medium text-primary hover:underline">Alterar foto</button>
                                            <p className="text-xs text-muted-foreground">JPG, GIF ou PNG. Max 1MB.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                                            <input
                                                type="text"
                                                defaultValue="Lucas Raymondi"
                                                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                                            <input
                                                type="email"
                                                defaultValue="lucas@invicta.com"
                                                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                                            <input
                                                type="tel"
                                                placeholder="+55 (11) 99999-9999"
                                                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Data de Nascimento</label>
                                            <input
                                                type="date"
                                                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-sm font-medium text-muted-foreground">Endereço Completo</label>
                                            <input
                                                type="text"
                                                placeholder="Rua Exemplo, 123, Bairro, Cidade - Estado"
                                                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Cargo</label>
                                            <input
                                                type="text"
                                                defaultValue="Administrador"
                                                disabled
                                                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Globe size={20} className="text-primary" />
                                    Preferências do Sistema
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Idioma</label>
                                            <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors">
                                                <option>Português (Brasil)</option>
                                                <option>English (US)</option>
                                                <option>Español</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Fuso Horário</label>
                                            <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors">
                                                <option>(GMT-03:00) Brasília</option>
                                                <option>(GMT-04:00) Manaus</option>
                                                <option>(GMT-05:00) New York</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Lock size={20} className="text-primary" />
                                    Alterar Senha
                                </h2>
                                <div className="space-y-4 max-w-md">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-muted-foreground">Senha Atual</label>
                                        <input
                                            type="password"
                                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-muted-foreground">Nova Senha</label>
                                        <input
                                            type="password"
                                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-muted-foreground">Confirmar Nova Senha</label>
                                        <input
                                            type="password"
                                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <button className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                        Atualizar Senha
                                    </button>
                                </div>
                            </div>

                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Shield size={20} className="text-primary" />
                                    Autenticação de Dois Fatores (2FA)
                                </h2>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Proteger minha conta</p>
                                        <p className="text-sm text-muted-foreground">Adiciona uma camada extra de segurança à sua conta.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'banking' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold flex items-center gap-2">
                                        <Landmark size={20} className="text-primary" />
                                        Dados Bancários
                                    </h2>
                                    {!isEditingBanking && (
                                        <button
                                            onClick={handleEditBanking}
                                            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                                        >
                                            <PenTool size={14} />
                                            Editar
                                        </button>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground mb-6">
                                    Informe seus dados bancários para o recebimento de salários e comissões.
                                </p>

                                <div className="space-y-4 max-w-2xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Nome da Empresa</label>
                                            <input
                                                type="text"
                                                value={bankingInfo.companyName}
                                                onChange={(e) => setBankingInfo({ ...bankingInfo, companyName: e.target.value })}
                                                disabled={!isEditingBanking}
                                                placeholder="Ex: Minha Empresa LLC"
                                                className={`w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${!isEditingBanking ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''}`}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Nome do Colaborador</label>
                                            <input
                                                type="text"
                                                value={bankingInfo.employeeName}
                                                onChange={(e) => setBankingInfo({ ...bankingInfo, employeeName: e.target.value })}
                                                disabled={!isEditingBanking}
                                                placeholder="Ex: Lucas Raymondi"
                                                className={`w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${!isEditingBanking ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''}`}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">EIN Number</label>
                                            <input
                                                type="text"
                                                value={bankingInfo.einNumber}
                                                onChange={(e) => setBankingInfo({ ...bankingInfo, einNumber: e.target.value })}
                                                disabled={!isEditingBanking}
                                                placeholder="Ex: 12-3456789"
                                                className={`w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${!isEditingBanking ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''}`}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Account Number</label>
                                            <input
                                                type="text"
                                                value={bankingInfo.accountNumber}
                                                onChange={(e) => setBankingInfo({ ...bankingInfo, accountNumber: e.target.value })}
                                                disabled={!isEditingBanking}
                                                placeholder="Ex: 123456789"
                                                className={`w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${!isEditingBanking ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''}`}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Routing Number</label>
                                            <input
                                                type="text"
                                                value={bankingInfo.routingNumber}
                                                onChange={(e) => setBankingInfo({ ...bankingInfo, routingNumber: e.target.value })}
                                                disabled={!isEditingBanking}
                                                placeholder="Ex: 021000021"
                                                className={`w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${!isEditingBanking ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''}`}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                                            <input
                                                type="text"
                                                value={bankingInfo.phone}
                                                onChange={(e) => setBankingInfo({ ...bankingInfo, phone: e.target.value })}
                                                disabled={!isEditingBanking}
                                                placeholder="Ex: +1 (555) 000-0000"
                                                className={`w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors ${!isEditingBanking ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''}`}
                                            />
                                        </div>
                                    </div>
                                    {isEditingBanking && (
                                        <div className="pt-4">
                                            <button
                                                onClick={handleSaveBanking}
                                                className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                            >
                                                Salvar Dados Bancários
                                            </button>
                                        </div>
                                    )}
                                    {isBankingSaved && !isEditingBanking && (
                                        <div className="flex items-center gap-2 text-green-500 text-sm mt-4 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                            <CheckCircle size={16} />
                                            <span>Dados salvos com sucesso!</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contract' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <FileText size={20} className="text-primary" />
                                    Contrato de Trabalho
                                </h2>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Leia atentamente o contrato abaixo. Ao assinar, você concorda com todos os termos e condições.
                                </p>

                                {/* Mock PDF Viewer */}
                                <div className="bg-muted/30 border border-border rounded-lg p-8 mb-6 h-[500px] overflow-y-auto custom-scrollbar">
                                    <div className="max-w-3xl mx-auto bg-white text-black p-12 shadow-sm min-h-full">
                                        <div className="text-center mb-8">
                                            <h3 className="text-xl font-bold uppercase mb-2">Contrato de Prestação de Serviços</h3>
                                            <p className="text-sm text-gray-500">Invicta Flow Inc.</p>
                                        </div>
                                        <div className="space-y-4 text-sm text-justify leading-relaxed">
                                            <p>
                                                <strong>CONTRATANTE:</strong> Invicta Flow Inc., pessoa jurídica de direito privado...
                                            </p>
                                            <p>
                                                <strong>CONTRATADO:</strong> Lucas Raymondi, portador do documento...
                                            </p>
                                            <p>
                                                <strong>CLÁUSULA PRIMEIRA - DO OBJETO:</strong> O presente contrato tem por objeto a prestação de serviços de...
                                            </p>
                                            <p>
                                                <strong>CLÁUSULA SEGUNDA - DA VIGÊNCIA:</strong> Este contrato entra em vigor na data de sua assinatura...
                                            </p>
                                            <p>
                                                <strong>CLÁUSULA TERCEIRA - DA REMUNERAÇÃO:</strong> Pelo serviços prestados, a CONTRATANTE pagará ao CONTRATADO...
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </p>
                                            <p>
                                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </p>
                                            {/* More mock content to make it scrollable */}
                                            <p>
                                                <strong>CLÁUSULA QUARTA - DA CONFIDENCIALIDADE:</strong> O CONTRATADO compromete-se a manter sigilo absoluto...
                                            </p>
                                            <p>
                                                <strong>CLÁUSULA QUINTA - DA RESCISÃO:</strong> O presente contrato poderá ser rescindido por qualquer das partes...
                                            </p>
                                            <br />
                                            <br />
                                            <div className="mt-12 pt-8 border-t border-gray-300">
                                                <p className="mb-2">Local e Data: São Paulo, {new Date().toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Signature Section */}
                                <div className="bg-muted/50 rounded-lg p-6 border border-border">
                                    {isContractSigned ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-2 text-green-600 font-semibold text-lg">
                                                <CheckCircle size={24} />
                                                Contrato Assinado Digitalmente
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                                <div className="bg-background p-3 rounded border border-border">
                                                    <span className="block text-xs font-medium uppercase mb-1">Assinado por</span>
                                                    <span className="text-foreground font-medium">Lucas Raymondi</span>
                                                </div>
                                                <div className="bg-background p-3 rounded border border-border">
                                                    <span className="block text-xs font-medium uppercase mb-1">Data e Hora</span>
                                                    <span className="text-foreground font-medium">{contractData?.date}</span>
                                                </div>
                                                <div className="bg-background p-3 rounded border border-border">
                                                    <span className="block text-xs font-medium uppercase mb-1">IP de Origem</span>
                                                    <span className="text-foreground font-medium">{contractData?.ip}</span>
                                                </div>
                                                <div className="bg-background p-3 rounded border border-border">
                                                    <span className="block text-xs font-medium uppercase mb-1">Hash da Assinatura</span>
                                                    <span className="text-foreground font-medium font-mono text-xs">f7a9c2e4b8d1...3a5b9</span>
                                                </div>
                                            </div>
                                            <button className="mt-2 w-full md:w-auto bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
                                                <FileText size={16} />
                                                Baixar Cópia Assinada
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div className="text-sm text-muted-foreground">
                                                <p>Ao clicar em "Assinar Contrato", você concorda com os termos acima e confirma que esta ação tem validade jurídica.</p>
                                                <p className="mt-1 text-xs">Seu endereço IP será registrado para fins de auditoria.</p>
                                            </div>
                                            <button
                                                onClick={handleSignContract}
                                                className="whitespace-nowrap bg-primary text-primary-foreground font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                                            >
                                                <PenTool size={18} />
                                                Assinar Contrato
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
