import { useNavigate } from 'react-router-dom';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/Avatar';
import { cn } from '@/lib/utils';

export default function SpecialistCard({
  specialist,
  directionsById,
  availableSlotCount,
  hasVisited,
}) {
  const navigate = useNavigate();

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card transition-all duration-200',
        'hover:-translate-y-0.5 hover:shadow-card-hover'
      )}
    >
      <div className="relative flex justify-center bg-brand-soft py-12">
        {hasVisited && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <Sparkles className="h-3 w-3" />
            Вже відвідували
          </span>
        )}
        <Avatar name={specialist.name} colorHex={specialist.colorHex} size="xl" ring />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-bold leading-tight">{specialist.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
            {specialist.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {specialist.directions.map((dirId) => (
            <span
              key={dirId}
              className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700"
            >
              {directionsById[dirId]?.label ?? dirId}
            </span>
          ))}
        </div>

        <div
          className={cn(
            'mt-auto inline-flex items-center gap-1.5 text-sm font-bold',
            availableSlotCount > 0 ? 'text-brand-700' : 'text-muted-foreground'
          )}
        >
          <Clock className="h-3.5 w-3.5" />
          {availableSlotCount > 0
            ? `${availableSlotCount} ${pluralizeSlots(availableSlotCount)}`
            : 'Немає доступних слотів'}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/specialists/${specialist.id}`)}
        >
          Переглянути
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </article>
  );
}

function pluralizeSlots(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'доступний слот';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'доступні слоти';
  return 'доступних слотів';
}
