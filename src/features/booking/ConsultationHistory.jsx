import { History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatLongDateTime } from '@/utils/dates';

const STATUS_LABEL = {
  'past-attended': { label: 'Відвідано', variant: 'success' },
  cancelled: { label: 'Скасовано', variant: 'muted' },
  upcoming: { label: 'Заплановано', variant: 'secondary' },
};

export default function ConsultationHistory({ bookings }) {
  return (
    <Card className="rounded-2xl shadow-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-brand-700" />
          <h2 className="text-lg font-black">Мої консультації з цим спеціалістом</h2>
        </div>

        {bookings.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            У вас ще не було консультацій з цим спеціалістом.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col divide-y divide-neutral-100">
            {bookings.map((b) => {
              const meta = STATUS_LABEL[b.status] ?? STATUS_LABEL.upcoming;
              return (
                <li
                  key={b.id}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <span className="text-sm font-bold">{formatLongDateTime(b.dateISO, b.time)}</span>
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
