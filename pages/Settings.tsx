
import React from 'react';
import { User, Tenant } from '../types';
import { Globe, Building, Shield, Bell, User as UserIcon, CreditCard } from 'lucide-react';

const Settings: React.FC<{ user: User, tenant: Tenant }> = ({ user, tenant }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-500">Gérez vos préférences et la configuration de votre établissement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1">
          {[
            { label: 'Profil personnel', icon: UserIcon, active: true },
            { label: 'Établissement', icon: Building, active: false },
            { label: 'Paiements & Stripe', icon: CreditCard, active: false },
            { label: 'Notifications', icon: Bell, active: false },
            { label: 'Sécurité', icon: Shield, active: false },
          ].map((item, i) => (
            <button 
              key={i} 
              className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                item.active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-indigo-600" />
              Profil de l'administrateur
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <img 
                  src={user.profile.avatar} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-100" 
                  alt="Avatar"
                />
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Changer l'image</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Prénom</label>
                  <input type="text" defaultValue={user.profile.firstName} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nom</label>
                  <input type="text" defaultValue={user.profile.lastName} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                  <input type="email" defaultValue={user.email} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" disabled />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-indigo-600" />
              Configuration de l'école
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nom de l'école</label>
                <input type="text" defaultValue={tenant.name} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sous-domaine</label>
                <div className="flex items-center gap-1">
                  <input type="text" defaultValue={tenant.subdomain} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  <span className="text-slate-400 text-sm">.canteenpay.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50">Annuler</button>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-100">Enregistrer les modifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
