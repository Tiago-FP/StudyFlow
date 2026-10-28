/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Plus, Sparkles, SearchX } from 'lucide-react';

interface EmptyStateProps {
  isFiltering: boolean;
  onOpenNewGoal: () => void;
  onClearFilters?: () => void;
  onLoadSamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltering,
  onOpenNewGoal,
  onClearFilters,
  onLoadSamples,
}) => {
  if (isFiltering) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Nenhum objetivo encontrado
        </h3>
        <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto leading-relaxed">
          Não encontramos nenhum objetivo com os termos de busca ou filtros selecionados. Tente ajustar os filtros.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Limpar filtros e busca
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-10 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Nenhum objetivo cadastrado ainda
      </h3>

      <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-md mx-auto">
        Toda grande conquista de aprendizado começa com o primeiro passo. Cadastre o que você quer estudar e defina uma data para manter o foco.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenNewGoal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Meu Primeiro Objetivo</span>
        </button>

        {onLoadSamples && (
          <button
            onClick={onLoadSamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Carregar exemplos sugeridos</span>
          </button>
        )}
      </div>
    </div>
  );
};
