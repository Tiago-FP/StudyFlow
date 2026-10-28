/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { GoalFilters } from './components/GoalFilters';
import { GoalCard } from './components/GoalCard';
import { GoalFormModal } from './components/GoalFormModal';
import { ConfirmModal } from './components/ConfirmModal';
import { EmptyState } from './components/EmptyState';
import { StudyGoal, GoalFormData, GoalStatus, GoalFilter } from './types/goal';
import { storageService } from './services/storageService';
import { CheckCircle2, Info } from 'lucide-react';

export default function App() {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Estados dos Modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<StudyGoal | null>(null);

  // Estados de Filtros e Busca
  const [filter, setFilter] = useState<GoalFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Notificação temporária de feedback amigável
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const loaded = storageService.getGoals();
    setGoals(loaded);
    setIsLoaded(true);
  }, []);

  // Manipuladores de ação
  const handleOpenCreateModal = () => {
    setEditingGoal(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (goal: StudyGoal) => {
    setEditingGoal(goal);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (data: GoalFormData) => {
    if (editingGoal) {
      const updated = storageService.updateGoal(editingGoal.id, data);
      if (updated) {
        setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
        showNotification('Objetivo atualizado com sucesso!');
      }
    } else {
      const created = storageService.createGoal(data);
      setGoals((prev) => [created, ...prev]);
      showNotification('Novo objetivo cadastrado com sucesso!');
    }
    setIsFormModalOpen(false);
    setEditingGoal(null);
  };

  const handleStatusChange = (id: string, newStatus: GoalStatus) => {
    const updated = storageService.updateGoal(id, { status: newStatus });
    if (updated) {
      setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)));
      if (newStatus === 'concluido') {
        showNotification('Parabéns pela conquista! Objetivo marcado como concluído.');
      }
    }
  };

  const handleDeleteRequest = (goal: StudyGoal) => {
    setDeletingGoal(goal);
  };

  const handleConfirmDelete = () => {
    if (!deletingGoal) return;
    const success = storageService.deleteGoal(deletingGoal.id);
    if (success) {
      setGoals((prev) => prev.filter((g) => g.id !== deletingGoal.id));
      showNotification('Objetivo excluído com sucesso.');
    }
    setDeletingGoal(null);
  };

  const handleLoadSamples = () => {
    const samples = storageService.seedSampleGoals();
    setGoals(samples);
    showNotification('3 exemplos de estudo carregados com sucesso!');
  };

  // Filtra e busca objetivos
  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => {
      // Filtro de status
      if (filter !== 'todos' && goal.status !== filter) {
        return false;
      }
      // Busca por título ou descrição
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = goal.title.toLowerCase().includes(query);
        const matchesDesc = goal.description.toLowerCase().includes(query);
        return matchesTitle || matchesDesc;
      }
      return true;
    });
  }, [goals, filter, searchQuery]);

  // Se ainda estiver carregando localStorage, evita renderizar piscando
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500 font-medium">Carregando StudyFlow...</div>
      </div>
    );
  }

  const isFiltering = filter !== 'todos' || Boolean(searchQuery.trim());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Barra de Topo */}
      <Header onOpenNewGoal={handleOpenCreateModal} />

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {/* Banner acolhedor de boas-vindas */}
        <section className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Seus Objetivos de Estudo
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Acompanhe o que você planejou aprender e mantenha sua rotina clara.
              </p>
            </div>

            {goals.length > 0 && (
              <span className="text-xs text-slate-500 self-start sm:self-auto font-medium">
                Armazenado com segurança no seu navegador
              </span>
            )}
          </div>
        </section>

        {/* Notificação toast amigável */}
        {notification && (
          <div
            className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-2xs transition-all animate-fadeIn"
            role="status"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Quantidade e Estatísticas dos Objetivos */}
        <StatsOverview goals={goals} />

        {/* Controles de Filtro e Busca */}
        {goals.length > 0 && (
          <GoalFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            goals={goals}
          />
        )}

        {/* Lista de Objetivos ou Empty State */}
        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleOpenEditModal}
                onDeleteRequest={handleDeleteRequest}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            isFiltering={isFiltering}
            onOpenNewGoal={handleOpenCreateModal}
            onClearFilters={() => {
              setFilter('todos');
              setSearchQuery('');
            }}
            onLoadSamples={goals.length === 0 ? handleLoadSamples : undefined}
          />
        )}
      </main>

      {/* Rodapé sutil */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StudyFlow · Feito para apoiar estudantes em cada etapa.</p>
          <div className="flex items-center gap-4">
            <span>Privacidade: dados salvos localmente</span>
          </div>
        </div>
      </footer>

      {/* Modal de Criação / Edição */}
      <GoalFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingGoal(null);
        }}
        onSubmit={handleFormSubmit}
        initialGoal={editingGoal}
      />

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmModal
        isOpen={Boolean(deletingGoal)}
        goal={deletingGoal}
        onCancel={() => setDeletingGoal(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
