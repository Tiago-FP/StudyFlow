/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, X } from 'lucide-react';
import { GoalFilter, StudyGoal } from '../types/goal';

interface GoalFiltersProps {
  currentFilter: GoalFilter;
  onFilterChange: (filter: GoalFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  goals: StudyGoal[];
}

export const GoalFilters: React.FC<GoalFiltersProps> = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  goals,
}) => {
  const counts = {
    todos: goals.length,
    nao_iniciado: goals.filter((g) => g.status === 'nao_iniciado').length,
    em_andamento: goals.filter((g) => g.status === 'em_andamento').length,
    concluido: goals.filter((g) => g.status === 'concluido').length,
  };

  const tabs: { key: GoalFilter; label: string; count: number }[] = [
    { key: 'todos', label: 'Todos', count: counts.todos },
    { key: 'nao_iniciado', label: 'Não iniciados', count: counts.nao_iniciado },
    { key: 'em_andamento', label: 'Em andamento', count: counts.em_andamento },
    { key: 'concluido', label: 'Concluídos', count: counts.concluido },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
      {/* Abas de Filtro Segmentado */}
      <div className="inline-flex p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = currentFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onFilterChange(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] font-mono tabular-nums px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-slate-100 text-slate-800' : 'text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Busca */}
      <div className="relative w-full md:w-72">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar objetivos..."
          className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl shadow-2xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Limpar busca"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
