import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatLongDate } from '@/utils/dates';

export default function BookingSummary({ specialistName, dateISO, time, onConfirm }) {
  return (
    <div className="rounded-xl border border-brand-100 border-l-[3px] border-l-primary bg-brand-soft p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Ваш запис</p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
        <dt className="text-muted-foreground">Спеціаліст</dt>
        <dd className="text-right font-bold">{specialistName}</dd>
        <dt className="text-muted-foreground">Дата</dt>
        <dd className="text-right font-bold">{formatLongDate(dateISO)}</dd>
        <dt className="text-muted-foreground">Час</dt>
        <dd className="text-right font-bold">{time}</dd>
      </dl>
      <Button size="lg" className="mt-5 w-full" onClick={onConfirm}>
        <Check className="mr-2 h-4 w-4" strokeWidth={3} />
        Підтвердити запис
      </Button>
    </div>
  );
}
