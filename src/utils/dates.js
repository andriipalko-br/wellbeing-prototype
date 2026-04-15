import { format, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';

export function formatLongDate(iso) {
  const d = typeof iso === 'string' ? parseISO(iso) : iso;
  return format(d, 'd MMMM yyyy', { locale: uk });
}

export function formatLongDateTime(iso, time) {
  return `${formatLongDate(iso)}, ${time}`;
}

export function toISODate(date) {
  return format(date, 'yyyy-MM-dd');
}

export function parseISODate(iso) {
  return parseISO(iso);
}
