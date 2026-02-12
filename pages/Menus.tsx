
import React, { useState } from 'react';
import { Sparkles, Save, Trash2, Plus, ChefHat } from 'lucide-react';
import { generateWeeklyMenuAI } from '../lib/gemini';
import { Tenant } from '../types';

const Menus: React.FC<{ tenant: Tenant }> = ({ tenant }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [constraints, setConstraints] = useState('');
  const [menu, setMenu] = useState<any[]>([]);

  const handleGenerateAI = async () => {
    if (!constraints) return;
    setIsGenerating(true);
    const result = await generateWeeklyMenuAI(constraints);
    if (result) {
      setMenu(result);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Menus</h1>
          <p className="text-slate-500">Planifiez les repas hebdomadaires avec l'aide de l'IA.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-all shadow-md shadow-emerald-100">
            <Save className="w-4 h-4" />
            Publier le menu
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Instructions pour l'IA</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="Ex: Menu végétarien, sans gluten, spécialités italiennes..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              />
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating || !constraints}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all"
              >
                {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Générer avec IA
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Notre IA générative Gemini 3 crée des menus équilibrés en respectant les normes nutritionnelles.
            </p>
          </div>
        </div>
      </div>

      {menu.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {menu.map((day, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-900">{day.day}</span>
                <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 space-y-4 flex-1">
                {day.meals.map((meal: any, j: number) => (
                  <div key={j} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase">{meal.type}</span>
                      <span className="text-sm font-semibold text-slate-900">{meal.price} €</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">{meal.name}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{meal.description}</p>
                    {meal.calories && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                        <ChefHat className="w-3 h-3" />
                        {meal.calories} kcal
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full py-3 border-t border-slate-50 text-xs font-semibold text-indigo-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
                <Plus className="w-3 h-3" />
                Ajouter un plat
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Aucun menu planifié</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">Utilisez l'outil de génération par IA ci-dessus pour commencer votre planification hebdomadaire.</p>
          <button className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors">
            Créer manuellement
          </button>
        </div>
      )}
    </div>
  );
};

const UtensilsCrossed: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 2-2.3 2.3c-.7.7-.7 1.9 0 2.7l1.2 1.2c.7.7 1.9.7 2.7 0L20 6"/><path d="m20 2-2.3 2.3c-.7.7-.7 1.9 0 2.7l1.2 1.2c.7.7 1.9.7 2.7 0L22 6"/><path d="m15 15 6 6"/><path d="m9 15-6 6"/><path d="M21 15a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6h18v-6Z"/><path d="M3 15v.01"/><path d="M21 15v.01"/></svg>
);

export default Menus;
