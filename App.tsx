
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Menus from './pages/Menus';
import Students from './pages/Students';
import Settings from './pages/Settings';
import { User, UserRole, AccountStatus, Tenant } from './types';

// Mock Auth State
const INITIAL_USER: User = {
  id: 'u1',
  tenantId: 't1',
  email: 'admin@school.edu',
  role: UserRole.SCHOOL_ADMIN,
  status: AccountStatus.ACTIVE,
  profile: {
    firstName: 'Jean',
    lastName: 'Dupont',
    avatar: 'https://picsum.photos/seed/admin/200'
  }
};

const INITIAL_TENANT: Tenant = {
  id: 't1',
  name: 'Lycée International de Paris',
  subdomain: 'lycee-intl-paris',
  isActive: true,
  settings: {
    currency: 'EUR',
    timezone: 'Europe/Paris'
  }
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(INITIAL_USER);
  const [tenant, setTenant] = useState<Tenant>(INITIAL_TENANT);

  // Simplified Router Implementation
  return (
    <Router>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {user && <Sidebar user={user} />}
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {user && <Header user={user} tenant={tenant} />}
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard user={user} tenant={tenant} />} />
              <Route path="/menus" element={<Menus tenant={tenant} />} />
              <Route path="/students" element={<Students tenant={tenant} />} />
              <Route path="/settings" element={<Settings user={user} tenant={tenant} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
