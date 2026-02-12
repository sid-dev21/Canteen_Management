
import React from 'react';
import { Bell, Search, Menu as MenuIcon } from 'lucide-react';
import { User, Tenant } from '../../types';

interface HeaderProps {
  user: User;
  tenant: Tenant;
}

const Header: React.FC<HeaderProps> = ({ user, tenant }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 lg:px-8 shrink-0">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden md:block text-sm font-medium text-slate-500">{tenant.name}</span>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-48 lg:w-64"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{user.profile.firstName} {user.profile.lastName}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role.replace('_', ' ').toLowerCase()}</p>
          </div>
          <img 
            src={user.profile.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
