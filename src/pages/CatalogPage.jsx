import { useMemo, useState } from 'react';
import { useAppStore, selectAvailableSlotCount, selectHasVisited } from '@/store/useAppStore';
import DirectionFilter from '@/features/specialist/DirectionFilter';
import SpecialistCard from '@/features/specialist/SpecialistCard';

export default function CatalogPage() {
  const state = useAppStore();
  const { specialists, directions } = state;
  const [selectedDirs, setSelectedDirs] = useState([]);

  const directionsById = useMemo(
    () => Object.fromEntries(directions.map((d) => [d.id, d])),
    [directions]
  );

  const toggleDir = (id) =>
    setSelectedDirs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const clearDirs = () => setSelectedDirs([]);

  const filtered = useMemo(() => {
    if (selectedDirs.length === 0) return specialists;
    return specialists.filter((s) => s.directions.some((d) => selectedDirs.includes(d)));
  }, [specialists, selectedDirs]);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Спеціалісти</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Оберіть спеціаліста та запишіться на безкоштовну консультацію.
        </p>
      </header>

      <DirectionFilter
        directions={directions}
        selected={selectedDirs}
        onToggle={toggleDir}
        onClear={clearDirs}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center text-muted-foreground">
          За обраними напрямками спеціалістів не знайдено.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <SpecialistCard
              key={s.id}
              specialist={s}
              directionsById={directionsById}
              availableSlotCount={selectAvailableSlotCount(state, s.id)}
              hasVisited={selectHasVisited(state, s.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

