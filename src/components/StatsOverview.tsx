/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { StudyGoal } from '../types/goal';

interface StatsOverviewProps {
  goals: StudyGoal[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ goals }) => {
  const total = goals.length;
  const naoIniciados = goals.filter((g) => g.status === 'nao_iniciado').length;
  const emAndamento = goals.filter((g) => g.status === 'em_andamento').length;
  const concluidos = goals.filter((g) => g.status === 'concluido').length;

  const percentage = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return (
    <section className="mb-8" aria-label="Resumo do progresso de estudos">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-600">Total de Metas</span>
            <Target className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {total}
            </span>
            <span className="text-xs text-slate-500">
              {total === 1 ? 'objetivo' : 'objetivos'}
            </span>
          </div>
        </div>

        {/* Não Iniciados */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-600">Não Iniciados</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {naoIniciados}
            </span>
            <span className="text-xs text-amber-700 font-medium">a começar</span>
          </div>
        </div>

        {/* Em Andamento */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-600">Em Andamento</span>
            <Sparkles className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {emAndamento}
            </span>
            <span className="text-xs text-blue-700 font-medium">no foco</span>
          </div>
        </div>

        {/* Concluídos */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-600">Concluídos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {concluidos}
            </span>
            <span className="text-xs text-emerald-700 font-medium">conquistados</span>
          </div>
        </div>
      </div>

      {/* Barra de Progresso Geral */}
      {total > 0 && (
        <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Seu Ritmo de Conclusão
              </span>
              <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                {percentage}%
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {concluidos === total
                ? 'Parabéns! Todos os seus objetivos atuais foram concluídos.'
                : `${concluidos} de ${total} objetivos finalizados. Continue no seu ritmo!`}
            </p>
          </div>

          <div className="w-full sm:w-64 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}
    </section>
  );
};
