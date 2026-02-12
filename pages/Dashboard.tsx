
import React from 'react';
import { 
  Users, 
  UtensilsCrossed, 
  CreditCard, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { User, Tenant } from '../types';

const data = [
  { name: 'Lun', presences: 420, revenus: 2100 },
  { name: 'Mar', presences: 380, revenus: 1900 },
  { name: 'Mer', presences: 250, revenus: 1250 },
  { name: 'Jeu', presences: 410, revenus: 2050 },
  { name: 'Ven', presences: 390, revenus: 1950 },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  trend: string;
  isUp: boolean;
  icon: any;
  color: string;
}> = ({ title, value, trend, isUp, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend}
        {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      </div>
    </div>
    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
  </div>
);

interface DashboardProps {
  user: User;
  tenant: Tenant;
}

const Dashboard: React.FC<DashboardProps> = ({ user, tenant }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500">Bienvenue, {user.profile.firstName}. Voici ce qui se passe aujourd'hui.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors">
            Exporter le rapport
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium shadow-md shadow-indigo-200 transition-all">
            Pointer les présences
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Élèves inscrits" 
          value="458" 
          trend="+12%" 
          isUp={true} 
          icon={Users} 
          color="bg-blue-600"
        />
        <StatCard 
          title="Repas servis (Auj.)" 
          value="392" 
          trend="+3%" 
          isUp={true} 
          icon={UtensilsCrossed} 
          color="bg-orange-600"
        />
        <StatCard 
          title="Recettes (Semaine)" 
          value="9,250 €" 
          trend="+8.5%" 
          isUp={true} 
          icon={TrendingUp} 
          color="bg-indigo-600"
        />
        <StatCard 
          title="Abonnements en attente" 
          value="14" 
          trend="-2" 
          isUp={false} 
          icon={CreditCard} 
          color="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Fréquentation hebdomadaire</h3>
            <select className="text-sm bg-slate-50 border-none rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500/10">
              <option>Cette semaine</option>
              <option>Semaine dernière</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPres" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="presences" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorPres)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6">Activités récentes</h3>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Nouvel élève inscrit', time: 'il y a 2 min', type: 'registration' },
              { label: 'Paiement de 150€ validé', time: 'il y a 15 min', type: 'payment' },
              { label: 'Menu modifié par Admin', time: 'il y a 1h', type: 'system' },
              { label: 'Rapport mensuel prêt', time: 'il y a 3h', type: 'report' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 z-10 relative" />
                  {i !== 3 && <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-[-24px] w-px bg-slate-100" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{activity.label}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            Voir tout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
