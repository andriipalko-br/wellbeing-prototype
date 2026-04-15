import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatLongDate } from '@/utils/dates';

export default function TimeSlotPicker({ dateISO, slots, selectedSlotId, onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <Clock className="mt-1 h-4 w-4 text-brand-700" />
        <div>
          <h2 className="text-lg font-bold leading-tight">Доступний час</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{formatLongDate(dateISO)}</p>
        </div>
      </div>

      {slots.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-4 text-sm text-muted-foreground">
          На цей день немає доступних слотів. Будь ласка, оберіть іншу дату.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot) => {
            const isSelected = slot.id === selectedSlotId;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => onSelect(slot.id)}
                className={cn(
                  'h-10 rounded-[8px] border text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-neutral-200 bg-white text-foreground hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700'
                )}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
