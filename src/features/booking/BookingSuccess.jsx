import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatLongDateTime } from '@/utils/dates';

export default function BookingSuccess({ specialistName, dateISO, time }) {
  return (
    <Card className="overflow-hidden rounded-2xl border-brand-100 bg-brand-soft shadow-card">
      <CardContent className="flex flex-col items-center gap-5 p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>
        <div>
          <h2 className="text-3xl">Запис підтверджено!</h2>
          <p className="mt-3 text-base font-bold">{specialistName}</p>
          <p className="text-sm text-muted-foreground">
            {formatLongDateTime(dateISO, time)}
          </p>
        </div>
        <div className="mt-2 flex flex-col items-center gap-3">
          <Button asChild size="lg">
            <Link to="/my-bookings">
              Мої записи
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Link
            to="/"
            className="text-sm font-bold text-brand-700 underline-offset-4 hover:underline"
          >
            Повернутись до каталогу
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
