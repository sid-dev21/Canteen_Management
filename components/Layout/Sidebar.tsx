
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { User, UserRole } from '../../types';

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();
  
  const menuItems = [
    { label: 'Tableau de bord', icon: LayoutDashboard, path: '/', roles: [UserRole.SCHOOL_ADMIN, UserRole.CANTEEN_MANAGER] },
    { label: 'Menus', icon: Utensils, path: '/menus', roles: [UserRole.SCHOOL_ADMIN, UserRole.CANTEEN_MANAGER] },
    { label: 'Élèves', icon: Users, path: '/students', roles: [UserRole.SCHOOL_ADMIN, UserRole.CANTEEN_MANAGER] },
    { label: 'Paiements', icon: CreditCard, path: '/payments', roles: [UserRole.SCHOOL_ADMIN] },
    { label: 'Rapports', icon: BarChart3, path: '/reports', roles: [UserRole.SCHOOL_ADMIN, UserRole.CANTEEN_MANAGER] },
    { label: 'Paramètres', icon: Settings, path: '/settings', roles: [UserRole.SCHOOL_ADMIN, UserRole.CANTEEN_MANAGER] },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">CanteenPay</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.filter(item => item.roles.includes(user.role)).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="ml-auto w-4 h-4 text-indigo-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors">
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
