import { cn } from '@/lib/utils';
import { initials } from '@/utils/initials';

const SIZE_CLASSES = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-14 w-14 text-base',
  lg: 'h-20 w-20 text-2xl',
  xl: 'h-24 w-24 text-3xl',
  '2xl': 'h-28 w-28 text-4xl',
};

export default function Avatar({
  name,
  colorHex = '#2f8f5f',
  size = 'md',
  ring = false,
  className,
}) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-black text-white',
        SIZE_CLASSES[size],
        ring ? 'ring-4 ring-white shadow-lg' : 'shadow-sm',
        className
      )}
      style={{ backgroundColor: colorHex }}
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
}
