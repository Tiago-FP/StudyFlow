/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { StudyGoal } from '../types/goal';

interface ConfirmModalProps {
  isOpen: boolean;
  goal: StudyGoal | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  goal,
  onCancel,
  onConfirm,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !goal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h3 id="confirm-delete-title" className="text-base font-bold text-slate-900">
                Confirmar exclusão
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tem certeza de que deseja excluir este objetivo de estudo? Esta ação não poderá ser desfeita.
              </p>
            </div>
          </div>

          {/* Card com título do item a ser excluído */}
          <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <p className="text-xs font-semibold text-slate-800 line-clamp-2">
              "{goal.title}"
            </p>
            {goal.description && (
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                {goal.description}
              </p>
            )}
          </div>

          {/* Botões de Confirmação */}
          <div className="mt-6 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-rose-600 focus-visible:outline-offset-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Sim, excluir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
