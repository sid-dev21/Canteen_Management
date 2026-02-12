
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, Mail, Phone, ExternalLink } from 'lucide-react';
import { Tenant } from '../types';

const MOCK_STUDENTS = [
  { id: '1', name: 'Alice Martin', class: '6ème A', parent: 'Jean Martin', balance: 45.50, status: 'Active' },
  { id: '2', name: 'Lucas Dubois', class: '5ème C', parent: 'Sophie Dubois', balance: -12.20, status: 'Active' },
  { id: '3', name: 'Chloé Leroy', class: '3ème B', parent: 'Marc Leroy', balance: 120.00, status: 'Active' },
  { id: '4', name: 'Thomas Petit', class: '4ème A', parent: 'Isabelle Petit', balance: 0.00, status: 'Inactive' },
  { id: '5', name: 'Emma Simon', class: '6ème A', parent: 'David Simon', balance: 88.40, status: 'Active' },
];

const Students: React.FC<{ tenant: Tenant }> = ({ tenant }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Élèves</h1>
          <p className="text-slate-500">Gérez les inscriptions, les classes et les soldes de cantine.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-all shadow-md shadow-indigo-100">
            <Plus className="w-4 h-4" />
            Nouvel élève
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un élève ou un parent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors">
              <Filter className="w-4 h-4" />
              Filtres
            </button>
            <button className="px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors">
              Exporter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Élève</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Classe</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Parent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Solde</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STUDENTS.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{student.class}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{student.parent}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3 text-slate-400 cursor-pointer hover:text-indigo-600" />
                        <Phone className="w-3 h-3 text-slate-400 cursor-pointer hover:text-indigo-600" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${student.balance < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                      {student.balance.toFixed(2)} €
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 md:p-6 bg-slate-50/30 flex items-center justify-between border-t border-slate-100">
          <span className="text-sm text-slate-500">Affichage de 1-5 sur 458 élèves</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Précédent</button>
            <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">1</button>
            <button className="px-3 py-1 text-sm bg-white border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="px-3 py-1 text-sm bg-white border border-slate-200 rounded hover:bg-slate-50">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
