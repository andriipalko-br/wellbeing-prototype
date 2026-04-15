import FilterChip from '@/components/FilterChip';

export default function DirectionFilter({ directions, selected, onToggle, onClear }) {
  const isAllActive = selected.length === 0;

  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip active={isAllActive} onClick={onClear}>
        Всі
      </FilterChip>
      {directions.map((dir) => (
        <FilterChip
          key={dir.id}
          active={selected.includes(dir.id)}
          onClick={() => onToggle(dir.id)}
        >
          {dir.label}
        </FilterChip>
      ))}
    </div>
  );
}
