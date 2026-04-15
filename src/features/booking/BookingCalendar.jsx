import { DayPicker } from 'react-day-picker';
import { uk } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-day-picker/dist/style.css';
import { toISODate } from '@/utils/dates';
import { cn } from '@/lib/utils';

export default function BookingCalendar({ availableDays, selectedDate, onSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isAvailable = (date) => availableDays.has(toISODate(date));

  return (
    <DayPicker
      mode="single"
      selected={selectedDate ?? undefined}
      onSelect={(date) => onSelect(date ?? null)}
      locale={uk}
      weekStartsOn={1}
      showOutsideDays={false}
      disabled={{ before: today }}
      modifiers={{ available: (d) => isAvailable(d) }}
      modifiersClassNames={{
        available: 'has-slot',
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      classNames={{
        root: 'p-0',
        months: 'flex',
        month: 'space-y-4',
        caption: 'flex justify-center items-center relative pt-1 pb-2',
        caption_label: 'text-base font-black capitalize',
        nav: 'flex items-center gap-1',
        nav_button: cn(
          'h-9 w-9 rounded-lg border border-neutral-200 bg-white p-0',
          'hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700',
          'transition-colors inline-flex items-center justify-center'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'border-collapse',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-11 text-xs font-bold uppercase tracking-wider',
        row: 'flex mt-1',
        cell: 'h-11 w-11 text-center p-0 relative',
        day: cn(
          'relative h-11 w-11 p-0 text-sm font-bold rounded-lg',
          'hover:bg-brand-50 hover:text-brand-700',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors'
        ),
        day_selected:
          'bg-primary text-primary-foreground shadow-md ring-2 ring-brand-200 hover:!bg-primary hover:!text-primary-foreground',
        day_today: 'ring-1 ring-brand-300',
        day_disabled: 'text-muted-foreground/40 opacity-50 cursor-not-allowed',
        day_outside: 'text-muted-foreground opacity-50',
      }}
      footer={
        <style>{`
          .has-slot::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            border-radius: 9999px;
            background-color: hsl(var(--primary));
            pointer-events: none;
          }
          .has-slot[aria-selected="true"]::after {
            background-color: #ffffff;
          }
        `}</style>
      }
    />
  );
}
