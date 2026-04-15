import { cn } from '@/lib/utils';

export default function FilterChip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-bold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        active
          ? 'border-primary bg-primary text-primary-foreground shadow-md hover:bg-primary'
          : 'border-neutral-200 bg-white text-foreground hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700'
      )}
    >
      {children}
    </button>
  );
}
