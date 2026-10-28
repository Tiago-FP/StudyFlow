/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GoalStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  deadline: string; // formato YYYY-MM-DD
  status: GoalStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type GoalFormData = Omit<StudyGoal, 'id' | 'createdAt' | 'updatedAt'>;

export type GoalFilter = 'todos' | GoalStatus;

export const STATUS_LABELS: Record<GoalStatus, string> = {
  nao_iniciado: 'Não iniciado',
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
};

export const STATUS_DESCRIPTIONS: Record<GoalStatus, string> = {
  nao_iniciado: 'Planejado para começar em breve',
  em_andamento: 'Estudo em progresso ativo',
  concluido: 'Meta concluída com sucesso',
};
