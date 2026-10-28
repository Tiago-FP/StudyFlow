/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Calendar, BookOpen, FileText, CheckCircle2 } from 'lucide-react';
import { StudyGoal, GoalFormData, GoalStatus } from '../types/goal';
import { getIsoDateWithOffset } from '../utils/dateUtils';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => void;
  initialGoal?: StudyGoal | null;
}

export const GoalFormModal: React.FC<GoalFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialGoal,
}) => {
  const isEditing = Boolean(initialGoal);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<GoalStatus>('nao_iniciado');
  const [errorMessage, setErrorMessage] = useState('');

  // Preenche dados quando abrir no modo de edição ou limpa para novo
  useEffect(() => {
    if (initialGoal) {
      setTitle(initialGoal.title);
      setDescription(initialGoal.description || '');
      setDeadline(initialGoal.deadline || '');
      setStatus(initialGoal.status);
    } else {
      setTitle('');
      setDescription('');
      setDeadline(getIsoDateWithOffset(7)); // Padrão: 1 semana a partir de hoje
      setStatus('nao_iniciado');
    }
    setErrorMessage('');
  }, [initialGoal, isOpen]);

  // Tecla Escape para fechar o modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Por favor, informe um título para o seu objetivo de estudo.');
      return;
    }

    if (!deadline) {
      setErrorMessage('Por favor, selecione uma data limite/prazo para a conclusão.');
      return;
    }

    setErrorMessage('');
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline,
      status,
    });
  };

  const setShortcutDate = (offsetDays: number) => {
    setDeadline(getIsoDateWithOffset(offsetDays));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-goal-title"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              {isEditing ? <CheckCircle2 className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
            </div>
            <div>
              <h2 id="modal-goal-title" className="text-base font-bold text-slate-900">
                {isEditing ? 'Editar Objetivo de Estudo' : 'Cadastrar Novo Objetivo'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing
                  ? 'Atualize os detalhes do seu plano de estudo'
                  : 'Defina o que você vai aprender e quando quer terminar'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar janela"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {errorMessage && (
            <div
              className="p-3 text-xs rounded-lg bg-rose-50 border border-rose-200 text-rose-800"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          {/* Título */}
          <div className="space-y-1.5">
            <label htmlFor="goal-title" className="block text-xs font-semibold text-slate-700">
              Título do Objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              id="goal-title"
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dominar lógica com estruturas de repetição"
              maxLength={120}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg shadow-2xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>Seja específico e claro com sua meta</span>
              <span>{title.length}/120</span>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-1.5">
            <label htmlFor="goal-description" className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Descrição ou Conteúdos</span>
              <span className="text-[11px] font-normal text-slate-400">(opcional)</span>
            </label>
            <textarea
              id="goal-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Assistir aulas 3 a 5, fazer resumos de tópicos principais e resolver os 10 exercícios da lista..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg shadow-2xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Prazo com atalhos inteligentes */}
          <div className="space-y-1.5">
            <label htmlFor="goal-deadline" className="block text-xs font-semibold text-slate-700">
              Prazo de Conclusão <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="goal-deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg shadow-2xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800"
              />
            </div>

            {/* Sugestões rápidas de prazo para iniciantes */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 mr-1">Sugestões:</span>
              <button
                type="button"
                onClick={() => setShortcutDate(0)}
                className="px-2 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
              >
                Hoje
              </button>
              <button
                type="button"
                onClick={() => setShortcutDate(3)}
                className="px-2 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
              >
                Em 3 dias
              </button>
              <button
                type="button"
                onClick={() => setShortcutDate(7)}
                className="px-2 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
              >
                1 semana
              </button>
              <button
                type="button"
                onClick={() => setShortcutDate(14)}
                className="px-2 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
              >
                2 semanas
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Status do Objetivo
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('nao_iniciado')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                  status === 'nao_iniciado'
                    ? 'border-amber-400 bg-amber-50 text-amber-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Não iniciado
              </button>
              <button
                type="button"
                onClick={() => setStatus('em_andamento')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                  status === 'em_andamento'
                    ? 'border-blue-400 bg-blue-50 text-blue-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Em andamento
              </button>
              <button
                type="button"
                onClick={() => setStatus('concluido')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                  status === 'concluido'
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Concluído
              </button>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 cursor-pointer"
            >
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
