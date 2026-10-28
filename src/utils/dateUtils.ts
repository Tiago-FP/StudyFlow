/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Converte data YYYY-MM-DD em representação amigável em português.
 */
export function formatFriendlyDeadline(deadlineStr: string): {
  formattedDate: string;
  badgeLabel: string;
  urgency: 'overdue' | 'today' | 'upcoming' | 'later';
} {
  if (!deadlineStr) {
    return {
      formattedDate: 'Sem prazo definido',
      badgeLabel: 'Sem prazo',
      urgency: 'later',
    };
  }

  // Parse YYYY-MM-DD mantendo o timezone local
  const [year, month, day] = deadlineStr.split('-').map(Number);
  const deadlineDate = new Date(year, month - 1, day);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(deadlineDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = target.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (diffDays < 0) {
    const daysLate = Math.abs(diffDays);
    return {
      formattedDate,
      badgeLabel: daysLate === 1 ? 'Atrasado 1 dia' : `Atrasado há ${daysLate} dias`,
      urgency: 'overdue',
    };
  }

  if (diffDays === 0) {
    return {
      formattedDate,
      badgeLabel: 'Vence hoje!',
      urgency: 'today',
    };
  }

  if (diffDays === 1) {
    return {
      formattedDate,
      badgeLabel: 'Vence amanhã',
      urgency: 'upcoming',
    };
  }

  if (diffDays <= 7) {
    return {
      formattedDate,
      badgeLabel: `Vence em ${diffDays} dias`,
      urgency: 'upcoming',
    };
  }

  return {
    formattedDate,
    badgeLabel: `Em ${diffDays} dias`,
    urgency: 'later',
  };
}

/**
 * Retorna uma data no formato YYYY-MM-DD com deslocamento de dias a partir de hoje.
 */
export function getIsoDateWithOffset(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
