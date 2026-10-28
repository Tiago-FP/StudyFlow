/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Calendar,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { StudyGoal, GoalStatus, STATUS_LABELS } from '../types/goal';
import { formatFriendlyDeadline } from '../utils/dateUtils';

interface GoalCardProps {
  goal: StudyGoal;
  onEdit: (goal: StudyGoal) => void;
  onDeleteRequest: (goal: StudyGoal) => void;
  onStatusChange: (id: string, newStatus: GoalStatus) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onDeleteRequest,
  onStatusChange,
}) => {
  const isDone = goal.status === 'concluido';
  const deadlineInfo = formatFriendlyDeadline(goal.deadline);

  // Status visual cues
  const getStatusIcon = (status: GoalStatus) => {
    switch (status) {
      case 'concluido':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'em_andamento':
        return <Sparkles className="w-3.5 h-3.5 text-blue-600" />;
      case 'nao_iniciado':
      default:
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const getUrgencyClasses = () => {
    if (isDone) {
      return 'text-slate-400';
    }
    switch (deadlineInfo.urgency) {
      case 'overdue':
        return 'text-rose-600 font-semibold';
      case 'today':
        return 'text-amber-600 font-semibold';
      case 'upcoming':
        return 'text-indigo-600 font-medium';
      case 'later':
      default:
        return 'text-slate-500';
    }
  };

  return (
    <div
      className={`group relative bg-white border rounded-xl p-5 transition-all shadow-xs hover:shadow-sm ${
        isDone
          ? 'border-slate-200/80 bg-slate-50/40'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col h-full justify-between gap-4">
        {/* Top: Status seletor rápido & Botões de ação */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Status Selector Dropdown amigável */}
            <div className="relative inline-flex items-center gap-1.5">
              {getStatusIcon(goal.status)}
              <select
                value={goal.status}
                onChange={(e) => onStatusChange(goal.id, e.target.value as GoalStatus)}
                aria-label="Alterar status do objetivo"
                className={`text-xs font-semibold py-1 pl-1.5 pr-6 rounded-md bg-transparent border-0 cursor-pointer focus:ring-2 focus:ring-indigo-100 outline-none transition-colors ${
                  goal.status === 'concluido'
                    ? 'text-emerald-700 hover:bg-emerald-50'
                    : goal.status === 'em_andamento'
                    ? 'text-blue-700 hover:bg-blue-50'
                    : 'text-amber-800 hover:bg-amber-50'
                }`}
              >
                <option value="nao_iniciado">Não iniciado</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Ações: Editar e Excluir */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(goal)}
                title="Editar este objetivo"
                aria-label={`Editar objetivo ${goal.title}`}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteRequest(goal)}
                title="Excluir este objetivo"
                aria-label={`Excluir objetivo ${goal.title}`}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Título */}
          <h3
            className={`text-base font-semibold leading-snug tracking-tight ${
              isDone ? 'line-through text-slate-400' : 'text-slate-900'
            }`}
          >
            {goal.title}
          </h3>

          {/* Descrição */}
          {goal.description && (
            <p
              className={`text-xs mt-2 leading-relaxed whitespace-pre-line ${
                isDone ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {goal.description}
            </p>
          )}
        </div>

        {/* Rodapé do Card: Prazo e data de cadastro */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-600 font-medium">
              {deadlineInfo.formattedDate}
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className={getUrgencyClasses()}>
              {deadlineInfo.badgeLabel}
            </span>
          </div>

          {/* Indicador de conclusão rápida */}
          {!isDone && (
            <button
              onClick={() => onStatusChange(goal.id, 'concluido')}
              className="text-xs text-slate-500 hover:text-emerald-700 font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              Marcar pronto
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
