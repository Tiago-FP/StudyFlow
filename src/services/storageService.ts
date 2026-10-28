/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudyGoal, GoalFormData } from '../types/goal';

const STORAGE_KEY = 'studyflow_goals_data_v1';

export const storageService = {
  /**
   * Carrega todos os objetivos salvos no localStorage.
   */
  getGoals(): StudyGoal[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return [];
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao recuperar objetivos do localStorage:', error);
      return [];
    }
  },

  /**
   * Salva a lista completa de objetivos no localStorage.
   */
  saveGoals(goals: StudyGoal[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  },

  /**
   * Adiciona um novo objetivo.
   */
  createGoal(formData: GoalFormData): StudyGoal {
    const goals = this.getGoals();
    const now = new Date().toISOString();
    const newGoal: StudyGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline,
      status: formData.status,
      createdAt: now,
      updatedAt: now,
    };

    const updatedGoals = [newGoal, ...goals];
    this.saveGoals(updatedGoals);
    return newGoal;
  },

  /**
   * Atualiza um objetivo existente pelo ID.
   */
  updateGoal(id: string, updates: Partial<GoalFormData>): StudyGoal | null {
    const goals = this.getGoals();
    const index = goals.findIndex((g) => g.id === id);
    if (index === -1) return null;

    const existing = goals[index];
    const updated: StudyGoal = {
      ...existing,
      ...updates,
      title: updates.title !== undefined ? updates.title.trim() : existing.title,
      description: updates.description !== undefined ? updates.description.trim() : existing.description,
      updatedAt: new Date().toISOString(),
    };

    goals[index] = updated;
    this.saveGoals(goals);
    return updated;
  },

  /**
   * Remove um objetivo pelo ID.
   */
  deleteGoal(id: string): boolean {
    const goals = this.getGoals();
    const filtered = goals.filter((g) => g.id !== id);
    if (filtered.length === goals.length) {
      return false;
    }
    this.saveGoals(filtered);
    return true;
  },

  /**
   * Retorna objetivos de exemplo para iniciantes explorarem a aplicação.
   */
  getSampleGoals(): StudyGoal[] {
    const today = new Date();
    const formatDate = (offsetDays: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + offsetDays);
      return d.toISOString().split('T')[0];
    };

    const now = new Date().toISOString();

    return [
      {
        id: 'sample_1',
        title: 'Introdução ao Algoritmos e Lógica',
        description: 'Assistir às aulas 1 a 4 e resolver os exercícios práticos de fixação sobre variáveis e estruturas condicionais.',
        deadline: formatDate(3),
        status: 'em_andamento',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'sample_2',
        title: 'Configurar ambiente de desenvolvimento',
        description: 'Instalar o VS Code, Git e clonar o repositório de exercícios da disciplina.',
        deadline: formatDate(0),
        status: 'concluido',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'sample_3',
        title: 'Leitura do Capítulo 2: Fundamentos da Web',
        description: 'Fazer fichamento dos conceitos de HTML semântico, acessibilidade web e boas práticas.',
        deadline: formatDate(7),
        status: 'nao_iniciado',
        createdAt: now,
        updatedAt: now,
      },
    ];
  },

  /**
   * Carrega os exemplos de estudo no armazenamento.
   */
  seedSampleGoals(): StudyGoal[] {
    const samples = this.getSampleGoals();
    this.saveGoals(samples);
    return samples;
  },
};
