/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, BookOpenCheck } from 'lucide-react';

interface HeaderProps {
  onOpenNewGoal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNewGoal }) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Marca / Identidade */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
              StudyFlow
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              Organização simples para sua jornada de aprendizado
            </p>
          </div>
        </div>

        {/* Botão de Ação Primária */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenNewGoal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Objetivo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
