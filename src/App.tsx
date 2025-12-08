import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { Processes } from './pages/Processes';
import { CRM } from './pages/CRM';
import { Financial } from './pages/Financial';
import { Audit } from './pages/Audit';
import { Commissions } from './pages/Commissions';
import PermissionsPage from './pages/Permissions';
import { Reports } from './pages/Reports';

import { AccountsReceivable } from './pages/financial/AccountsReceivable';
import { AccountsPayable } from './pages/financial/AccountsPayable';
import { AccountStatement } from './pages/financial/AccountStatement';

import { Settings } from './pages/Settings';

import { ReceitaPage } from './pages/relatorios/ReceitaPage';
import { FaturamentoPage } from './pages/relatorios/FaturamentoPage';
import { InadimplenciaPage } from './pages/relatorios/InadimplenciaPage';
import { AssinaturasPage } from './pages/relatorios/AssinaturasPage';
import { ContratosPage } from './pages/relatorios/ContratosPage';
import { Contratos } from './pages/Contratos';
import { Community } from './pages/Community';
import { SalesDashboard } from './pages/sales/SalesDashboard';
import { SalesProcessList } from './pages/sales/SalesProcessList';
import { SalesProcessDetails } from './pages/sales/SalesProcessDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="crm" element={<CRM />} />
          <Route path="financial" element={<Financial />} />
          <Route path="financial/receivables" element={<AccountsReceivable />} />
          <Route path="financial/payables" element={<AccountsPayable />} />
          <Route path="financial/statement" element={<AccountStatement />} />

          {/* Relatórios Detalhados */}
          <Route path="relatorios/receita" element={<ReceitaPage />} />
          <Route path="relatorios/faturamento" element={<FaturamentoPage />} />
          <Route path="relatorios/inadimplencia" element={<InadimplenciaPage />} />
          <Route path="relatorios/assinaturas" element={<AssinaturasPage />} />
          <Route path="relatorios/contratos" element={<ContratosPage />} />

          <Route path="contratos" element={<Contratos />} />
          <Route path="community" element={<Community />} />
          <Route path="processes" element={<Processes />} />

          {/* Sales Team Routes */}
          <Route path="sales/dashboard" element={<SalesDashboard />} />
          <Route path="sales/processes" element={<SalesProcessList />} />
          <Route path="sales/processes/:id" element={<SalesProcessDetails />} />

          <Route path="clients" element={<Clients />} />
          <Route path="commissions" element={<Commissions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="permissions" element={<PermissionsPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="audit" element={<Audit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
