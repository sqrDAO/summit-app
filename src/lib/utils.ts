export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function getDurationMins(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getSessionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    keynote: 'Keynote',
    panel: 'Panel',
    debate: 'Debate',
    networking: 'Networking',
    break: 'Break',
    showcase: 'Showcase',
    talk: 'Talk',
    opening: 'Opening',
    dinner: 'Dinner',
  };
  return labels[type] ?? type;
}

export function getPhaseLabel(phase: string): string {
  const labels: Record<string, string> = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
  };
  return labels[phase] ?? phase;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
