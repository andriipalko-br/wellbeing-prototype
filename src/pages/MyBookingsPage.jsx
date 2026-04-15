import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { isBefore, parseISO, startOfDay } from 'date-fns';
import { CalendarClock, History, Clock, CalendarHeart } from 'lucide-react';
import {
  useAppStore,
  selectAllUserBookings,
  selectSpecialistById,
} from '@/store/useAppStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/Avatar';
import { cn } from '@/lib/utils';
import { formatLongDateTime } from '@/utils/dates';

const STATUS_LABEL = {
  upcoming: { label: 'Заплановано', variant: 'secondary' },
  'past-attended': { label: 'Відвідано', variant: 'success' },
  cancelled: { label: 'Скасовано', variant: 'muted' },
};

const STATUS_STRIPE = {
  upcoming: 'before:bg-primary',
  'past-attended': 'before:bg-neutral-300',
  cancelled: 'before:bg-neutral-200',
};

export default function MyBookingsPage() {
  const state = useAppStore();
  const bookings = selectAllUserBookings(state);

  const { upcoming, past } = useMemo(() => {
    const today = startOfDay(new Date());
    const up = [];
    const pa = [];
    for (const b of bookings) {
      const isPastDate = isBefore(parseISO(b.dateISO), today);
      if (b.status === 'upcoming' && !isPastDate) up.push(b);
      else pa.push(b);
    }
    const sortByDateDesc = (a, b) => (a.dateISO < b.dateISO ? 1 : -1);
    const sortByDateAsc = (a, b) => (a.dateISO < b.dateISO ? -1 : 1);
    return { upcoming: up.sort(sortByDateAsc), past: pa.sort(sortByDateDesc) };
  }, [bookings]);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl">Мої записи</h1>
        <Card className="rounded-2xl border-brand-100 bg-brand-soft shadow-card">
          <CardContent className="flex flex-col items-center gap-4 p-12 text-center">
            <CalendarHeart className="h-12 w-12 text-brand-500/70" strokeWidth={1.5} />
            <p className="text-muted-foreground">У вас ще немає записів на консультації.</p>
            <Button asChild>
              <Link to="/">Переглянути спеціалістів</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Мої записи</h1>

      <Section
        icon={<CalendarClock className="h-5 w-5 text-brand-700" />}
        title="Майбутні"
        bookings={upcoming}
        state={state}
        emptyMessage="Запланованих консультацій наразі немає."
      />
      <Section
        icon={<History className="h-5 w-5 text-muted-foreground" />}
        title="Минулі"
        bookings={past}
        state={state}
        emptyMessage="Минулих консультацій немає."
      />
    </div>
  );
}

function Section({ icon, title, bookings, state, emptyMessage }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {bookings.map((b) => {
            const specialist = selectSpecialistById(state, b.specialistId);
            const meta = STATUS_LABEL[b.status] ?? STATUS_LABEL.upcoming;
            const stripe = STATUS_STRIPE[b.status] ?? STATUS_STRIPE.upcoming;
            return (
              <Card
                key={b.id}
                className={cn(
                  'relative overflow-hidden rounded-2xl shadow-card',
                  'before:absolute before:inset-y-0 before:left-0 before:w-1 before:content-[""]',
                  stripe
                )}
              >
                <CardContent className="flex items-center gap-4 p-4 pl-5">
                  <Avatar
                    name={specialist?.name ?? '?'}
                    colorHex={specialist?.colorHex}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-bold">{specialist?.name ?? 'Спеціаліст'}</p>
                      <Badge variant={meta.variant}>{meta.label}</Badge>
                    </div>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {formatLongDateTime(b.dateISO, b.time)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
